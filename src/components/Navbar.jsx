import { Sparkles } from "lucide-react"

function Navbar() {
  const goHome = () => {
    window.location.href = "/"
  }

  const goHowItWorks = () => {
    window.location.href = "/#how-it-works"
  }

  const goMyPlan = () => {
    window.location.href = "/plan"
  }

  const goPlanner = () => {
    window.location.href = "/planner"
  }

  return (
    <nav className="navbar">

      <button
        type="button"
        className="logo navbar-button"
        onClick={goHome}
      >
        <span className="logo-icon">
          <Sparkles size={16} />
        </span>

        NutriAI
      </button>

      <div className="nav-links">

        <button
          type="button"
          onClick={goHome}
        >
          Home
        </button>

        <button
          type="button"
          onClick={goHowItWorks}
        >
          How It Works
        </button>

        <button
          type="button"
          onClick={goMyPlan}
        >
          My Plan
        </button>

      </div>

      <button
        type="button"
        className="nav-button"
        onClick={goPlanner}
      >
        Create My Plan
      </button>

    </nav>
  )
}

export default Navbar