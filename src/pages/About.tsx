import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import avatar from "../assets/avatar.png";
import logo from "../assets/logo_home.png";
import "../styles/Events.css"; // Используем те же стили
import MainSection from '../components/Locations/mainSection';

export default function About() {
  return (
    <div className="events-wrapper">
      {/* Навбар - идентичный EventsPage */}
      <Navbar className="top-navbar px-4 py-2" expand="lg">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <img src={logo} alt="Логотип" width={170} height={60} />
        </Navbar.Brand>

        <Nav className="d-flex align-items-center gap-4 justify-content-center flex-grow-1">
          <Link to="/events" className="nav-link text-white">Мероприятия</Link>
          <Link to="/locations" className="nav-link text-white">Локации</Link>
          <Link to="/about" className="nav-link text-white">О пространстве</Link>
        </Nav>

        <Dropdown align="end" className="ms-auto">
          <Dropdown.Toggle as="button" id="dropdown-avatar" style={{ cursor: 'pointer', background: 'none', border: 'none', padding: 0 }}>
            <img src={avatar} alt="Аватар" className="avatar-img" />
          </Dropdown.Toggle>

          <Dropdown.Menu style={{ minWidth: 150 }}>
            <Dropdown.Header className="dropdown-title">Войти в аккаунт</Dropdown.Header>
            <Dropdown.Item as={Link} to="/user-account">Пользователь</Dropdown.Item>
            <Dropdown.Item as={Link} to="/admin/dashboard">Редактор</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Navbar>

      {/* Hero-секция */}
      <div className="hero-about">
        <h1>о пространстве</h1>
        <p>Казанская улица, д. 1 📍</p>
      </div>

      {/* Основной контент - заглушка */}
      <Container fluid className="my-5 py-5">
        <div className="text-center">
          <h2 className="display-4 mb-4">Страница в разработке</h2>
          <p className="lead">Скоро здесь появится подробная информация о нашем пространстве</p>
        </div>
      </Container>

      {/* Футер - идентичный EventsPage */}
      <MainSection />
    </div>
  );
}