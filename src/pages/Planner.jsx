
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import Navbar from "../components/Navbar"
import DietForm from "../components/DietForm"
import AIProcessing from "../components/AIProcessing"
import Footer from "../components/Footer"

import { generateDietPlan } from "../data/dietData"

function Planner() {
  const navigate = useNavigate()

  // -----------------------------------------
  // FORM STATE
  // -----------------------------------------

  const [age, setAge] = useState("")

  const [height, setHeight] = useState("")
  const [heightFeet, setHeightFeet] = useState("")
  const [heightInches, setHeightInches] = useState("")
  const [heightUnit, setHeightUnit] = useState("cm")

  const [weight, setWeight] = useState("")
  const [weightUnit, setWeightUnit] = useState("kg")

  const [goal, setGoal] = useState("lose")
  const [targetWeight, setTargetWeight] = useState("")

  const [activity, setActivity] = useState("moderate")

  const [dietType, setDietType] =
    useState("non-vegetarian")

  const [foodPreference, setFoodPreference] =
    useState("pakistani")

  const [mealsPerDay, setMealsPerDay] =
    useState(3)

  const [foodToAvoid, setFoodToAvoid] =
    useState("")

  const [allergies, setAllergies] =
    useState("")

  const [isProcessing, setIsProcessing] =
    useState(false)

  const [error, setError] =
    useState("")


  // -----------------------------------------
  // CREATE DIET PLAN
  // -----------------------------------------

  const handleSubmit = (e) => {
    e.preventDefault()

    // Clear previous error
    setError("")


    // ---------------------------------------
    // HEIGHT VALIDATION
    // ---------------------------------------

    const validHeight =
      heightUnit === "ft"
        ? heightFeet && heightInches
        : height


    // ---------------------------------------
    // BASIC VALIDATION
    // ---------------------------------------

    if (!age) {
      setError("Please enter your age.")
      return
    }

    if (!validHeight) {
      setError("Please enter your height.")
      return
    }

    if (!weight) {
      setError("Please enter your weight.")
      return
    }


    // ---------------------------------------
    // NUMERIC VALIDATION
    // ---------------------------------------

    const numericAge =
      Number(age)

    const numericWeight =
      Number(weight)

    if (
      !Number.isFinite(numericAge) ||
      numericAge <= 0
    ) {
      setError("Please enter a valid age.")
      return
    }

    if (
      !Number.isFinite(numericWeight) ||
      numericWeight <= 0
    ) {
      setError("Please enter a valid weight.")
      return
    }


    // ---------------------------------------
    // FEET / INCHES VALIDATION
    // ---------------------------------------

    if (heightUnit === "ft") {

      const feet =
        Number(heightFeet)

      const inches =
        Number(heightInches)

      if (
        !Number.isFinite(feet) ||
        feet <= 0
      ) {
        setError("Please enter a valid height in feet.")
        return
      }

      if (
        !Number.isFinite(inches) ||
        inches < 0 ||
        inches > 11
      ) {
        setError(
          "Please enter inches between 0 and 11."
        )
        return
      }
    }


    // ---------------------------------------
    // CM VALIDATION
    // ---------------------------------------

    if (heightUnit === "cm") {

      const heightCm =
        Number(height)

      if (
        !Number.isFinite(heightCm) ||
        heightCm <= 0
      ) {
        setError("Please enter a valid height.")
        return
      }
    }


    // ---------------------------------------
    // COLLECT USER DATA
    // ---------------------------------------

    const userData = {

      age,

      height,

      heightFeet,

      heightInches,

      heightUnit,

      weight,

      weightUnit,

      goal,

      targetWeight,

      activity,

      dietType,

      foodPreference,

      mealsPerDay,

      foodToAvoid,

      allergies
    }


    // ---------------------------------------
    // SAVE USER DATA
    // ---------------------------------------

    localStorage.setItem(
      "nutriai_user_data",
      JSON.stringify(userData)
    )


    // ---------------------------------------
    // GENERATE PLAN
    // ---------------------------------------

    try {

      const generatedPlan =
        generateDietPlan(userData)


      // -------------------------------------
      // CHECK GENERATED MEALS
      // -------------------------------------

      if (
        !generatedPlan ||
        !Array.isArray(
          generatedPlan.meals
        ) ||
        generatedPlan.meals.length === 0
      ) {

        setError(
          "We couldn't create your meals. Please check your preferences and try again."
        )

        return
      }


      // -------------------------------------
      // SAVE GENERATED PLAN
      // -------------------------------------

      localStorage.setItem(
        "nutriai_generated_plan",
        JSON.stringify(generatedPlan)
      )


      // -------------------------------------
      // MARK AS NEW PLAN
      // -------------------------------------

      sessionStorage.setItem(
        "nutriai_new_plan",
        "true"
      )


      // -------------------------------------
      // SHOW AI PROCESSING
      // -------------------------------------

      setIsProcessing(true)


      // -------------------------------------
      // GO TO PLAN PAGE
      // -------------------------------------

      setTimeout(() => {

        navigate("/plan")

      }, 7000)

    } catch (error) {

      console.error(
        "Diet plan generation error:",
        error
      )

      setError(
        error?.message ||
        "Something went wrong while creating your plan."
      )

      setIsProcessing(false)
    }
  }


  // -----------------------------------------
  // PAGE
  // -----------------------------------------

  return (
    <div className="app">

      <Navbar />

      <main className="planner-page">

        {/* -------------------------------- */}
        {/* ERROR MESSAGE */}
        {/* -------------------------------- */}

        {error && !isProcessing && (

          <div
            role="alert"
            style={{
              maxWidth: "700px",
              margin: "20px auto",
              padding: "14px 18px",
              borderRadius: "12px",
              background: "#fff1f0",
              border: "1px solid #f3d1ce",
              color: "#a8463d",
              fontSize: "14px",
              lineHeight: "1.5"
            }}
          >
            {error}
          </div>

        )}


        {/* -------------------------------- */}
        {/* FORM / PROCESSING */}
        {/* -------------------------------- */}

        {!isProcessing ? (

          <DietForm

            age={age}
            setAge={setAge}

            height={height}
            setHeight={setHeight}

            heightFeet={heightFeet}
            setHeightFeet={setHeightFeet}

            heightInches={heightInches}
            setHeightInches={setHeightInches}

            heightUnit={heightUnit}
            setHeightUnit={setHeightUnit}

            weight={weight}
            setWeight={setWeight}

            weightUnit={weightUnit}
            setWeightUnit={setWeightUnit}

            goal={goal}
            setGoal={setGoal}

            targetWeight={targetWeight}
            setTargetWeight={setTargetWeight}

            activity={activity}
            setActivity={setActivity}

            dietType={dietType}
            setDietType={setDietType}

            foodPreference={foodPreference}
            setFoodPreference={setFoodPreference}

            mealsPerDay={mealsPerDay}
            setMealsPerDay={setMealsPerDay}

            foodToAvoid={foodToAvoid}
            setFoodToAvoid={setFoodToAvoid}

            allergies={allergies}
            setAllergies={setAllergies}

            onSubmit={handleSubmit}
          />

        ) : (

          <AIProcessing />

        )}

      </main>

      <Footer />

    </div>
  )
}

export default Planner

