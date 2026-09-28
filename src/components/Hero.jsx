import { ArrowRight, Sparkles } from "lucide-react"
import { Link } from "react-router-dom"

import HeroDemo from "./HeroDemo"

function Hero() {
  return (
    <section className="hero">

      <div className="hero-content">

        <div className="hero-badge">
          <Sparkles size={14} />
          AI-Powered Nutrition
        </div>


        <h1>
          Your Personal Diet Plan,
          <span> Powered by AI.</span>
        </h1>


        <p>
          Tell us a little about yourself.
          Our AI will create a simple nutrition
          plan made just for you.
        </p>


        <div className="hero-actions">

          <Link
            to="/planner"
            className="primary-button"
          >
            Create My Diet Plan
            <ArrowRight size={18} />
          </Link>


          <a
            href="#how-it-works"
            className="secondary-button"
          >
            How It Works
          </a>

        </div>


        <div className="trust-line">

          <span>✓ Simple</span>
          <span>•</span>
          <span>✓ Personalized</span>
          <span>•</span>
          <span>✓ Easy to Follow</span>

        </div>

      </div>


      <HeroDemo />

    </section>
  )
}

export default Hero