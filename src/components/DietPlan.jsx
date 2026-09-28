
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import {
  Bookmark,
  Check,
  RotateCcw,
  Target,
  Utensils,
  Salad,
  Sparkles
} from "lucide-react"

import NutritionStats from "./NutritionStats"
import MealCard from "./MealCard"

import {
  generateDietPlan,
  getReplacementMeal
} from "../data/dietData"

function DietPlan({
  savedPlan = null,
  onPlanUpdated = null
}) {
  const [userData, setUserData] = useState(null)
  const [generatedPlan, setGeneratedPlan] = useState(null)
  const [currentMeals, setCurrentMeals] = useState([])
  const [isSaved, setIsSaved] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)

  // -----------------------------------------
  // LOAD USER DATA + GENERATED PLAN
  // -----------------------------------------

  useEffect(() => {
    const storedUserData =
      localStorage.getItem("nutriai_user_data")

    if (storedUserData) {
      try {
        setUserData(JSON.parse(storedUserData))
      } catch (error) {
        console.error(
          "User data loading error:",
          error
        )

        setUserData(null)
      }
    }

    const storedPlan =
      localStorage.getItem(
        "nutriai_generated_plan"
      )

    if (storedPlan) {
      try {
        const parsedPlan =
          JSON.parse(storedPlan)

        setGeneratedPlan(parsedPlan)

        if (
          Array.isArray(parsedPlan?.meals)
        ) {
          setCurrentMeals(parsedPlan.meals)
        }
      } catch (error) {
        console.error(
          "Generated plan loading error:",
          error
        )

        setGeneratedPlan(null)
      }
    }
  }, [])

  // -----------------------------------------
  // ACTIVE PLAN
  // -----------------------------------------

  const activePlan =
    savedPlan || generatedPlan

  // -----------------------------------------
  // UPDATE MEALS WHEN PLAN CHANGES
  // -----------------------------------------

  useEffect(() => {
    if (!activePlan) {
      setCurrentMeals([])
      return
    }

    if (
      Array.isArray(activePlan.meals)
    ) {
      setCurrentMeals(activePlan.meals)
    } else {
      setCurrentMeals([])
    }

    setIsSaved(
      Boolean(
        savedPlan ||
        localStorage.getItem(
          "nutriai_plan_saved"
        ) === "true"
      )
    )
  }, [activePlan, savedPlan])

  // -----------------------------------------
  // REGENERATE MEAL
  // -----------------------------------------

  const handleRegenerateMeal = (
    oldMeal
  ) => {
    if (
      !userData ||
      !oldMeal ||
      isRegenerating
    ) {
      return
    }

    setIsRegenerating(true)

    try {
      const replacement =
        getReplacementMeal(
          oldMeal,
          userData
        )

      if (!replacement) {
        return
      }

      const updatedMeals =
        currentMeals.map((meal) => {
          if (
            meal.name === oldMeal.name &&
            meal.type === oldMeal.type
          ) {
            return replacement
          }

          return meal
        })

      setCurrentMeals(updatedMeals)

      const updatedPlan = {
        ...activePlan,
        meals: updatedMeals
      }

      // Update generated plan
      localStorage.setItem(
        "nutriai_generated_plan",
        JSON.stringify(updatedPlan)
      )

      setGeneratedPlan(updatedPlan)

      // If plan is already saved,
      // update saved copy too.
      if (isSaved) {
        localStorage.setItem(
          "nutriai_saved_plan",
          JSON.stringify(updatedPlan)
        )

        localStorage.setItem(
          "nutriai_plan_saved",
          "true"
        )
      }

      if (onPlanUpdated) {
        onPlanUpdated(updatedPlan)
      }
    } catch (error) {
      console.error(
        "Meal regeneration error:",
        error
      )
    } finally {
      setTimeout(() => {
        setIsRegenerating(false)
      }, 700)
    }
  }

  // -----------------------------------------
  // SAVE PLAN
  // -----------------------------------------

  const handleSavePlan = () => {
    if (!activePlan) {
      return
    }

    const updatedPlan = {
      ...activePlan,
      meals: [...currentMeals]
    }

    localStorage.setItem(
      "nutriai_saved_plan",
      JSON.stringify(updatedPlan)
    )

    localStorage.setItem(
      "nutriai_plan_saved",
      "true"
    )

    setIsSaved(true)

    if (onPlanUpdated) {
      onPlanUpdated(updatedPlan)
    }
  }

  // -----------------------------------------
  // REGENERATE COMPLETE PLAN
  // -----------------------------------------

  const handleRegeneratePlan = () => {
    if (!userData) {
      return
    }

    try {
      const newPlan =
        generateDietPlan(userData)

      localStorage.setItem(
        "nutriai_generated_plan",
        JSON.stringify(newPlan)
      )

      setGeneratedPlan(newPlan)

      setCurrentMeals(
        Array.isArray(newPlan.meals)
          ? newPlan.meals
          : []
      )

      setIsSaved(false)

      localStorage.removeItem(
        "nutriai_saved_plan"
      )

      localStorage.removeItem(
        "nutriai_plan_saved"
      )
    } catch (error) {
      console.error(
        "Plan regeneration error:",
        error
      )
    }
  }

  // -----------------------------------------
  // NO PLAN
  // -----------------------------------------

  if (!activePlan) {
    return (
      <div className="plan-empty">

        <div className="plan-empty-icon">
          <Salad size={28} />
        </div>

        <h2>
          No diet plan yet
        </h2>

        <p>
          Create your personalized nutrition
          plan to get started.
        </p>

        <Link to="/planner">
          Create My Diet Plan
        </Link>

      </div>
    )
  }

  // -----------------------------------------
  // LABELS
  // -----------------------------------------

  const dietLabel =
    activePlan.dietType === "vegetarian"
      ? "Vegetarian"
      : "Non-Vegetarian"

  const foodLabel =
    activePlan.foodPreference === "pakistani"
      ? "Pakistani"
      : activePlan.foodPreference === "international"
        ? "International"
        : "Pakistani & International"

  // -----------------------------------------
  // RENDER
  // -----------------------------------------

  return (
    <div className="diet-plan">

      {/* -------------------------------- */}
      {/* HERO */}
      {/* -------------------------------- */}

      <section className="plan-hero">

        <div className="plan-hero-content">

          <span className="plan-badge">
            <Sparkles size={14} />
            Your personalized plan
          </span>

          <h1>
            Your plan is ready.
          </h1>

          <p>
            NutriAI created this meal plan
            around your goals, activity level
            and food preferences.
          </p>

        </div>

        <div className="plan-hero-icon">
          <Salad size={38} />
        </div>

      </section>


      {/* -------------------------------- */}
      {/* PROFILE */}
      {/* -------------------------------- */}

      <section className="plan-profile">

        <div className="plan-profile-item">

          <span>
            Goal
          </span>

          <strong>
            {activePlan.goalText}
          </strong>

        </div>

        <div className="plan-profile-item">

          <span>
            Diet
          </span>

          <strong>
            {dietLabel}
          </strong>

        </div>

        <div className="plan-profile-item">

          <span>
            Food style
          </span>

          <strong>
            {foodLabel}
          </strong>

        </div>

        <div className="plan-profile-item">

          <span>
            Meals
          </span>

          <strong>
            {activePlan.mealsPerDay}
            {" "}per day
          </strong>

        </div>

      </section>


      {/* -------------------------------- */}
      {/* NUTRITION TARGETS */}
      {/* -------------------------------- */}

      <section className="plan-section">

        <div className="plan-section-heading">

          <div>

            <span className="section-eyebrow">
              Daily targets
            </span>

            <h2>
              Your nutrition goals
            </h2>

          </div>

          <Target size={24} />

        </div>

        <NutritionStats
          
  calories={activePlan.calories}
  protein={activePlan.protein}
  carbs={activePlan.carbs}
  water={activePlan.water}
/>
        
      </section>


      {/* -------------------------------- */}
      {/* MEALS */}
      {/* -------------------------------- */}

      <section className="plan-section meals-section">

        <div className="plan-section-heading">

          <div>

            <span className="section-eyebrow">
              Your meals
            </span>

            <h2>
              Today's food plan
            </h2>

            <p>
              Simple meals selected around
              your preferences.
            </p>

          </div>

          <Utensils size={24} />

        </div>


        {/* IMPORTANT: MEAL CARDS */}

        {currentMeals.length > 0 ? (

          <div className="meals-grid">

            {currentMeals.map(
              (meal, index) => (

                <MealCard
                  key={`${meal.name}-${meal.type}-${index}`}
                  meal={meal}
                  onRegenerate={
                    handleRegenerateMeal
                  }
                />

              )
            )}

          </div>

        ) : (

          <div className="meals-empty">

            <div className="meals-empty-icon">
              <Utensils size={24} />
            </div>

            <h3>
              No meals available
            </h3>

            <p>
              We couldn't create meals for
              your selected preferences.
            </p>

            <button
              type="button"
              onClick={
                handleRegeneratePlan
              }
            >
              <RotateCcw size={15} />
              Generate Meals Again
            </button>

          </div>

        )}

      </section>


      {/* -------------------------------- */}
      {/* SAVE PLAN */}
      {/* -------------------------------- */}

      <section className="plan-save-section">

        <div className="plan-save-icon">

          {isSaved ? (
            <Check size={22} />
          ) : (
            <Bookmark size={22} />
          )}

        </div>

        <div className="plan-save-content">

          <h3>
            {isSaved
              ? "Plan saved"
              : "Save your plan"}
          </h3>

          <p>
            {isSaved
              ? "Your personalized meal plan is saved on this device."
              : "Save this plan so you can come back to it later."}
          </p>

        </div>

        {!isSaved && (

          <button
            type="button"
            onClick={handleSavePlan}
            className="plan-save-button"
          >
            <Bookmark size={16} />
            Save Plan
          </button>

        )}

      </section>


      {/* -------------------------------- */}
      {/* DISCLAIMER */}
      {/* -------------------------------- */}

      <div className="plan-disclaimer">

        <span>
          NutriAI provides general nutrition
          guidance and is not a substitute for
          professional medical advice.
        </span>

      </div>

    </div>
  )
}

export default DietPlan

