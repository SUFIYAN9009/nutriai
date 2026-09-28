import Navbar from "../components/Navbar"
import Hero from "../components/Hero"
import HowItWorks from "../components/HowItWorks"
import Footer from "../components/Footer"

function Home() {
  return (
    <div className="app">

      <Navbar />

      <main>

        <Hero />

        <HowItWorks />

      </main>

      <Footer />

    </div>
  )
}

export default Home