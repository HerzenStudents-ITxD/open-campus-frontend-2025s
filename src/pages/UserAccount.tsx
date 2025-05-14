import React, { useEffect, useState } from 'react';  
import { Link, useNavigate } from 'react-router-dom';
import '../styles/UserAccount.css';
import logoImage from '../assets/logo.png';
import calendarIcon from '../assets/calendar-icon.png';
import Calendar from 'react-calendar';
import '../styles/Calendar.css';
import ChangePasswordModal from './ChangePasswordModal';

export default function UserAccount() {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [position, setPosition] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);
  const [showBookingCalendar, setShowBookingCalendar] = useState(false);
  const [showTicketCalendar, setShowTicketCalendar] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const isPasswordValid = (password: string) => {
    const pattern = /^(?=.*[A-Za-z])[A-Za-z0-9]{8,}$/;
    return pattern.test(password.trim());
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhoto(result); 
        localStorage.setItem("photo", result); 
      };
      reader.readAsDataURL(file);
    }
  };
  
  useEffect(() => {
    const storedFullName = localStorage.getItem("fullName");
    const storedPosition = localStorage.getItem("position");
    const storedPhoto = localStorage.getItem("photo");

    if (storedFullName && storedPosition) {
      setFullName(storedFullName);
      setPosition(storedPosition);
      setIsSaved(true);
    }
    if (storedPhoto) {
      setPhoto(storedPhoto);
    }
  }, []);

  const validateFullName = (name: string) => {
    const namePattern = /^[A-ZА-ЯЁ][a-zа-яё]+ [A-ZА-ЯЁ][a-zа-яё]+ [A-ZА-ЯЁ][a-zа-яё]+$/;
    return namePattern.test(name);
  };

  const handleLogin = () => {
    if (!validateFullName(fullName) || !isPasswordValid(position)) {
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
    if (!validateFullName(fullName) || !isPasswordValid(position)) {
      setError('Введите корректные данные');
      return;
    }
    
    localStorage.setItem("fullName", fullName);
    localStorage.setItem("position", position);

    alert('Регистрация успешна');
    setButtonClicked(true);
    setIsSaved(true); 
  };

  const handleLogout = () => {
    localStorage.removeItem("fullName");
    localStorage.removeItem("position");
    localStorage.removeItem("photo");

    setPhoto(null);       
    setFullName('');
    setPosition('');
    setIsSaved(false);
    setButtonClicked(false);
    navigate("/");
  };

  const isFormComplete = fullName.trim() !== '' && isPasswordValid(position);

  return (
    <div className="user-account-container">
      <div className="sidebar">
        <div className="logo">
          <img src={logoImage} alt="Логотип" className="logo-img" />
        </div>
        <Link to="/" className="btn-orange">← На главную</Link>
      </div>

      <div className="main-content">
        <h1 className="profile-header">Профиль</h1>

        <div className="profile-info">
          <div
            className="photo-placeholder position-relative"
            onClick={() => document.getElementById('photoInput')?.click()}
          >
            {photo ? (
              <img src={photo} alt="Фото профиля" className="uploaded-photo img-fluid rounded" />
            ) : (
              <span className="text-muted text-center w-100 upload-label">Загрузить фото</span>
            )}
          </div>

          <input
            type="file"
            id="photoInput"
            accept="image/*"
            style={{ display: 'none' }}
            onChange={handlePhotoUpload}
          />

          <div className="form-fields">
            <label>ФИО</label>
            <input
              type="text"
              className="form-control custom-select"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="Введите ФИО"
              autoComplete="name"
              disabled={isSaved}
            />
            {error && <small className="hint-text error">Введите корректные данные</small>}

            <label>Пароль</label>
            <input
              type="password"
              className="form-control custom-select"
              value={position}
              onChange={(e) => {
                const value = e.target.value;
                setPosition(value);

                if (!isPasswordValid(value)) {
                  setPasswordError('Пароль должен быть не короче 8 символов и содержать только латинские буквы и цифры');
                } else {
                  setPasswordError('');
                }
              }}
              placeholder="Введите пароль"
              autoComplete="current-password"
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


        {/* БИЛЕТЫ */}
        <h2 className="section-title">Мои билеты</h2>
                <div className="booking-card">
                  <div className="booking-header">
                    <strong className="col-event">Мероприятие</strong>
                    <strong className="col-booked d-flex align-items-center gap-2">
                      Забронировано
                      <img
                        src={calendarIcon}
                        alt="calendar"
                        width="26"
                        height="26"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShowTicketCalendar(!showTicketCalendar)}
                      />
                    </strong>
                    <strong className="col-status">Статус</strong>
                  </div>

                  {showTicketCalendar && (
                    <div style={{ position: 'relative', marginTop: '10px' }}>
                      <Calendar
                        value={new Date('2025-11-16')}
                        tileClassName={({ date }) =>
                          date.toDateString() === new Date('2025-11-16').toDateString()
                            ? 'highlight'
                            : null
                        }
                      />
                    </div>
                  )}

                  <div className="booking-content">
                    <div className="col-event event-details">
                      Цикл лекций "Искусство XX века". Блок первый. Искусство авангарда. Лекция первая. Ранний европейский авангард
                      <div className="location-info">
                        <strong>Локация:</strong>{' '}
                        <Link to="/locations" className="location-link">открытая гостиная</Link>
                      </div>
                    </div>
                    <div className="col-booked centered-text">16.11.2025</div>
                    <div className="col-status centered-text text-success">Подтверждено</div>
                  </div>
                </div>

                <div className="more-events">
                  <span>Посетите больше мероприятий!</span>
                  <Link to="/events" className="btn-dark-custom">Мероприятия</Link>
                </div>



        {/* БРОНИ */}

        <h2 className="section-title" style={{ marginTop: '40px' }}>Мои брони</h2>
                <div className="booking-card">
                  <div className="booking-header">
                    <strong className="col-events">Помещение</strong>
                    <strong className="col-booked d-flex align-items-center gap-2">
                      Забронировано
                      <img
                        src={calendarIcon}
                        alt="calendar"
                        width="26"
                        height="26"
                        style={{ cursor: 'pointer' }}
                        onClick={() => setShowBookingCalendar(!showBookingCalendar)}
                      />
                    </strong>
                    <strong className="col-status">Длительность</strong>
                    <strong className="col-status">Статус</strong>

                  </div>

                  {showBookingCalendar && (
                    <div style={{ position: 'relative', marginTop: '10px' }}>
                      <Calendar
                        value={new Date('2025-11-13')}
                        tileClassName={({ date }) =>
                          date.toDateString() === new Date('2025-11-13').toDateString()
                            ? 'highlight'
                            : null
                        }
                      />
                    </div>
                  )}

                  <div className="booking-content">
                    <div className="event-details">
                      <Link to="/locations" className="location-link">Большой коворкинг</Link>
                    </div>

                    <div className="col-booked centered-text">13.11.2025; 14:30</div>
                    <div className="col-status centered-text">1,5 часа</div>
                    <div className="col-status centered-text text-success">Подтверждено</div>
                  </div>
                </div>

                <div className="more-events">
                  <span>Забронируйте помещение!</span>
                  <Link to="/locations" className="btn-dark-custom">Локации</Link>
                </div>








        <h2 className="section-title" style={{ marginTop: '40px' }}>История</h2>
        <div className="more-events">
          <span>Пока пусто!</span>
        </div>

      </div>

      <div className="fixed-actions">
        <button className="password" onClick={() => setShowPasswordModal(true)}>
          Изменить пароль
        </button>

        {showPasswordModal && (
          <ChangePasswordModal onClose={() => setShowPasswordModal(false)} />
        )}

        <a href="#" onClick={handleLogout} className="logout-link">Выйти из аккаунта</a>
      </div>

    </div>
  );
}
