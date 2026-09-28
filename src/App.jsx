import { Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Planner from "./pages/Planner"
import PlanResult from "./pages/PlanResult"


import "./App.css"

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route
        path="/planner"
        element={<Planner />}
      />

      <Route
        path="/plan"
        element={<PlanResult />}
      />
      
    </Routes>
  )
}

export default App