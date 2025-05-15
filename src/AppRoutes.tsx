import { Routes, Route, Link, useLocation} from "react-router-dom";
import Home from "./pages/Home";
import Events from "./pages/Events";
import Locations from "./pages/Locations";
import About from "./pages/About";
import AboutEvent from "./pages/AboutEvent";
import UserAccount from "./pages/UserAccount";
import NotFound from "./pages/NotFound";

// Страницы админки
import AdminDashboard from "./admin/pages/AdminDashBoard";
import AdminHome from "./admin/pages/AdminHome";
import AdminEvent from "./admin/pages/AdminEvent";
import AdminLocations from "./admin/pages/AdminLocations";
import AdminAbout from "./admin/pages/AdminAbout";
import AdminEditorAccount from "./admin/pages/AdminEditorAccount";

// Импорт AdminLayout
import AdminLayout from "./admin/layouts/AdminLayout";

function AppRoutes() {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin")||
                      location.pathname === "/user-account"||
                      location.pathname === "/";

  return (
    <>
      {!isAdminPage && (
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
        <Route path="*" element={<NotFound />} />
        <Route path="/profile" element={<UserAccount />} />

        {/* Админка с AdminLayout */}
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
