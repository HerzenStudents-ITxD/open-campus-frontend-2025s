import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import EventCard from "../components/Events/EventCard";
import EventFilters from "../components/Events/EventFilters";
import NoEventsPlaceholder from "../components/Events/NoEventsPlaceholder";
import avatar from "../assets/avatar.png";
import logo from "../assets/logo_home.png";
import "../styles/Events.css";
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import MainSection from '../components/Locations/mainSection';

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
      {/* Новая панель навигации (как в Home) */}
      <Navbar
        className="top-navbar px-4"
        style={{
          backgroundColor: '#1D213C',
          height: '78px',
          paddingRight: '24px',
          zIndex: 1000,
          width: '100%',
          maxWidth: '100%',
          margin: 0,
        }}
      >
        <div
          style={{
            maxWidth: '1440px',
            margin: '0 auto',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Navbar.Brand
            as={Link}
            to="/"
            className="d-flex align-items-center gap-2"
            style={{ cursor: 'pointer', position: 'relative', zIndex: 2000 }}
          >
            <img src={logo} alt="Логотип" width={200} height="auto" />
          </Navbar.Brand>

          <Nav
            className="ms-auto d-flex align-items-center gap-4"
            style={{
              marginRight: '100px',
              flexGrow: 1,
              justifyContent: 'center',
              gap: '40px',
              marginLeft: '-140px',
            }}
          >
            <span
              className="nav-link text-white literal-bold-white"
              onClick={() => navigate('/events')}
              style={{ cursor: 'pointer', padding: 0 }}
            >
              Мероприятия
            </span>
            <span
              className="nav-link text-white literal-bold-white"
              onClick={() => navigate('/locations')}
              style={{ cursor: 'pointer', padding: 0 }}
            >
              Локации
            </span>
            <span
              className="nav-link text-white literal-bold-white"
              onClick={() => navigate('/about')}
              style={{ cursor: 'pointer', padding: 0 }}
            >
              О пространстве
            </span>
          </Nav>

          <Dropdown align="end" className="ms-auto">
            <Dropdown.Toggle as="button" id="dropdown-avatar" style={{ 
              cursor: 'pointer', 
              background: 'none', 
              border: 'none', 
              padding: 0 
            }}>
              <img src={avatar} alt="Аватар" className="avatar-img" />
            </Dropdown.Toggle>

            <Dropdown.Menu style={{ minWidth: 150 }}>
              <Dropdown.Header className="dropdown-title">Войти в аккаунт</Dropdown.Header>
              <Dropdown.Item as={Link} to="/user-account">Пользователь</Dropdown.Item>
              <Dropdown.Item as={Link} to="/admin/dashboard">Редактор</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </Navbar>

      {/* Остальной контент страницы Events */}
      <div className="hero">
        <h1>мероприятия</h1>
        <p>Казанская улица, д. 1 📍</p>
      </div>

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