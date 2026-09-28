import { Sparkles, Check } from "lucide-react"

function HeroDemo() {
  return (
    <div className="hero-demo">

      <div className="demo-glow"></div>

      <div className="demo-window">

        <div className="demo-top">

          <div className="demo-dots">
            <span></span>
            <span></span>
            <span></span>
          </div>

          <div className="demo-title">
            NutriAI
          </div>

        </div>


        {/* SCENE 1 */}

        <div className="demo-scene scene-form">

          <div className="scene-label">
            Step 1
          </div>

          <h3>
            Tell us about yourself
          </h3>

          <p>
            We'll use this information to personalize your plan.
          </p>


          <div className="demo-fields">

            <div className="demo-field">
              <span>Age</span>
              <strong>24</strong>
            </div>

            <div className="demo-field">
              <span>Height</span>
              <strong>175 cm</strong>
            </div>

            <div className="demo-field">
              <span>Weight</span>
              <strong>70 kg</strong>
            </div>

          </div>


          <div className="demo-button">
            Continue →
          </div>

        </div>


        {/* SCENE 2 */}

        <div className="demo-scene scene-ai">

          <div className="ai-circle">
            <div>
              <Sparkles size={28} />
            </div>
          </div>

          <span className="scene-label">
            Step 2
          </span>

          <h3>
            AI is creating your plan
          </h3>

          <p>
            Analyzing your information...
          </p>

          <div className="mini-progress">
            <div></div>
          </div>

        </div>


        {/* SCENE 3 */}

        <div className="demo-scene scene-result">

          <div className="result-check">
            <Check size={25} />
          </div>

          <span className="scene-label">
            Step 3
          </span>

          <h3>
            Your plan is ready
          </h3>


          <div className="mini-stats">

            <div>
              <strong>2100</strong>
              <span>Calories</span>
            </div>

            <div>
              <strong>120g</strong>
              <span>Protein</span>
            </div>

            <div>
              <strong>2.5L</strong>
              <span>Water</span>
            </div>

          </div>

        </div>

      </div>

    </div>
  )
}

export default HeroDemo