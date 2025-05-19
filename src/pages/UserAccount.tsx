import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/UserAccount.css';
import logoImage from '../assets/logo.png';
import '../styles/Calendar.css';
import ChangePasswordModal from '../modal/ChangePasswordModal';
import axios from 'axios';
import MyTickets from '../tickets/MyTickets';
import MyBookings from '../tickets/MyBooking';

export default function UserAccount() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
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

      await axios.put(`http://localhost:5241/api/User/${userId}`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

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

        const response = await axios.get(`http://localhost:5241/api/User/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setFullName(response.data.name);
        setPassword('');
        if (response.data.avatar) setPhoto(response.data.avatar);
        // setIsSaved(true); // ❌ больше не блокируем тут
      } catch (error) {
        console.error('Ошибка загрузки профиля', error);
      }
    };

    getProfile();
  }, []);

  const handleLogin = async () => {
    if (!validateFullName(fullName) || !isPasswordValid(password)) {
      setError('Введите корректные данные');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5241/api/User/login', {
        fullName,
        password,
      });

      const token = response.data.token;
      const userId = response.data.userId;

      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      setError('');
      setButtonClicked(true);

      const profileResponse = await axios.get(`http://localhost:5241/api/User/${userId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setFullName(profileResponse.data.name);
      setPassword('');
      if (profileResponse.data.avatar) setPhoto(profileResponse.data.avatar);
      setIsSaved(true); // ✅ блокируем только после логина
    } catch (error) {
      console.error('Ошибка логина или запроса профиля:', error);
      setError('Неверные данные или ошибка сервера');
    }
  };

  const handleRegister = async () => {
    if (!validateFullName(fullName) || !isPasswordValid(password)) {
      setError('Введите корректные данные');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5241/api/User', {
        fullName,
        password,
      });

      alert('Регистрация успешна');
      setButtonClicked(true);
      setIsSaved(true); // ✅ блокируем только после регистрации
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
    setPassword('');
    setIsSaved(false);
    setButtonClicked(false);
    navigate('/');
  };

  const isFormComplete = fullName.trim() !== '' && isPasswordValid(password);

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
              value={password}
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);

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
        <MyBookings />

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
