import { Container, Row, Col, Navbar, Nav, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import EventCard from "../components/Events/EventCard";
import EventFilters from "../components/Events/EventFilters";
import NoEventsPlaceholder from "../components/Events/NoEventsPlaceholder";
import avatar from "../assets/avatar.png";
import logo from "../assets/logo_home.png";
import "D:/open-campus-frontend-2025s/src/styles/Events.css";

const mockEvents = [
  {
    id: 1,
    title: "Цикл лекций 'Искусство XX века'. Лекция 1: Ранний европейский авангард",
    date: "2025-11-16",
    image: "/images/art1.jpg",
  },
  {
    id: 2,
    title:
      "Растения, птицы, животные и водные обитатели в корейской живописи эпохи Чосон",
    date: "2025-12-06",
    image: "/images/tiger.jpg",
  },
];

export default function EventsPage() {
  return (
    <div className="events-wrapper">
      {/* Навбар как в Home */}
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

      {/* Hero */}
      <div className="hero">
        <h1>мероприятия</h1>
        <p>Казанская улица, д. 1 📍</p>
      </div>

      {/* Контент */}
      <Container fluid className="mt-5">
        <EventFilters />

        {mockEvents.length > 0 ? (
          <Row className="gy-4">
            {mockEvents.map((event) => (
              <Col md={6} key={event.id}>
                <EventCard event={event} />
              </Col>
            ))}
          </Row>
        ) : (
          <NoEventsPlaceholder />
        )}
      </Container>
    </div>
  );
}
