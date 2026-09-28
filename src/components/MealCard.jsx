import { useState } from "react"
import {
  Clock3,
  Flame,
  Dumbbell,
  Eye,
  X,
  Utensils,
  ChefHat,
  RefreshCw
} from "lucide-react"
import { createPortal } from "react-dom"

function MealCard({ meal, onRegenerate }) {
  const [isOpen, setIsOpen] = useState(false)
  const [isRegenerating, setIsRegenerating] = useState(false)

  const openMeal = () => {
    setIsOpen(true)
  }

  const closeMeal = () => {
    if (!isRegenerating) {
      setIsOpen(false)
    }
  }

  const handleRegenerate = async () => {
    if (!onRegenerate || isRegenerating) {
      return
    }

    setIsRegenerating(true)

    await new Promise((resolve) => {
      setTimeout(resolve, 700)
    })

    onRegenerate(meal)

    setIsRegenerating(false)
  }

  return (
    <>
      <article className="meal-card">

        <div className="meal-top">

          <div className="meal-type">
            {meal.image || "🍽️"}

            <span>
              {meal.type}
            </span>
          </div>

          <span className="meal-time">
            <Clock3 size={13} />
            {meal.time}
          </span>

        </div>


        <div className="meal-content">

          <div className="meal-image">
            {meal.image || "🍽️"}
          </div>

          <div className="meal-info">

            <h3>
              {meal.name}
            </h3>

            <p>
              {meal.description}
            </p>

            <div className="meal-meta">

              <span>
                <Flame size={13} />
                {meal.calories} kcal
              </span>

              <span>
                <Dumbbell size={13} />
                {meal.protein}g protein
              </span>

            </div>

          </div>

        </div>


        <button
          type="button"
          className="view-meal-button"
          onClick={openMeal}
        >
          <span>
            View Meal
          </span>

          <span className="view-meal-arrow">
            <Eye size={14} />
          </span>
        </button>

      </article>


      {isOpen &&
        createPortal(

          <div
            className="meal-modal-overlay"
            onMouseDown={closeMeal}
          >

            <div
              className="meal-modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="meal-modal-title"
              onMouseDown={(event) =>
                event.stopPropagation()
              }
            >

              <button
                type="button"
                className="meal-modal-close"
                onClick={closeMeal}
                disabled={isRegenerating}
                aria-label="Close meal details"
              >
                <X size={19} />
              </button>


              {/* MODAL HEADER */}

              <div className="meal-modal-hero">

                <div className="meal-modal-emoji">
                  {meal.image || "🍽️"}
                </div>

                <div>

                  <span className="meal-modal-type">
                    {meal.type}
                  </span>

                  <h2 id="meal-modal-title">
                    {meal.name}
                  </h2>

                  <div className="meal-modal-time">
                    <Clock3 size={14} />
                    {meal.time}
                  </div>

                </div>

              </div>


              {/* NUTRITION */}

              <div className="meal-modal-stats">

                <div className="meal-modal-stat">

                  <Flame size={17} />

                  <div>
                    <span>
                      Calories
                    </span>

                    <strong>
                      {meal.calories} kcal
                    </strong>
                  </div>

                </div>


                <div className="meal-modal-stat">

                  <Dumbbell size={17} />

                  <div>
                    <span>
                      Protein
                    </span>

                    <strong>
                      {meal.protein}g
                    </strong>
                  </div>

                </div>

              </div>


              {/* DESCRIPTION */}

              <div className="meal-modal-section">

                <div className="meal-modal-section-title">

                  <Utensils size={16} />

                  <h3>
                    About this meal
                  </h3>

                </div>

                <p>
                  {meal.description}
                </p>

              </div>


              {/* INGREDIENTS */}

              <div className="meal-modal-section">

                <div className="meal-modal-section-title">

                  <Utensils size={16} />

                  <h3>
                    Ingredients
                  </h3>

                </div>

                <p className="meal-ingredients">
                  {meal.ingredients ||
                    "Ingredients information is not available yet."}
                </p>

              </div>


              {/* PREPARATION */}

              <div className="meal-modal-section">

                <div className="meal-modal-section-title">

                  <ChefHat size={16} />

                  <h3>
                    Preparation
                  </h3>

                </div>

                <p>
                  Prepare the ingredients using a simple,
                  balanced cooking method. Keep added oil,
                  sugar and salt moderate and adjust the
                  portion to your personal plan.
                </p>

              </div>


              {/* ACTIONS */}

              <div className="meal-modal-actions">

                <button
                  type="button"
                  className="meal-regenerate-button"
                  onClick={handleRegenerate}
                  disabled={
                    isRegenerating ||
                    !onRegenerate
                  }
                >

                  <RefreshCw
                    size={15}
                    className={
                      isRegenerating
                        ? "regenerate-spin"
                        : ""
                    }
                  />

                  {isRegenerating
                    ? "Finding another meal..."
                    : "Regenerate Meal"}

                </button>


                <button
                  type="button"
                  className="meal-done-button"
                  onClick={closeMeal}
                  disabled={isRegenerating}
                >
                  Done
                </button>

              </div>

            </div>

          </div>,

          document.body
        )
      }
    </>
  )
}

export default MealCard