import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
// Используем компонент из components (если ты используешь кастомную версию Locations)
import Locations from "./components/Locations"; // или "./pages/Locations" — смотри, какой актуален
import About from "./pages/About";
import AboutEvent from "./pages/AboutEvent";
import UserAccount from "./pages/UserAccount";
import NotFound from "./pages/NotFound";
import News from './pages/News';

// Страницы админки
import AdminDashboard from "./admin/pages/AdminDashBoard";
import AdminHome from "./admin/pages/AdminHome";
import AdminEvent from "./admin/pages/AdminEvent";
import AdminLocations from "./admin/pages/AdminLocations";
import AdminAbout from "./admin/pages/AdminAbout";
import AdminEditorAccount from "./admin/pages/AdminEditorAccount";

// Макет админки
import AdminLayout from "./admin/layouts/AdminLayout";

function AppRoutes() {
  const location = useLocation();

  const isHiddenNavPage =
    location.pathname.startsWith("/admin") ||
    location.pathname === "/user-account" ||
    location.pathname === "/" || // как в версии одногруппников
    location.pathname.startsWith("/locations") || // как у тебя
    location.pathname === "/events" ||
    location.pathname === "/about" ||
    location.pathname === "/news";

  return (
    <>
      {!isHiddenNavPage && (
        <nav style={{ marginBottom: "20px" }}>
          <Link to="/">Главная</Link> |{" "}
          <Link to="/events">Мероприятия</Link> |{" "}
          <Link to="/locations">Локации</Link> |{" "}
          <Link to="/about">О пространстве</Link> |{" "}
          <Link to="/user-account">Аккаунт пользователя</Link> |{" "}
          <Link to="/admin/dashboard">Аккаунт редактора</Link>
        </nav>
      )}

      <Routes>
        {/* Обычные страницы */}
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/about" element={<About />} />
        <Route path="/about-event" element={<AboutEvent />} />
        <Route path="/user-account" element={<UserAccount />} />
        <Route path="/profile" element={<UserAccount />} />
        <Route path="/news" element={<News />} />
        <Route path="*" element={<NotFound />} />

        {/* Админка с макетом */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="home" element={<AdminHome />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="events" element={<AdminEvent />} />
          <Route path="locations" element={<AdminLocations />} />
          <Route path="about" element={<AdminAbout />} />
          <Route path="editor-account" element={<AdminEditorAccount />} />
        </Route>
      </Routes>
    </>
  );
}

export default AppRoutes;
