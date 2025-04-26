import { useState } from "react";
import { Link } from "react-router-dom";
import { Nav } from "react-bootstrap";
import logo from "C:/Users/Pokemon's/Documents/GitHub/open-campus-frontend-2025s/src/assets/logo_admin.png";
import smallLogo from "C:/Users/Pokemon's/Documents/GitHub/open-campus-frontend-2025s/src/assets/logo_small_admin.png";
import { Home, Calendar, MapPin, Info, User, ArrowLeftCircle, ArrowLeft } from "react-feather";

function Sidebar() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="bg-light p-3 d-flex flex-column sidebar-inner"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{ height: "100%" }}
    >
      {/* Логотип */}
      <div className="text-center mb-4 mt-3">
        {isHovered ? (
          <img src={logo} alt="Открытый кампус" className="img-fluid" style={{ maxHeight: "60px" }} />
        ) : (
          <img src={smallLogo} alt="Открытый кампус" className="img-fluid" style={{ maxHeight: "40px" }} />
        )}
      </div>

      {/* Навигация */}
      <Nav className="flex-column gap-2">
        <Nav.Link as={Link} to="/admin/dashboard">
          <ArrowLeftCircle size={18} /> {isHovered && <span className="ms-2">Главная панель</span>}
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/home">
          <Home size={18} /> {isHovered && <span className="ms-2">Домашняя страница</span>}
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/events">
          <Calendar size={18} /> {isHovered && <span className="ms-2">Мероприятия</span>}
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/locations">
          <MapPin size={18} /> {isHovered && <span className="ms-2">Локации</span>}
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/about">
          <Info size={18} /> {isHovered && <span className="ms-2">О пространстве</span>}
        </Nav.Link>
        <Nav.Link as={Link} to="/admin/editor-account">
          <User size={18} /> {isHovered && <span className="ms-2">Профиль</span>}
        </Nav.Link>
      </Nav>

      <hr />

      {/* Кнопка "Вернуться на сайт" или иконка */}
      <div className="mt-4">
        {isHovered ? (
          <Link to="/" className="btn btn-outline-primary w-100 d-flex align-items-center justify-content-center">
            <ArrowLeft size={18} className="me-2"/> Вернуться на сайт
          </Link>
        ) : (
          <Link to="/" className="text-dark d-flex align-items-center justify-content-center">
            <ArrowLeft size={24} />
          </Link>
        )}
      </div>
    </div>
  );
}

export default Sidebar;



  