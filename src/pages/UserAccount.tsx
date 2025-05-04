import React, { useEffect, useState } from 'react'; 
import { Link, useNavigate } from 'react-router-dom';
import '../styles/UserAccount.css';
import logoImage from '../assets/logo.png';

export default function UserAccount() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [position, setPosition] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    const storedFullName = localStorage.getItem("fullName");
    const storedPosition = localStorage.getItem("position");
    if (storedFullName && storedPosition) {
      setFullName(storedFullName);
      setPosition(storedPosition);
      setIsSaved(true);
    }
  }, []);

  const validateFullName = (name: string) => {
    const namePattern = /^[A-ZА-ЯЁ][a-zа-яё]+ [A-ZА-ЯЁ][a-zа-яё]+ [A-ZА-ЯЁ][a-zа-яё]+$/;
    return namePattern.test(name);
  };

  const handleLogin = () => {
    if (!validateFullName(fullName) || !position) {
      setError('Введите корректные данные');
      return;
    }
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("position", position);
    setIsSaved(true);
    setError('');
    setButtonClicked(true);
  };
  
  const handleRegister = () => {
    if (!validateFullName(fullName) || !position) {
      setError('Введите корректные данные');
      return;
    }
    
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("position", position);

    alert('Регистрация успешна');
    setButtonClicked(true);
  };


  const handleSave = () => {
    if (!validateFullName(fullName)) {
      setError('Введите корректные данные');
      return;
    }

    localStorage.setItem("fullName", fullName);
    localStorage.setItem("position", position);
    setIsSaved(true);
    setError('');
  };

  const handleLogout = () => {
    localStorage.removeItem("fullName");
    localStorage.removeItem("position");
    navigate("/");
  };

  const isFormComplete = fullName.trim() !== '' && position.trim() !== '';

  return (
    <div className="user-account-container">
      <div className="sidebar">
        <div className="logo">
          <img src={logoImage} alt="Логотип" className="logo-img" />
        </div>
        <Link to="/" className="btn-orange">← На главную</Link>
        <a href="#" onClick={handleLogout} className="logout-link">Выйти из аккаунта</a>
      </div>

      <div className="main-content">
        <h1 className="profile-header">Профиль</h1>

        <div className="profile-info">
          <div className="photo-placeholder">Загрузить фото</div>
          <div className="form-fields">
            <label>ФИО</label>
            <input
              type="text"
              className="form-control custom-select"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Введите ФИО"
              disabled={isSaved}
            />
            {error && <div className="error-message">{error}</div>}

            <label>Пароль</label>
            <input
              type="password"
              className="form-control custom-select"
              value={position}

              onChange={(e) => {
                const value = e.target.value;
                setPosition(value);
              
                const passwordPattern = /^[A-Za-z0-9!@#$%^&*_]*$/;
                if (!passwordPattern.test(value)) {
                  setPasswordError('Допустимые символы: латинские буквы A–Z, a–z, цифры 0–9 и спецсимволы (!@#$%^&*_)');
                } else {
                  setPasswordError('');
                }
              }}
              placeholder="Введите пароль"
              disabled={isSaved}
            />
            {passwordError && <small className="hint-text error">{passwordError}</small>}

            <div className="button-group">
              <button
                className={`save-btn ${isFormComplete && !isSaved ? 'active' : ''} ${buttonClicked ? 'disabled' : ''}`}
                disabled={!isFormComplete || isSaved || buttonClicked}
                onClick={handleLogin}
              >
                Войти
              </button>
              <button
                className={`save-btn ${isFormComplete && !isSaved ? 'active' : ''} ${buttonClicked ? 'disabled' : ''}`}
                disabled={!isFormComplete || isSaved || buttonClicked}
                onClick={handleRegister}
              >
                Зарегистрироваться
              </button>

            </div>

          </div>
        </div>

        <h2 className="section-title">Мои брони</h2>

        <div className="booking-card">
          <div className="booking-header">
            <strong className="col-event">Мероприятие</strong>
            <strong className="col-booked">Забронировано</strong>
            <strong className="col-status">Статус</strong>
          </div>

          <div className="booking-content">
            <div className="col-event event-details">
              Цикл лекций "Искусство XX века". Блок первый. Искусство авангарда. Лекция первая. Ранний европейский авангард
            </div>
            <div className="col-booked centered-text">16.11.2025</div>
            <div className="col-status centered-text text-success">Подтверждено</div>
          </div>

          <div className="booking-actions">
            <Link to="/events" className="btn-orange">Подробнее</Link>
          </div>
        </div>

        <div className="more-events">
          <span>Посетите больше мероприятий!</span>
          <Link to="/events" className="btn-dark-custom">Мероприятия</Link>
        </div>
      </div>
    </div>
  );
}
