import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css';
import logo from '../assets/logo_home.png';
import avatar from '../assets/avatar.png';
import { useState } from 'react';
import { Navbar, Nav, Dropdown } from 'react-bootstrap';
import EventRegistrationModal from '../modal/EventRegistrationModal';
import BookingModal from '../modal/BookingModal';
import uzbekistanImg from '../assets/uzbekistan.png';
import chosonImg from '../assets/choson.png';
import MainSection from '../components/Locations/mainSection';
import okLogo from '../assets/OK.png';



const Home: React.FC = () => {
  const [showEventModal, setShowEventModal] = useState(false);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };
  const faqs = [
    {
      question: "Где можно припарковаться?",
      answer: "На территории кампуса парковка ограничена, но поблизости есть муниципальные и платные парковки. Рекомендуем использовать общественный транспорт."
    },
    {
      question: "Что представляет из себя мероприятие \"круглые столы\"?",
      answer: "Это встречи в формате открытых дискуссий между студентами, экспертами и преподавателями на актуальные темы."
    },
    {
      question: "Хочу разместить своё мероприятие, как это сделать?",
      answer: "Заполните форму бронирования помещения или свяжитесь с координатором проекта через раздел 'Контакты'."
    },
    {
      question: "Где можно отдохнуть или перекусить в открытом кампусе?",
      answer: "На территории работают зоны отдыха и кафе, доступные для всех посетителей."
    },
    {
      question: "Какие зоны кампуса будут открыты для посещения?",
      answer: "Вы можете посетить лектории, коворкинги, выставочные и интерактивные зоны, указанные на карте."
    },
    {
      question: "Есть ли доступ к Wi-Fi и рабочим местам?",
      answer: "Да, в каждой зоне предоставляется бесплатный Wi-Fi и рабочие места с розетками."
    },
  ];

  return (
    <>
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
        </Navbar>

        {/* Центрированный контент */}
        <div className="home-content">
          <div className="spacer" />
          <img 
            src={okLogo} 
            alt="Открытый кампус логотип" 
            className="ok-logo"
            style={{ maxWidth: '260px', marginBottom: '20px', marginTop: '-160px'}}
          />
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
      </div>


      <div className="content-section">

        {/* Новости */}
        <div className="content-block">
          <h1 className="content-title">Новости</h1>
          {/* Здесь предполагается сторонний слайдер, пока упрощённый */}
          <div className="news-carousel">
            <Link to="/news" style={{ textDecoration: 'none', color: 'inherit' }}>
              <div className="news-card">
                <img src={uzbekistanImg} alt="news1" />
                <p>Итоги ко Дню Конституции и 80-летию МИРЭО Узбекистана</p>
                <span>#СобытияКампуса</span>
              </div>
            </Link>

            <div className="news-card">
              <img src={chosonImg} alt="news2" />
              <p>Итоги лекции о корейской живописи эпохи Чосон</p>
              <span>#СобытияКампуса</span>
            </div>
          </div>
        </div>

        {/* Открытый кампус */}
        <div className="content-block">
          <div className="content-block-accent">
            <p>
              <strong>Открытый кампус</strong> — это проект <strong>РГПУ имени А. И. Герцена</strong>, предоставляющий бесплатные коворкинги, лекции, мастер-классы, научные интерактивы и выставки для любого желающего их посетить.
              <br /><br />
              Наша цель — предоставить возможность доступного досуга и развития с комфортом для вас.
            </p>
            <Link to="/about" style={{ textDecoration: 'none' }}>
              <button className="home-orange" style={{ marginTop: '0px', marginLeft: '875px' }}>
                Подробнее о нас
              </button>
            </Link>
          </div>
        </div>

        {/* Карта */}
        <div className="content-block">
          <h2 className="content-subtitle">Карта</h2>
          <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 0 10px rgba(0,0,0,0.1)' }}>
            <iframe
              src="https://yandex.ru/map-widget/v1/?um=constructor:CHvHbPL1&source=constructor"
              width="100%"
              height="400"
              frameBorder="0"
              title="Карта"
            />
          </div>
        </div>

        {/* Часто задаваемые вопросы */}
        <div className="content-block">
          <h2 className="content-subtitle">Часто задаваемые вопросы</h2>

          <div className="faq-list">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item" onClick={() => toggleFaq(index)} style={{ cursor: 'pointer' }}>
                <strong>{faq.question}</strong>
                {openFaqIndex === index && (
                  <p className="faq-answer" style={{ marginTop: '5px', color: '#555' }}>{faq.answer}</p>
                )}
              </div>
            ))}
          </div>

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

      <MainSection />
    </>
  );
};

export default Home;