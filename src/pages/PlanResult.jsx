import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { BookmarkX, Plus, FileText } from "lucide-react"

import Navbar from "../components/Navbar"
import DietPlan from "../components/DietPlan"
import Footer from "../components/Footer"

function PlanResult() {
  const [hasUserData, setHasUserData] = useState(false)
  const [hasSavedPlan, setHasSavedPlan] = useState(false)

  useEffect(() => {
    const userData = localStorage.getItem("nutriai_user_data")
    const savedPlan = localStorage.getItem("nutriai_saved_plan")

    setHasUserData(Boolean(userData))
    setHasSavedPlan(Boolean(savedPlan))
  }, [])

  const handleDeletePlan = () => {
    localStorage.removeItem("nutriai_saved_plan")
    localStorage.removeItem("nutriai_plan_saved")

    setHasSavedPlan(false)
  }

  return (
    <div className="app">
      <Navbar />

      <main>
        {hasUserData ? (
          <>
            <section className="plan-section">
              <DietPlan />
            </section>

            {hasSavedPlan && (
              <section className="saved-plan-actions">
                <div className="saved-plan-actions-inner">
                  <div className="saved-plan-info">
                    <FileText size={18} />

                    <div>
                      <strong>Your plan is saved</strong>

                      <span>
                        Your personalized plan is stored on this device.
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    className="delete-plan-button"
                    onClick={handleDeletePlan}
                  >
                    <BookmarkX size={17} />
                    Delete Saved Plan
                  </button>
                </div>
              </section>
            )}
          </>
        ) : (
          <section className="saved-plan-empty">
            <div className="saved-plan-empty-card">
              <div className="saved-plan-empty-icon">
                <FileText size={28} />
              </div>

              <h1>You haven't created a diet plan yet.</h1>

              <p>
                Tell us about yourself and your goals.
                NutriAI will create a personalized diet
                plan for you.
              </p>

              <Link
                to="/planner"
                className="create-plan-empty-button"
              >
                <Plus size={18} />
                Create My Diet Plan
              </Link>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}

export default PlanResult