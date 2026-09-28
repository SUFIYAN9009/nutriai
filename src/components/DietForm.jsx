import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Lock,
  Sparkles
} from "lucide-react"

function DietForm({
  age,
  setAge,
  height,
  setHeight,
  heightFeet,
  setHeightFeet,
  heightInches,
  setHeightInches,
  heightUnit,
  setHeightUnit,
  weight,
  setWeight,
  weightUnit,
  setWeightUnit,
  goal,
  setGoal,
  targetWeight,
  setTargetWeight,
  activity,
  setActivity,

  dietType,
  setDietType,
  foodPreference,
  setFoodPreference,
  mealsPerDay,
  setMealsPerDay,
  foodToAvoid,
  setFoodToAvoid,
  allergies,
  setAllergies,

  onSubmit
}) {
  const [step, setStep] = useState(1)

  const totalSteps = 3

  const canContinue = () => {
    if (step === 1) {
      if (!age || !weight) return false

      if (heightUnit === "cm" && !height) {
        return false
      }

      if (
        heightUnit === "ft" &&
        (!heightFeet || !heightInches)
      ) {
        return false
      }

      return true
    }

    if (step === 2) {
      if (!goal) return false

      if (goal !== "maintain" && !targetWeight) {
        return false
      }

      return true
    }

    if (step === 3) {
      return (
        !!activity &&
        !!dietType &&
        !!foodPreference &&
        !!mealsPerDay
      )
    }

    return false
  }

  const nextStep = () => {
    if (!canContinue()) return

    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  const getStepTitle = () => {
    if (step === 1) return "Tell us about yourself"
    if (step === 2) return "What is your goal?"
    return "Your lifestyle & food"
  }

  const getStepDescription = () => {
    if (step === 1) {
      return "A few basic details help us understand your starting point."
    }

    if (step === 2) {
      return "Choose what you want to achieve with your nutrition plan."
    }

    return "Tell us how you live and what kind of food you prefer."
  }

  return (
    <section className="onboarding-section">
      <div className="onboarding-container">

        <div className="onboarding-header">

          <div className="onboarding-brand">
            <span>
              <Sparkles size={15} />
            </span>
            NutriAI
          </div>

          <div className="step-counter">
            Step {step} of {totalSteps}
          </div>

        </div>


        {/* PROGRESS */}

        <div className="onboarding-progress">

          <div className="progress-line">
            <motion.div
              className="progress-line-fill"
              animate={{
                width: `${((step - 1) / (totalSteps - 1)) * 100}%`
              }}
              transition={{ duration: 0.3 }}
            />
          </div>

          <div className="progress-steps">

            {[1, 2, 3].map((item) => (
              <div
                key={item}
                className={`progress-step ${
                  step >= item ? "active" : ""
                }`}
              >
                <span>
                  {step > item ? (
                    <Check size={13} />
                  ) : (
                    item
                  )}
                </span>

                <small>
                  {item === 1
                    ? "About You"
                    : item === 2
                    ? "Your Goal"
                    : "Lifestyle"}
                </small>
              </div>
            ))}

          </div>
        </div>


        {/* CARD */}

        <div className="onboarding-card">

          <AnimatePresence mode="wait">

            <motion.div
              key={step}
              initial={{ opacity: 0, x: 18 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -18 }}
              transition={{ duration: 0.25 }}
            >

              <div className="onboarding-title">

                <span className="step-eyebrow">
                  STEP {step}
                </span>

                <h1>{getStepTitle()}</h1>

                <p>{getStepDescription()}</p>

              </div>


              {/* STEP 1 */}

              {step === 1 && (
                <div className="onboarding-fields">

                  <div className="field-block">
                    <label htmlFor="age">
                      How old are you?
                    </label>

                    <div className="input-with-unit">
                      <input
                        id="age"
                        type="number"
                        min="1"
                        max="120"
                        placeholder="24"
                        value={age}
                        onChange={(e) =>
                          setAge(e.target.value)
                        }
                      />

                      <span>years</span>
                    </div>
                  </div>


                  <div className="field-block">

                    <div className="field-heading">

                      <label>
                        How tall are you?
                      </label>

                      <div className="unit-switch">

                        <button
                          type="button"
                          className={
                            heightUnit === "cm"
                              ? "active"
                              : ""
                          }
                          onClick={() =>
                            setHeightUnit("cm")
                          }
                        >
                          CM
                        </button>

                        <button
                          type="button"
                          className={
                            heightUnit === "ft"
                              ? "active"
                              : ""
                          }
                          onClick={() =>
                            setHeightUnit("ft")
                          }
                        >
                          FT / IN
                        </button>

                      </div>

                    </div>


                    {heightUnit === "cm" ? (
                      <div className="input-with-unit">

                        <input
                          type="number"
                          min="50"
                          max="250"
                          placeholder="175"
                          value={height}
                          onChange={(e) =>
                            setHeight(e.target.value)
                          }
                        />

                        <span>cm</span>

                      </div>
                    ) : (
                      <div className="height-double">

                        <div className="input-with-unit">

                          <input
                            type="number"
                            min="1"
                            max="8"
                            placeholder="5"
                            value={heightFeet}
                            onChange={(e) =>
                              setHeightFeet(e.target.value)
                            }
                          />

                          <span>ft</span>

                        </div>


                        <div className="input-with-unit">

                          <input
                            type="number"
                            min="0"
                            max="11"
                            placeholder="9"
                            value={heightInches}
                            onChange={(e) =>
                              setHeightInches(e.target.value)
                            }
                          />

                          <span>in</span>

                        </div>

                      </div>
                    )}

                  </div>


                  <div className="field-block">

                    <div className="field-heading">

                      <label>
                        What is your current weight?
                      </label>

                      <div className="unit-switch">

                        <button
                          type="button"
                          className={
                            weightUnit === "kg"
                              ? "active"
                              : ""
                          }
                          onClick={() =>
                            setWeightUnit("kg")
                          }
                        >
                          KG
                        </button>

                        <button
                          type="button"
                          className={
                            weightUnit === "lb"
                              ? "active"
                              : ""
                          }
                          onClick={() =>
                            setWeightUnit("lb")
                          }
                        >
                          LB
                        </button>

                      </div>

                    </div>


                    <div className="input-with-unit">

                      <input
                        type="number"
                        min="20"
                        max="500"
                        placeholder="80"
                        value={weight}
                        onChange={(e) =>
                          setWeight(e.target.value)
                        }
                      />

                      <span>{weightUnit}</span>

                    </div>

                  </div>

                </div>
              )}


              {/* STEP 2 */}

              {step === 2 && (
                <div className="goal-screen">

                  <div className="goal-grid">

                    <button
                      type="button"
                      className={`big-goal-card ${
                        goal === "lose"
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        setGoal("lose")
                      }
                    >

                      <div className="big-goal-icon">
                        ↓
                      </div>

                      <strong>
                        Lose Weight
                      </strong>

                      <span>
                        Reduce my body weight
                      </span>

                      {goal === "lose" && (
                        <div className="selected-check">
                          <Check size={14} />
                        </div>
                      )}

                    </button>


                    <button
                      type="button"
                      className={`big-goal-card ${
                        goal === "maintain"
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        setGoal("maintain")
                      }
                    >

                      <div className="big-goal-icon">
                        →
                      </div>

                      <strong>
                        Maintain Weight
                      </strong>

                      <span>
                        Keep my current weight
                      </span>

                      {goal === "maintain" && (
                        <div className="selected-check">
                          <Check size={14} />
                        </div>
                      )}

                    </button>


                    <button
                      type="button"
                      className={`big-goal-card ${
                        goal === "gain"
                          ? "selected"
                          : ""
                      }`}
                      onClick={() =>
                        setGoal("gain")
                      }
                    >

                      <div className="big-goal-icon">
                        ↑
                      </div>

                      <strong>
                        Gain Weight
                      </strong>

                      <span>
                        Increase my body weight
                      </span>

                      {goal === "gain" && (
                        <div className="selected-check">
                          <Check size={14} />
                        </div>
                      )}

                    </button>

                  </div>


                  {goal !== "maintain" && (
                    <motion.div
                      className="target-weight-box"
                      initial={{
                        opacity: 0,
                        y: 10
                      }}
                      animate={{
                        opacity: 1,
                        y: 0
                      }}
                    >

                      <label htmlFor="targetWeight">
                        What's your target weight?
                      </label>

                      <div className="input-with-unit">

                        <input
                          id="targetWeight"
                          type="number"
                          min="20"
                          max="500"
                          placeholder={
                            goal === "lose"
                              ? "70"
                              : "85"
                          }
                          value={targetWeight}
                          onChange={(e) =>
                            setTargetWeight(
                              e.target.value
                            )
                          }
                        />

                        <span>{weightUnit}</span>

                      </div>

                      <small>
                        This helps NutriAI understand
                        where you want to go.
                      </small>

                    </motion.div>
                  )}

                </div>
              )}


              {/* STEP 3 */}

              {step === 3 && (
                <div className="preferences-screen">

                  {/* ACTIVITY */}

                  <div className="preference-section">

                    <div className="preference-heading">
                      <strong>
                        How active are you?
                      </strong>

                      <span>
                        Choose one
                      </span>
                    </div>

                    <div className="activity-grid">

                      <button
                        type="button"
                        className={`activity-card ${
                          activity === "low"
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          setActivity("low")
                        }
                      >

                        <div className="activity-visual">
                          🚶
                        </div>

                        <strong>
                          Low Activity
                        </strong>

                        <span>
                          Little or no regular exercise
                        </span>

                        {activity === "low" && (
                          <div className="selected-check">
                            <Check size={14} />
                          </div>
                        )}

                      </button>


                      <button
                        type="button"
                        className={`activity-card ${
                          activity === "moderate"
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          setActivity("moderate")
                        }
                      >

                        <div className="activity-visual">
                          🏃
                        </div>

                        <strong>
                          Moderately Active
                        </strong>

                        <span>
                          Exercise around 2–4 days a week
                        </span>

                        {activity === "moderate" && (
                          <div className="selected-check">
                            <Check size={14} />
                          </div>
                        )}

                      </button>


                      <button
                        type="button"
                        className={`activity-card ${
                          activity === "active"
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          setActivity("active")
                        }
                      >

                        <div className="activity-visual">
                          🏋️
                        </div>

                        <strong>
                          Very Active
                        </strong>

                        <span>
                          Exercise 5 or more days a week
                        </span>

                        {activity === "active" && (
                          <div className="selected-check">
                            <Check size={14} />
                          </div>
                        )}

                      </button>

                    </div>

                  </div>


                  {/* DIET TYPE */}

                  <div className="preference-section">

                    <div className="preference-heading">
                      <strong>
                        What do you eat?
                      </strong>

                      <span>
                        Diet type
                      </span>
                    </div>

                    <div className="option-grid">

                      <button
                        type="button"
                        className={`preference-option ${
                          dietType === "non-vegetarian"
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          setDietType(
                            "non-vegetarian"
                          )
                        }
                      >
                        <span>🍗</span>

                        <div>
                          <strong>
                            Non-Vegetarian
                          </strong>

                          <small>
                            Meat, eggs & dairy
                          </small>
                        </div>

                        {dietType ===
                          "non-vegetarian" && (
                          <Check size={16} />
                        )}

                      </button>


                      <button
                        type="button"
                        className={`preference-option ${
                          dietType === "vegetarian"
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          setDietType(
                            "vegetarian"
                          )
                        }
                      >

                        <span>🥗</span>

                        <div>
                          <strong>
                            Vegetarian
                          </strong>

                          <small>
                            Plant-based foods
                          </small>
                        </div>

                        {dietType === "vegetarian" && (
                          <Check size={16} />
                        )}

                      </button>

                    </div>

                  </div>


                  {/* FOOD PREFERENCE */}

                  <div className="preference-section">

                    <div className="preference-heading">
                      <strong>
                        What kind of food do you prefer?
                      </strong>

                      <span>
                        Food style
                      </span>
                    </div>

                    <div className="style-grid">

                      {[
                        {
                          id: "pakistani",
                          label: "Pakistani",
                          icon: "🍛"
                        },
                        {
                          id: "international",
                          label: "International",
                          icon: "🥙"
                        },
                        {
                          id: "both",
                          label: "Both",
                          icon: "🌎"
                        }
                      ].map((item) => (

                        <button
                          key={item.id}
                          type="button"
                          className={`style-option ${
                            foodPreference === item.id
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            setFoodPreference(
                              item.id
                            )
                          }
                        >

                          <span>
                            {item.icon}
                          </span>

                          <strong>
                            {item.label}
                          </strong>

                          {foodPreference === item.id && (
                            <div className="selected-check">
                              <Check size={12} />
                            </div>
                          )}

                        </button>

                      ))}

                    </div>

                  </div>


                  {/* MEALS */}

                  <div className="preference-section">

                    <div className="preference-heading">
                      <strong>
                        How many meals per day?
                      </strong>

                      <span>
                        You can change this later
                      </span>
                    </div>

                    <div className="meal-number-grid">

                      {[3, 4, 5].map((number) => (

                        <button
                          key={number}
                          type="button"
                          className={`meal-number ${
                            mealsPerDay === number
                              ? "selected"
                              : ""
                          }`}
                          onClick={() =>
                            setMealsPerDay(number)
                          }
                        >

                          <strong>
                            {number}
                          </strong>

                          <span>
                            meals
                          </span>

                          {mealsPerDay === number && (
                            <Check size={14} />
                          )}

                        </button>

                      ))}

                    </div>

                  </div>


                  {/* OPTIONAL */}

                  <div className="optional-preferences">

                    <div className="optional-title">
                      <strong>
                        Anything we should avoid?
                      </strong>

                      <span>
                        Optional
                      </span>
                    </div>

                    <input
                      type="text"
                      placeholder="e.g. beef, peanuts, spicy food"
                      value={foodToAvoid}
                      onChange={(e) =>
                        setFoodToAvoid(e.target.value)
                      }
                    />

                    <input
                      type="text"
                      placeholder="Allergies, if any"
                      value={allergies}
                      onChange={(e) =>
                        setAllergies(e.target.value)
                      }
                    />

                  </div>


                  <div className="privacy-message">

                    <Lock size={15} />

                    <span>
                      Your information is private and
                      only used to personalize your plan.
                    </span>

                  </div>

                </div>
              )}

            </motion.div>

          </AnimatePresence>


          {/* ACTIONS */}

          <div className="onboarding-actions">

            {step > 1 ? (
              <button
                type="button"
                className="back-button"
                onClick={previousStep}
              >
                <ArrowLeft size={17} />
                Back
              </button>
            ) : (
              <div />
            )}


            {step < totalSteps ? (
              <button
                type="button"
                className="continue-button"
                disabled={!canContinue()}
                onClick={nextStep}
              >
                Continue
                <ArrowRight size={18} />
              </button>
            ) : (
              <button
                type="button"
                className="continue-button"
                disabled={!canContinue()}
                onClick={onSubmit}
              >
                Create My Diet Plan
                <Sparkles size={17} />
              </button>
            )}

          </div>

        </div>


        <p className="onboarding-footer-text">
          Simple • Personalized • Easy to Follow
        </p>

      </div>
    </section>
  )
}

export default DietForm