import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Container, Row, Col, Navbar, Nav, Dropdown, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import EventCard from "../components/Events/EventCard";
import EventFilters from "../components/Events/EventFilters";
import NoEventsPlaceholder from "../components/Events/NoEventsPlaceholder";
import avatar from "../assets/avatar.png";
import logo from "../assets/logo_home.png";
import "../styles/Events.css";
import MainSection from '../components/Locations/mainSection';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Функция для загрузки мероприятий
  const fetchEvents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:5241/api/event");
      setEvents(response.data);
      setFilteredEvents(response.data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error("Ошибка при загрузке мероприятий:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Обработчик фильтрации по дате
const handleFilterChange = useCallback((date) => {
  if (!date) {
    setFilteredEvents(events);
    return;
  }
  
  const filtered = events.filter(event => {
    const eventDate = new Date(event.date);
    const filterDate = new Date(date);
    
    return (
      eventDate.getFullYear() === filterDate.getFullYear() &&
      eventDate.getMonth() === filterDate.getMonth() &&
      eventDate.getDate() === filterDate.getDate()
    );
  });
  
  setFilteredEvents(filtered);
}, [events]);

  // Загружаем данные при монтировании компонента
  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Загрузка...</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger m-4">
        Ошибка при загрузке мероприятий: {error}
      </div>
    );
  }

  return (
    <div className="events-wrapper">
      {/* Навбар */}
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
        <EventFilters onFilterChange={handleFilterChange} />

        {filteredEvents.length > 0 ? (
          <Row className="gy-4">
            {filteredEvents.map((event) => (
              <Col md={6} key={event.id}>
                <EventCard 
                  event={{
                    id: event.id,
                    title: event.title,
                    date: event.date,
                    image: event.image,
                    description: event.description,
                    location: event.location,
                    organizer: event.organizer
                  }}
                />
              </Col>
            ))}
          </Row>
        ) : (
          <NoEventsPlaceholder />
        )}
      </Container>
      <MainSection />
    </div>
  );
}