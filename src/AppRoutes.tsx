import { Routes, Route, Link, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Locations from "./pages/Locations";
import About from "./pages/About";
import AboutEvent from "./pages/AboutEvent";
import UserAccount from "./pages/UserAccount";
import NotFound from "./pages/NotFound";

// Страницы админки
import AdminDashboard from "./admin/pages/AdminDashBoard";
import AdminEvent from "./admin/pages/AdminEvent";
import AdminLocations from "./admin/pages/AdminLocations";
import AdminAbout from "./admin/pages/AdminAbout";
import AdminEditorAccount from "./admin/pages/AdminEditorAccount";

function AppRoutes() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  return (
    <>
      <nav style={{ marginBottom: "20px" }}>
        {!isAdminPage ? (
          <>
            <Link to="/">Главная</Link> |{" "}
            <Link to="/events">Мероприятия</Link> |{" "}
            <Link to="/locations">Локации</Link> |{" "}
            <Link to="/about">О пространстве</Link> |{" "}
            <Link to="/user-account">Аккаунт пользователя</Link> |{" "}
            <Link to="/admin">Аккаунт редактора</Link>
          </>
        ) : (
          <Link to="/">Вернуться на сайт Открытого кампуса</Link>
        )}
      </nav>

      <Routes>
        {/* Обычные страницы */}
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/locations" element={<Locations />} />
        <Route path="/about" element={<About />} />
        <Route path="/about-event" element={<AboutEvent />} />
        <Route path="/user-account" element={<UserAccount />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/profile" element={<UserAccount />} />

        {/* Админка */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/events" element={<AdminEvent />} />
        <Route path="/admin/locations" element={<AdminLocations />} />
        <Route path="/admin/about" element={<AdminAbout />} />
        <Route path="/admin/editor-account" element={<AdminEditorAccount />} />
      </Routes>
    </>
  );
}

export default AppRoutes;
