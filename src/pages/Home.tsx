import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import logo from '../assets/logo_home.png'; // логотип "Открытый кампус"
import avatar from '../assets/avatar.png';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const Home: React.FC = () => {
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
          <Link to="/events" className="home-btn-orange">
            Зарегистрироваться на мероприятие
          </Link>
          <Link to="/locations" className="home-btn-orange">
            Забронировать помещение
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
