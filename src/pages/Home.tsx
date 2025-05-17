import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import logo from '../assets/logo_home.png'; // логотип "Открытый кампус"
import avatar from '../assets/avatar.png';
import { useState } from 'react';
import { Navbar, Nav, Dropdown, Modal, Form } from 'react-bootstrap';
import EventRegistrationModal from '../modal/EventRegistrationModal';
import BookingModal from '../modal/BookingModal';

const Home: React.FC = () => {

  const [showEventModal, setShowEventModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);

  return (
    <div className="home-wrapper">
      {/* Верхняя навигационная панель */}
      <Navbar className="top-navbar px-4 py-2">
        <Navbar.Brand as={Link} to="/" className="d-flex align-items-center gap-2">
          <img src={logo} alt="Логотип" width={170} height={60} />
        </Navbar.Brand>

        <Nav className="ms-auto d-flex align-items-center gap-4" style={{ marginRight: '100px' }}>
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

        {/* <div className="ms-auto d-flex align-items-center">
          <img src={avatar} alt="Аватар" className="avatar-img" />
        </div> */}
      </Navbar>

      {/* Центрированный контент */}
      <div className="home-content">
        <div className="spacer" /> {/* Пустой блок для отступа */}

        <p className="home-subtitle">
          Образовательная и культурная среда,<br />
          открытая для всех
        </p>

        <div className="button-group">
          <button 
            onClick={() => setShowEventModal(true)} 
            className="home-btn-orange"
          >
            Зарегистрироваться на мероприятие
          </button>

          <button 
            onClick={() => setShowBookingModal(true)} 
            className="home-btn-orange"
          >
            Забронировать помещение
          </button>

        </div>
      </div>

      <EventRegistrationModal 
        show={showEventModal}
        onHide={() => setShowEventModal(false)}
      />

      <BookingModal
        show={showBookingModal}
        onHide={() => setShowBookingModal(false)}
      />
    </div>
  );
};

export default Home;
