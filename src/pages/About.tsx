import { Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Navbar, Nav, Dropdown } from "react-bootstrap";
import avatar from "../assets/avatar.png";
import logo from "../assets/logo_home.png";
import "../styles/Events.css";
import MainSection from '../components/Locations/mainSection';

export default function About() {
  const navigate = useNavigate();

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

      {/* Остальной контент страницы About */}
      <div className="hero-about">
        <h1>о пространстве</h1>
        <p>Казанская улица, д. 1 📍</p>
      </div>

      <Container fluid className="my-5 py-5">
        <div className="text-center">
          <h2 className="display-4 mb-4">Страница в разработке</h2>
          <p className="lead">Скоро здесь появится подробная информация о нашем пространстве</p>
        </div>
      </Container>

      <MainSection />
    </div>
  );
}