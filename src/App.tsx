import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Locations from "./pages/Locations";
import About from "./pages/About";
import NotFound from "./pages/NotFound";
import "bootstrap/dist/css/bootstrap.min.css"

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/events">Мероприятия</Link>
        <Link to="/locations">Локации</Link>
        <Link to="/about">О пространстве</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/about" element={<About />} />
        <Route path="*" element={<NotFound />} />  {/* Обработчик 404 */}
      </Routes>
    </Router>
  );
}

export default App;
