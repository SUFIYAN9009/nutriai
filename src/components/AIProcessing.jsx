
import { useEffect, useState } from "react"
import {
  UserRound,
  Brain,
  Utensils,
  FileText,
  LockKeyhole,
  Sparkles,
  Check
} from "lucide-react"

function AIProcessing() {
  const steps = [
    {
      title: "Your information",
      text: "Reading your goals and preferences.",
      icon: UserRound
    },
    {
      title: "AI analysis",
      text: "Calculating your nutrition needs.",
      icon: Brain
    },
    {
      title: "Building meals",
      text: "Creating meals that fit your plan.",
      icon: Utensils
    },
    {
      title: "Finalizing plan",
      text: "Preparing your personalized diet plan.",
      icon: FileText
    }
  ]

  const [activeStep, setActiveStep] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((current) => {
        if (current < steps.length - 1) {
          return current + 1
        }

        return current
      })
    }, 1700)

    return () => clearInterval(interval)
  }, [])

  const progress =
    ((activeStep + 1) / steps.length) * 100

  return (
    <section className="ai-processing-page">

      <div className="ai-processing-centered">

        {/* AI VISUAL */}

        <div className="ai-processing-orb">

          <div className="ai-orb-glow" />

          <div className="ai-orb-ring ring-one" />

          <div className="ai-orb-ring ring-two" />

          <div className="ai-orb-core">
            <Sparkles size={32} />
          </div>

        </div>


        {/* TITLE */}

        <div className="ai-processing-content">

          <span className="ai-processing-badge">
            <Sparkles size={14} />
            NutriAI
          </span>

          <h1>
            Creating your
            <span> personal diet plan</span>
          </h1>

          <p>
            We're analyzing your information and
            creating a nutrition plan designed
            around your goals and preferences.
          </p>

        </div>


        {/* PROGRESS */}

        <div className="ai-processing-progress">

          <div className="ai-processing-progress-top">

            <span>
              Building your plan
            </span>

            <strong>
              {Math.round(progress)}%
            </strong>

          </div>

          <div className="ai-processing-progress-track">

            <div
              className="ai-processing-progress-fill"
              style={{
                width: `${progress}%`
              }}
            />

          </div>

        </div>


        {/* STEPS */}

        <div className="ai-processing-steps">

          {steps.map((step, index) => {

            const Icon = step.icon

            const isActive =
              index === activeStep

            const isComplete =
              index < activeStep

            return (
              <div
                key={step.title}
                className={`ai-processing-step ${
                  isActive ? "active" : ""
                } ${
                  isComplete ? "complete" : ""
                }`}
              >

                <div className="ai-step-icon">

                  {isComplete ? (
                    <Check size={17} />
                  ) : (
                    <Icon size={17} />
                  )}

                </div>


                <div className="ai-step-text">

                  <strong>
                    {step.title}
                  </strong>

                  <span>
                    {step.text}
                  </span>

                </div>


                <div className="ai-step-status">

                  {isComplete ? (
                    <Check size={16} />
                  ) : isActive ? (
                    <span className="loading-dots">
                      ...
                    </span>
                  ) : null}

                </div>

              </div>
            )
          })}

        </div>


        {/* SECURITY */}

        <div className="ai-processing-security">

          <LockKeyhole size={15} />

          <span>
            Your information stays private and secure.
          </span>

        </div>

      </div>

    </section>
  )
}

export default AIProcessing

