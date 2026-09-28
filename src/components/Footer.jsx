import { Sparkles } from "lucide-react"

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-logo">

        <Sparkles size={18} />

        NutriAI

      </div>


      <p>
        Your personal nutrition assistant powered by AI.
      </p>


      <div className="footer-disclaimer">

        This AI-generated plan is for general informational
        purposes and is not medical advice. If you have a
        medical condition, food allergy, or specific dietary
        needs, consult a qualified healthcare professional.

      </div>


      <div className="footer-bottom">

        © 2026 NutriAI. All rights reserved.

      </div>

    </footer>
  )
}

export default Footer