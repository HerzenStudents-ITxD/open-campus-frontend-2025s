import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import logo from "D:/open-campus-frontend-2025s/src/assets/logo_admin.png";

function Sidebar() {
  return (
    <div
      className="bg-light vh-100 p-3 d-flex flex-column"
      style={{ width: "100%", minWidth: "200px", marginTop: "20px" }}
    >
      {/* Логотип */}
      <div className="text-center mb-4 mt-3">
        <img
          src={logo}
          alt="Открытый кампус"
          className="img-fluid"
          style={{ maxHeight: "60px" }}
        />
      </div>

      {/* Навигация */}
      <Nav className="flex-column">
        <Nav.Link as={Link} to="/admin/dashboard">Главная панель</Nav.Link>
        <Nav.Link as={Link} to="/admin/home">Домашняя страница</Nav.Link>
        <Nav.Link as={Link} to="/admin/events">Мероприятия</Nav.Link>
        <Nav.Link as={Link} to="/admin/locations">Локации</Nav.Link>
        <Nav.Link as={Link} to="/admin/about">О пространстве</Nav.Link>
        <Nav.Link as={Link} to="/admin/editor-account">Профиль</Nav.Link>
      </Nav>

      <hr />

      {/* Кнопка */}
      <div className="mt-3">
        <Link to="/" className="btn btn-outline-primary w-100">
          Вернуться на сайт
        </Link>
      </div>
    </div>
  );
}

export default Sidebar;






  