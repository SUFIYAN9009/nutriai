import {
  Flame,
  Dumbbell,
  Wheat,
  Droplets
} from "lucide-react"

function NutritionStats({
  calories,
  protein,
  carbs,
  water
}) {

  const stats = [

    {
      icon: Flame,
      value: calories,
      label: "Calories",
      unit: "kcal"
    },

    {
      icon: Dumbbell,
      value: protein,
      label: "Protein",
      unit: "g"
    },

    {
      icon: Wheat,
      value: carbs,
      label: "Carbs",
      unit: "g"
    },

    {
      icon: Droplets,
      value: water,
      label: "Water",
      unit: "L"
    }

  ]


  return (

    <div className="nutrition-stats">

      {stats.map((stat) => {

        const Icon = stat.icon

        return (

          <div
            className="nutrition-stat"
            key={stat.label}
          >

            <div className="stat-icon">
              <Icon size={18} />
            </div>


            <div>

              <strong>
                {stat.value}
                <small>
                  {stat.unit}
                </small>
              </strong>

              <span>
                {stat.label}
              </span>

            </div>

          </div>

        )

      })}

    </div>
  )
}

export default NutritionStats