import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Locations from "./pages/Locations";
import About from "./pages/About";
import AboutEvent from "./pages/AboutEvent";
import EditorAccount from "./pages/EditorAccount";
import UserAccount from "./pages/UserAccount";
import NotFound from "./pages/NotFound";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <nav>
        <Link to="/">Главная</Link>
        <Link to="/events">Мероприятия</Link>
        <Link to="/locations">Локации</Link>
        <Link to="/about">О пространстве</Link>
        <Link to="/editor-account">Аккаунт редактора</Link>
        <Link to="/user-account">Аккаунт пользователя</Link>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/about" element={<About />} />
        <Route path="/about-event" element={<AboutEvent />} />
        <Route path="/editor-account" element={<EditorAccount />} />
        <Route path="/user-account" element={<UserAccount />} />
        <Route path="*" element={<NotFound />} />  {/* Обработчик 404 */}
      </Routes>
    </Router>
  );
}

export default App;

