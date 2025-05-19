import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Dropdown, Container } from 'react-bootstrap';
import '../styles/News.css';
import uzbekistanImg from '../assets/uzbekistan.png';
import logo from '../assets/logo_home.png';
import avatar from '../assets/avatar.png';
import backIcon from '../assets/back.png'; // Импорт изображения


const News: React.FC = () => {
  return (
    <>
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
        </Navbar>

      {/* Контент страницы новости */}
      <div className="news-wrapper">
        <div className="news-container">

          {/* Кнопка назад */}
          <Link to="/" className="back-button">
            <img src={backIcon} alt="Назад" style={{ width: '50px', height: '50px' }} />
          </Link>

          {/* Изображение и заголовок */}
          <div className="news-header">
            <img src={uzbekistanImg} alt="Узбекистан" className="news-image" />
            <div className="news-overlay">
              {/* <h2 className="news-title">
                ИТОГИ. КО ДНЮ КОНСТИТУЦИИ УЗБЕКИСТАНА И 630-ЛЕТИЮ МИРЗО УЛУГБЕКА
              </h2> */}
              <p className="news-hashtag">#событиякампуса</p>
            </div>
          </div>

          {/* Основной текст */}
          <div className="news-text">
            <p>
              И вновь мероприятие международного уровня в Открытом кампусе Герценовского университета.
              На этот раз поводом для встречи стал День Конституции Республики Узбекистан, а также круглая дата —
              день рождения великого узбекского ученого и государственного деятеля Мирзо Улугбека.
            </p>
            <p>
              Традиции, национальный колорит, творчество и угощения Узбекистана —
              на прошедшей встрече и в нашей итоговой статье.
            </p>
            <a
              href="https://vk.com/terraherz"
              target="_blank"
              rel="noopener noreferrer"
              className="news-link"
            >
              vk.com/@terraherz-kolorit-t...
            </a>
            <div className="hashtags">
              <span>#россияузбекистан</span>
              <span>#конституция</span>
              <span>#открытыйкампус</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default News;
