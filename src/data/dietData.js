const activityMultiplier = {
  low: 1.2,
  moderate: 1.4,
  active: 1.6
}

const goalText = {
  lose: "Lose Weight",
  maintain: "Maintain Weight",
  gain: "Gain Weight"
}


// -----------------------------------------
// CONVERT WEIGHT TO KG
// -----------------------------------------

function getWeightKg(weight, unit) {
  const value = Number(weight) || 70

  if (unit === "lb") {
    return value * 0.453592
  }

  return value
}


// -----------------------------------------
// CONVERT HEIGHT TO CM
// -----------------------------------------

function getHeightCm(data) {
  if (data.heightUnit === "ft") {
    const feet = Number(data.heightFeet) || 5
    const inches = Number(data.heightInches) || 7

    return (
      feet * 30.48 +
      inches * 2.54
    )
  }

  return Number(data.height) || 170
}


// -----------------------------------------
// MEAL DATABASE
// -----------------------------------------

const mealDatabase = {

  pakistaniNonVeg: {

    breakfast: {
      type: "Breakfast",
      time: "8:00 AM",
      name: "Paratha, Egg & Yogurt",
      description:
        "A balanced Pakistani breakfast with egg, light paratha and yogurt.",
      ingredients:
        "1 egg, 1 small whole-wheat paratha, 1/2 cup plain yogurt",
      calories: 430,
      protein: 20,
      image: "🍳"
    },

    morningSnack: {
      type: "Morning Snack",
      time: "11:00 AM",
      name: "Apple & Almonds",
      description:
        "A light snack to keep you satisfied between meals.",
      ingredients:
        "1 medium apple, 10 almonds",
      calories: 180,
      protein: 5,
      image: "🍎"
    },

    lunch: {
      type: "Lunch",
      time: "1:30 PM",
      name: "Chicken Biryani",
      description:
        "A balanced portion of Pakistani-style chicken biryani with salad.",
      ingredients:
        "Chicken, basmati rice, yogurt, onion, tomato, spices, cucumber",
      calories: 620,
      protein: 35,
      image: "🍚"
    },

    eveningSnack: {
      type: "Evening Snack",
      time: "5:00 PM",
      name: "Chana Chaat",
      description:
        "A protein-rich Pakistani snack with chickpeas and fresh vegetables.",
      ingredients:
        "Boiled chickpeas, tomato, onion, cucumber, lemon, spices",
      calories: 230,
      protein: 10,
      image: "🥗"
    },

    dinner: {
      type: "Dinner",
      time: "8:00 PM",
      name: "Chicken Karahi & Roti",
      description:
        "A lighter serving of Pakistani chicken karahi with whole-wheat roti.",
      ingredients:
        "Chicken, tomato, onion, ginger, garlic, spices, 1 whole-wheat roti",
      calories: 560,
      protein: 38,
      image: "🍛"
    }
  },


  pakistaniVeg: {

    breakfast: {
      type: "Breakfast",
      time: "8:00 AM",
      name: "Aloo Paratha & Yogurt",
      description:
        "A traditional vegetarian Pakistani breakfast.",
      ingredients:
        "1 small potato, whole-wheat flour, yogurt, herbs and spices",
      calories: 400,
      protein: 12,
      image: "🥔"
    },

    morningSnack: {
      type: "Morning Snack",
      time: "11:00 AM",
      name: "Apple & Almonds",
      description:
        "A simple fruit and nut snack.",
      ingredients:
        "1 apple, 10 almonds",
      calories: 180,
      protein: 5,
      image: "🍎"
    },

    lunch: {
      type: "Lunch",
      time: "1:30 PM",
      name: "Daal, Roti & Salad",
      description:
        "Lentils with whole-wheat roti and fresh salad.",
      ingredients:
        "Daal, 2 small rotis, cucumber, tomato, onion",
      calories: 480,
      protein: 20,
      image: "🥣"
    },

    eveningSnack: {
      type: "Evening Snack",
      time: "5:00 PM",
      name: "Chana Chaat",
      description:
        "A fresh chickpea snack with vegetables.",
      ingredients:
        "Chickpeas, tomato, onion, cucumber, lemon and spices",
      calories: 230,
      protein: 10,
      image: "🥗"
    },

    dinner: {
      type: "Dinner",
      time: "8:00 PM",
      name: "Mixed Vegetable Curry & Roti",
      description:
        "Mixed seasonal vegetables served with whole-wheat roti.",
      ingredients:
        "Mixed vegetables, tomato, onion, spices, 2 small rotis",
      calories: 450,
      protein: 14,
      image: "🍛"
    }
  },


  internationalNonVeg: {

    breakfast: {
      type: "Breakfast",
      time: "8:00 AM",
      name: "Egg & Whole Grain Toast",
      description:
        "Eggs with whole-grain toast and fresh fruit.",
      ingredients:
        "2 eggs, 2 slices whole-grain toast, berries",
      calories: 390,
      protein: 24,
      image: "🍳"
    },

    morningSnack: {
      type: "Morning Snack",
      time: "11:00 AM",
      name: "Banana & Almonds",
      description:
        "A simple energy-boosting snack.",
      ingredients:
        "1 banana, 10 almonds",
      calories: 190,
      protein: 5,
      image: "🍌"
    },

    lunch: {
      type: "Lunch",
      time: "1:30 PM",
      name: "Grilled Chicken Rice Bowl",
      description:
        "Grilled chicken with rice and fresh vegetables.",
      ingredients:
        "Chicken breast, brown rice, lettuce, tomato, cucumber",
      calories: 560,
      protein: 40,
      image: "🍗"
    },

    eveningSnack: {
      type: "Evening Snack",
      time: "5:00 PM",
      name: "Greek Yogurt & Berries",
      description:
        "A protein-rich yogurt snack with fresh berries.",
      ingredients:
        "Greek yogurt, blueberries, strawberries",
      calories: 180,
      protein: 15,
      image: "🫐"
    },

    dinner: {
      type: "Dinner",
      time: "8:00 PM",
      name: "Grilled Fish & Vegetables",
      description:
        "Grilled fish served with roasted vegetables.",
      ingredients:
        "Fish fillet, broccoli, carrots, zucchini",
      calories: 480,
      protein: 38,
      image: "🐟"
    }
  },


  internationalVeg: {

    breakfast: {
      type: "Breakfast",
      time: "8:00 AM",
      name: "Oatmeal & Berries",
      description:
        "Creamy oatmeal with berries and nuts.",
      ingredients:
        "Oats, milk, blueberries, strawberries, almonds",
      calories: 390,
      protein: 14,
      image: "🥣"
    },

    morningSnack: {
      type: "Morning Snack",
      time: "11:00 AM",
      name: "Banana & Almonds",
      description:
        "A simple fruit and nut snack.",
      ingredients:
        "1 banana, 10 almonds",
      calories: 190,
      protein: 5,
      image: "🍌"
    },

    lunch: {
      type: "Lunch",
      time: "1:30 PM",
      name: "Vegetable Rice Bowl",
      description:
        "Brown rice with colorful vegetables and beans.",
      ingredients:
        "Brown rice, beans, broccoli, carrots, bell peppers",
      calories: 480,
      protein: 18,
      image: "🥗"
    },

    eveningSnack: {
      type: "Evening Snack",
      time: "5:00 PM",
      name: "Greek Yogurt & Berries",
      description:
        "Yogurt with fresh berries.",
      ingredients:
        "Greek yogurt, blueberries, strawberries",
      calories: 180,
      protein: 15,
      image: "🫐"
    },

    dinner: {
      type: "Dinner",
      time: "8:00 PM",
      name: "Vegetable Pasta",
      description:
        "Whole-grain pasta with fresh vegetables.",
      ingredients:
        "Whole-grain pasta, tomato, spinach, bell pepper, herbs",
      calories: 460,
      protein: 16,
      image: "🍝"
    }
  }
}


// -----------------------------------------
// GET MEAL STYLE
// -----------------------------------------

function getMealStyle(userData) {

  const vegetarian =
    userData.dietType === "vegetarian"

  const international =
    userData.foodPreference === "international"

  if (vegetarian && international) {
    return mealDatabase.internationalVeg
  }

  if (vegetarian) {
    return mealDatabase.pakistaniVeg
  }

  if (international) {
    return mealDatabase.internationalNonVeg
  }

  return mealDatabase.pakistaniNonVeg
}


// -----------------------------------------
// CHECK RESTRICTIONS
// -----------------------------------------

function containsRestriction(
  meal,
  restrictions
) {

  if (!restrictions) {
    return false
  }

  const text = `
    ${meal.name}
    ${meal.description}
    ${meal.ingredients}
  `.toLowerCase()

  const words = restrictions
    .toLowerCase()
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)

  return words.some((word) =>
    text.includes(word)
  )
}


// -----------------------------------------
// SAFE REPLACEMENT MEALS
// -----------------------------------------

function getReplacementMeals(userData) {

  const vegetarian =
    userData.dietType === "vegetarian"

  if (vegetarian) {

    return [
      {
        type: "Extra Meal",
        time: "10:30 AM",
        name: "Fruit & Yogurt Bowl",
        description:
          "Fresh fruit with plain yogurt and a small portion of nuts.",
        ingredients:
          "Apple, banana, plain yogurt, almonds",
        calories: 250,
        protein: 10,
        image: "🍓"
      },

      {
        type: "Extra Meal",
        time: "4:00 PM",
        name: "Hummus & Vegetable Plate",
        description:
          "Hummus served with fresh vegetables.",
        ingredients:
          "Hummus, cucumber, carrot, tomato",
        calories: 220,
        protein: 8,
        image: "🥕"
      },

      {
        type: "Extra Meal",
        time: "6:30 PM",
        name: "Lentil Soup",
        description:
          "A warm lentil soup with vegetables.",
        ingredients:
          "Lentils, carrot, tomato, onion and spices",
        calories: 280,
        protein: 15,
        image: "🥣"
      }
    ]
  }

  return [
    {
      type: "Extra Meal",
      time: "10:30 AM",
      name: "Egg & Whole Wheat Toast",
      description:
        "A simple protein-rich snack.",
      ingredients:
        "2 eggs, whole-wheat toast",
      calories: 300,
      protein: 18,
      image: "🍳"
    },

    {
      type: "Extra Meal",
      time: "4:00 PM",
      name: "Chana Chaat",
      description:
        "Chickpeas with fresh vegetables.",
      ingredients:
        "Chickpeas, tomato, cucumber, onion, lemon",
      calories: 230,
      protein: 10,
      image: "🥗"
    },

    {
      type: "Extra Meal",
      time: "6:30 PM",
      name: "Lentil Soup",
      description:
        "A warm lentil soup with vegetables.",
      ingredients:
        "Lentils, carrot, tomato, onion and spices",
      calories: 280,
      protein: 15,
      image: "🥣"
    }
  ]
}


// -----------------------------------------
// CREATE MEALS
// -----------------------------------------

function createMeals(userData) {

  const style =
    getMealStyle(userData)

  const restrictions = [
    userData.foodToAvoid,
    userData.allergies
  ]
    .filter(Boolean)
    .join(",")

  const requestedMeals =
    Number(userData.mealsPerDay) || 3

  let meals = []


  // 3 MEALS

  if (requestedMeals === 3) {

    meals = [
      style.breakfast,
      style.lunch,
      style.dinner
    ]

  }


  // 4 MEALS

  else if (requestedMeals === 4) {

    meals = [
      style.breakfast,
      style.lunch,
      style.eveningSnack,
      style.dinner
    ]

  }


  // 5 MEALS

  else {

    meals = [
      style.breakfast,
      style.morningSnack,
      style.lunch,
      style.eveningSnack,
      style.dinner
    ]

  }


  // Remove restricted meals

  meals = meals.filter(
    (meal) =>
      meal &&
      !containsRestriction(
        meal,
        restrictions
      )
  )


  // Fill missing meals

  if (meals.length < requestedMeals) {

    const replacements =
      getReplacementMeals(userData)

    for (const replacement of replacements) {

      if (
        meals.length >=
        requestedMeals
      ) {
        break
      }

      if (
        !containsRestriction(
          replacement,
          restrictions
        )
      ) {
        meals.push(replacement)
      }
    }
  }


  // Final safety check

  return meals
    .filter(Boolean)
    .slice(0, requestedMeals)
}


// -----------------------------------------
// GET REPLACEMENT MEAL
// -----------------------------------------
//
// Used by the "Regenerate Meal" button.
// Finds another meal that matches the
// user's diet and food preferences.
//

export function getReplacementMeal(
  currentMeal,
  userData
) {

  const vegetarian =
    userData.dietType === "vegetarian"

  const foodPreference =
    userData.foodPreference ||
    "pakistani"


  let availableMeals = []


  // Pakistani meals

  if (
    foodPreference === "pakistani" ||
    foodPreference === "both"
  ) {

    const pakistaniMeals =
      vegetarian
        ? mealDatabase.pakistaniVeg
        : mealDatabase.pakistaniNonVeg

    availableMeals.push(
      ...Object.values(
        pakistaniMeals
      )
    )
  }


  // International meals

  if (
    foodPreference === "international" ||
    foodPreference === "both"
  ) {

    const internationalMeals =
      vegetarian
        ? mealDatabase.internationalVeg
        : mealDatabase.internationalNonVeg

    availableMeals.push(
      ...Object.values(
        internationalMeals
      )
    )
  }


  // Add replacement meals too

  availableMeals.push(
    ...getReplacementMeals(userData)
  )


  // User restrictions

  const restrictions = [
    userData.foodToAvoid,
    userData.allergies
  ]
    .filter(Boolean)
    .join(",")


  // Remove current meal

  availableMeals =
    availableMeals.filter(
      (meal) =>
        meal.name !== currentMeal.name
    )


  // Remove restricted meals

  availableMeals =
    availableMeals.filter(
      (meal) =>
        !containsRestriction(
          meal,
          restrictions
        )
    )


  // Prefer the same meal type

  const sameTypeMeals =
    availableMeals.filter(
      (meal) =>
        meal.type === currentMeal.type
    )


  const mealPool =
    sameTypeMeals.length > 0
      ? sameTypeMeals
      : availableMeals


  // Nothing available

  if (!mealPool.length) {
    return currentMeal
  }


  // Pick random meal

  const randomIndex =
    Math.floor(
      Math.random() *
      mealPool.length
    )

  const replacement =
    mealPool[randomIndex]


  // Keep the original time and type

  return {
    ...replacement,
    type: currentMeal.type,
    time: currentMeal.time
  }
}


// -----------------------------------------
// GENERATE COMPLETE PLAN
// -----------------------------------------

export function generateDietPlan(
  userData
) {

  const age =
    Number(userData.age) || 25

  const heightCm =
    getHeightCm(userData)

  const weightKg =
    getWeightKg(
      userData.weight,
      userData.weightUnit
    )


  // Mifflin-St Jeor demo estimate

  const bmr =
    (10 * weightKg) +
    (6.25 * heightCm) -
    (5 * age) +
    5


  const activity =
    activityMultiplier[
      userData.activity
    ] || 1.4


  let calories =
    Math.round(
      bmr * activity
    )


  if (
    userData.goal === "lose"
  ) {
    calories -= 300
  }


  if (
    userData.goal === "gain"
  ) {
    calories += 300
  }


  calories =
    Math.max(
      1400,
      calories
    )


  const protein =
    Math.round(
      weightKg * 1.5
    )


  const carbs =
    Math.round(
      (calories * 0.45) / 4
    )


  const water =
    Math.max(
      1.8,
      weightKg * 0.035
    ).toFixed(1)


  const meals =
    createMeals(userData)


  return {

    calories,

    protein,

    carbs,

    water,

    currentWeight:
      Number(
        userData.weight
      ) || 70,

    targetWeight:
      Number(
        userData.targetWeight
      ) ||
      Number(
        userData.weight
      ) ||
      70,

    goal:
      userData.goal ||
      "maintain",

    goalText:
      goalText[
        userData.goal
      ] ||
      "Maintain Weight",

    dietType:
      userData.dietType,

    foodPreference:
      userData.foodPreference,

    mealsPerDay:
      Number(
        userData.mealsPerDay
      ) || 3,

    foodToAvoid:
      userData.foodToAvoid ||
      "",

    allergies:
      userData.allergies ||
      "",

    meals

  }
}