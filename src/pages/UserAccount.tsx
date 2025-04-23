// src/pages/UserAccount.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function UserAccount() {
  return (
    <div className="container d-flex flex-column align-items-center mt-4" style={{ maxWidth: '800px' }}>
      <h1 className="mb-4 text-center">Профиль</h1>
      
      <div className="d-flex justify-content-between align-items-center mb-4 w-100">
        <div>
          <p className="mb-1"><strong>ФИО</strong></p>
          <p className="mb-0"><strong>Должность</strong></p>
        </div>
        <button className="btn btn-outline-secondary">Загрузить фото</button>
      </div>

      <hr className="w-100 my-4" />

      <div className="mb-5 w-100">
        <h2 className="mb-3 text-center">Мои брони</h2>
        
        <div className="card">
          <div className="card-body p-0">
            <div className="d-flex justify-content-between p-3 border-bottom">
              <strong>Мероприятие</strong>
              <div className="d-flex gap-5">
                <strong>Забронировано</strong>
                <strong>Статус</strong>
              </div>
            </div>
            
            <div className="d-flex justify-content-between p-3 border-bottom">
              <div style={{ width: '60%' }}>
                Цикл лекций "Искусство XX века". Блок первый. Искусство авангарда. Лекция первая. Ранний европейский авангард
              </div>
              <div className="d-flex gap-5">
                <div>16.11.2025</div>
                <div className="text-success">Подтверждено</div>
              </div>
            </div>
            
            <div className="p-3 text-center">
              <Link to="/events" className="text-decoration-none">
                <strong>Посетите больше мероприятий!</strong> <span className="text-primary">Подробнее</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <button className="btn btn-danger w-100" style={{ maxWidth: '200px' }}>Выйти из аккаунта</button>
    </div>
  );
}