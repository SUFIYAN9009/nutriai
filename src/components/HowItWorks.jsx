import {
  UserRound,
  Sparkles,
  Salad
} from "lucide-react"

function HowItWorks() {

  const steps = [
    {
      number: "01",
      icon: UserRound,
      title: "Tell Us About You",
      text: "Enter your age, height and weight. It only takes a few seconds."
    },
    {
      number: "02",
      icon: Sparkles,
      title: "AI Builds Your Plan",
      text: "NutriAI analyzes your information and creates your nutrition plan."
    },
    {
      number: "03",
      icon: Salad,
      title: "Start Eating Better",
      text: "Get simple meals and nutrition targets you can actually follow."
    }
  ]

  return (
    <section
      className="how-section"
      id="how-it-works"
    >

      <div className="section-heading">

        <span>
          HOW IT WORKS
        </span>

        <h2>
          A simpler way to eat better.
        </h2>

        <p>
          NutriAI turns a few simple details into
          an easy-to-follow nutrition plan.
        </p>

      </div>


      <div className="steps-grid">

        {steps.map((step) => {

          const Icon = step.icon

          return (
            <div
              className="info-card"
              key={step.number}
            >

              <div className="card-number">
                {step.number}
              </div>

              <div className="card-icon">
                <Icon size={21} />
              </div>

              <h3>
                {step.title}
              </h3>

              <p>
                {step.text}
              </p>

            </div>
          )
        })}

      </div>

    </section>
  )
}

export default HowItWorks