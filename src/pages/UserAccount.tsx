import React, { useEffect, useState } from 'react';  
import { Link, useNavigate } from 'react-router-dom';
import '../styles/UserAccount.css';
import logoImage from '../assets/logo.png';
import calendarIcon from '../assets/calendar-icon.png';
import Calendar from 'react-calendar';
import '../styles/Calendar.css';
import ChangePasswordModal from '../modal/ChangePasswordModal';
import axios from 'axios';
import { useTicketContext } from '../context/TicketContext';
import MyTickets from '../tickets/MyTickets'; // путь укажи правильный
import MyBookings from '../tickets/MyBooking';


export default function UserAccount() {

  //   // 🧪 Временная авторизация для разработки
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const userId = localStorage.getItem('userId');

  //   // Если пользователь не вошел, создаем фиктивную авторизацию
  //   if (!token || !userId) {
  //     localStorage.setItem('token', 'mock-token');
  //     localStorage.setItem('userId', 'mock-user-id');
  //     localStorage.setItem('fullName', 'Иванов Иван Иванович');
  //   }
  // }, []);



  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [position, setPosition] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [error, setError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [buttonClicked, setButtonClicked] = useState(false);
  const [photo, setPhoto] = useState<string | null>(null);
  const [showPasswordModal, setShowPasswordModal] = useState(false);



  const isPasswordValid = (password: string) => {
    const pattern = /^(?=.*[A-Za-z])[A-Za-z0-9]{8,}$/;
    return pattern.test(password.trim());
  };

  const validateFullName = (name: string) => {
    const namePattern = /^[А-ЯЁ][а-яё-]+ [А-ЯЁ][а-яё-]+ [А-ЯЁ][а-яё-]+$/i;
    return namePattern.test(name.trim());
  };






//с этого места заменяла сякие функции чтобы к бэкэнду поделючалось

  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const token = localStorage.getItem('token');
    if (!token) {
      setError('Пожалуйста, войдите в аккаунт для загрузки фото');
      return;
    }

    const formData = new FormData();
    formData.append('Name', fullName);
    formData.append('Avatar', file);

    try {
      const userId = localStorage.getItem('userId');
      if (!userId) return;

      await axios.put(`https://localhost:7299/api/User/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });


      // Обновляем фото в интерфейсе можно сказать локально
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setPhoto(result);
      };
      reader.readAsDataURL(file);

      setError('');
    } catch (error) {
      setError('Ошибка при загрузке фото');
    }
  };







  useEffect(() => {
    const getProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const userId = localStorage.getItem('userId');

        if (!token || !userId) return;

        // // ✅ Если временный пользователь — используем заглушку
        // if (userId === 'mock-user-id') {
        //   setFullName(localStorage.getItem('fullName') || 'Иванов Иван Иванович');
        //   setPosition('');
        //   setPhoto(null); // Можно подставить тестовую картинку
        //   setIsSaved(true);
        //   return;
        // }

        // 🛑 Реальный запрос к серверу (если пользователь не мок)
        const response = await axios.get(`https://localhost:7299/api/User/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFullName(response.data.name); // в API поле называется Name
        setPosition(''); // пароль не возвращается с сервера
        if (response.data.avatar) setPhoto(response.data.avatar);
        setIsSaved(true);
      } catch (error) {
        console.error('Ошибка загрузки профиля', error);
      }
    };

    getProfile();
  }, []);







  // const handleLogin = () => {
  //   if (!validateFullName(fullName) || !isPasswordValid(position)) {
  //     setError('Введите корректные данные');
  //     return;
  //   }
  //   localStorage.setItem("fullName", fullName);
  //   localStorage.setItem("position", position);
  //   setIsSaved(true);
  //   setError('');
  //   setButtonClicked(true);
  // };
  const handleLogin = async () => {
    if (!validateFullName(fullName) || !isPasswordValid(position)) {
      setError('Введите корректные данные');
      console.log('Ошибка валидации:', { fullName, position });
      return;
    }

    try {
      console.log('Отправка запроса на логин с данными:', { fullName, position });

      const response = await axios.post('https://localhost:7299/api/User/login', {
        fullName,
        password: position,
      });

      console.log('Ответ сервера:', response.data);

      const token = response.data.token;
      const userId = response.data.userId;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      setError('');
      setButtonClicked(true);

      // Загружаем профиль сразу после логина
      const profileResponse = await axios.get(`https://localhost:7299/api/User/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      console.log('Данные профиля:', profileResponse.data);

      setFullName(profileResponse.data.name);
      setPosition('');
      if (profileResponse.data.avatar) setPhoto(profileResponse.data.avatar);
      setIsSaved(true);
    } catch (error) {
      console.error('Ошибка логина или запроса профиля:', error);
      setError('Неверные данные или ошибка сервера');
    }
  };


  






  const handleRegister = async () => {
    if (!validateFullName(fullName) || !isPasswordValid(position)) {
      setError('Введите корректные данные');
      console.log('Ошибка валидации регистрации:', { fullName, position });
      return;
    }

    try {
      console.log('Отправка запроса на регистрацию с данными:', { fullName, position });

      const response = await axios.post('https://localhost:7299/api/User', {
        fullName,
        password: position,
      });

      console.log('Ответ сервера при регистрации:', response.data);

      alert('Регистрация успешна');
      setButtonClicked(true);
      setIsSaved(true);
      setError('');
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
      setError('Ошибка при регистрации');
    }
  };







  const handleLogout = () => {
    localStorage.removeItem('token');
    setPhoto(null);
    setFullName('');
    setPosition('');
    setIsSaved(false);
    setButtonClicked(false);
    navigate('/');
  };






//а тут заменять прекратила

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
              className="form-control"
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
              className="form-control"
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





        <MyTickets />
        {/* БИЛЕТЫ
        <h2 className="section-title">Мои билеты</h2>

        {!isSaved ? (
          <div className="more-event">
            <span>Пока пусто!</span>
          </div>
        ) : (
          <>
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
              </div>

              {showTicketCalendar && (
                <div style={{ marginTop: '10px', marginLeft: '150px' }}>
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
                <div className="col-booked centered-texts">16.11.2025; 15:00</div>
              </div>
            </div>
          </>
        )}
        <div className="more-events">
          <span>Посетите больше мероприятий!</span>
          <Link to="/events" className="btn-dark-custom">Мероприятия</Link>
        </div> */}



        <MyBookings />
        {/* БРОНИ

        <h2 className="section-title" style={{ marginTop: '40px' }}>Мои брони</h2>

        {!isSaved ? (
          <div className="more-event">
            <span>Пока пусто!</span>
          </div>
        ) : (
          <>
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
              </div>

              {showBookingCalendar && (
                <div style={{ marginTop: '10px' }}>
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
              </div>
            </div>
          </>
        )}
        <div className="more-events">
          <span>Забронируйте помещение!</span>
          <Link to="/locations" className="btn-dark-custom">Локации</Link>
        </div> */}









        <h2 className="section-title" style={{ marginTop: '40px' }}>История</h2>
        <div className="more-event">
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
