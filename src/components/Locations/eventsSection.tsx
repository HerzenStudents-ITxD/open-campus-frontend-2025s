import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'aos/dist/aos.css';
import 'animate.css';
import '../../index.css'; // Подключаем стили, включая font-face и стили меню

import userIcon from '../../assets/Locations/user_icon.svg';
import logo from '../../assets/Locations/6ae87cd89a946d79dbbe1eee19622557.svg';

interface EventsSectionProps {
  className?: string;
}

const EventsSection: React.FC<EventsSectionProps> = ({ className }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <section className={`d-flex flex-column ${className || ''}`}>
      {/* Верхняя панель */}
      <div
        className="d-flex align-items-center"
        style={{
          backgroundColor: '#1D213C',
          height: '78px',
          padding: '0 24px 0 0',
        }}
      >
        <div className="d-flex align-items-center w-100" style={{ maxWidth: '1440px', margin: '0 auto' }}>
          {/* Логотип */}
          <img
            src={logo}
            alt="Логотип"
            style={{ width: '200px', height: 'auto' }}
          />

          {/* Центрированное меню */}
          <div
            className="d-flex justify-content-center align-items-center w-100"
            style={{ gap: '40px', marginLeft: '-140px' }}
          >
            <span className="text-white literal-bold-white">Мероприятия</span>
            <span className="text-white literal-bold-white">Локации</span>
            <span className="text-white literal-bold-white">О пространстве</span>
          </div>

          {/* Иконка пользователя */}
          <div
            style={userIconStyle}
            onClick={toggleMenu}
          >
            <img
              src={userIcon}
              alt="Личный кабинет"
              style={{ width: '32px', height: 'auto' }}
            />
          </div>
        </div>
      </div>

      {/* Меню пользователя */}
      <div
        className="d-flex flex-column gap-1 align-items-start py-1"
        style={{
          backgroundColor: '#f1f1f1',
          position: 'absolute',
          top: '68px',
          right: '24px',
          width: '220px',
          boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.2)',
          borderRadius: '10px',
          zIndex: 1000,
          padding: '8px',
          opacity: isMenuOpen ? 1 : 0,
          transition: 'opacity 0.2s ease-in-out',
          pointerEvents: isMenuOpen ? 'auto' : 'none',
        }}
      >
        <div className="text-dark" style={phoneStyle}>+7 (999) 999 99 99</div>

        {['Мои брони', 'Мои билеты', 'Профиль', 'Выход'].map((item, index) => (
          <a
            key={index}
            href="#"
            className="menu-link"
          >
            {item}
          </a>
        ))}
      </div>
    </section>
  );
};

// --- Стили ---
const phoneStyle: React.CSSProperties = {
  fontSize: '14px',
  fontWeight: 'bold',
  width: '100%',
  textAlign: 'right',
  padding: '0 12px',
};

const userIconStyle: React.CSSProperties = {
  width: '40px',
  height: '40px',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  cursor: 'pointer',
};

export default EventsSection;
