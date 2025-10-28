 import Footer from "./components/Footer"
import MovieContent from "./components/MovieContent"
import Navbar from "./components/Navbar"
import ScrollToTop from "./components/ScrollToTop"
import {MoviesProvider} from "../src/context/MoviesContext"
function App() {
  return (
    <MoviesProvider>
      <div className="min-h-screen text-white">
      <Navbar/>
      <main>
        <MovieContent/>
      </main>
      <Footer/>
      <ScrollToTop/>
    </div>
    </MoviesProvider>
  )
}

export default App
