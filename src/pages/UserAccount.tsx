// src/pages/UserAccount.tsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/UserAccount.css';
import logoImage from '../assets/logo.png';

export default function UserAccount() {
  const [fullName, setFullName] = useState(localStorage.getItem("fullName") || "");
  const [position, setPosition] = useState(localStorage.getItem("position") || "");
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("fullName", fullName);
  }, [fullName]);

  useEffect(() => {
    localStorage.setItem("position", position);
  }, [position]);

  const handleLogout = () => {
    localStorage.removeItem("fullName");
    localStorage.removeItem("position");
    navigate("/"); // или /login, если есть авторизация
  };

  return (
    <div className="user-account-container">
      <div className="sidebar">
        <div className="logo">
          <img src={logoImage} alt="Логотип" className="logo-img" />
        </div>
        <Link to="/" className="btn btn-orange">← На главную</Link>
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
            />

            <label>Должность</label>
            <select
              className="form-control custom-select"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
            >
              <option value="">Выберите...</option>
              <option value="student">Студент</option>
              <option value="teacher">Преподаватель</option>
              <option value="administrator">Администратор</option>
            </select>
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
