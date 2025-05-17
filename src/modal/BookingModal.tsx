import React, { useState } from 'react';
import { useTicketContext } from '../context/TicketContext';
import '../styles/BookingModal.css';

interface BookingModalProps {
  show: boolean;
  onHide: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ show, onHide }) => {
  // Состояния формы
  const [fullName, setFullName] = useState<string>('');
  const [selectedRoom, setSelectedRoom] = useState<string>('');
  const [visitDate, setVisitDate] = useState<string>('');
  const [startTime, setStartTime] = useState<string>('');
  const [duration, setDuration] = useState<string>('');
  const [purpose, setPurpose] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Получаем функцию добавления брони из контекста
  const { addBooking } = useTicketContext();

  // Валидация ФИО (3 слова с заглавной буквы на русском)
  const validateFullName = (name: string): boolean => {
    const namePattern = /^[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+$/;
    return namePattern.test(name.trim());
  };

  // Преобразование значения в читаемое название помещения
  const getRoomName = (value: string): string => {
    switch(value) {
      case 'coworking': 
        return 'Большой коворкинг';
      case 'meeting-room': 
        return 'Малый коворкинг';
      case 'open-room': 
        return 'Открытая гостиная';
      case 'hall': 
        return 'Холл';
      default: 
        return '';
    }
  };

  // Обработчик отправки формы
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Проверка авторизации
    const token = localStorage.getItem('token');
    if (!token) {
      setError('Вы должны войти в аккаунт или зарегистрироваться.');
      return;
    }

    // Валидация ФИО
    if (!validateFullName(fullName)) {
      setError('Введите корректное ФИО (три слова с заглавной буквы на русском).');
      return;
    }

    // Проверка заполнения всех полей
    if (!selectedRoom || !visitDate || !startTime || !duration || !purpose) {
      setError('Пожалуйста, заполните все поля.');
      return;
    }

    // Добавление бронирования
    addBooking({
      location: selectedRoom,
      date: `${visitDate}, ${startTime}`,
      duration: duration
    });

    // Установка состояния после успешной отправки
    setIsSubmitted(true);
    setError('');
  };

  // Если модальное окно скрыто - не рендерим
  if (!show) {
    return null;
  }

  return (
    <div className="custom-modal-backdrop">
      <div className="custom-modal">
        {/* Кнопка закрытия */}
        <button 
          className="close-button" 
          onClick={onHide}
          aria-label="Закрыть модальное окно"
        >
          ×
        </button>

        {/* Заголовок */}
        <h2 className="modal-title-center">Заявка на бронь</h2>
        
        {/* Форма бронирования */}
        <form onSubmit={handleSubmit} className="modal-form">
          {/* Блок ошибок */}
          {error && (
            <p className="error-message">
              {error}
            </p>
          )}

          {/* Выбор помещения */}
          <div className="form-group">
            <label className="form-label">Выберите помещение</label>
            <select
              value={selectedRoom}
              onChange={(e) => setSelectedRoom(e.target.value)}
              className="form-input"
              required
            >
              <option value="" disabled hidden>Выберите помещение</option>
              <option value="большой коворкинг">Большой коворкинг</option>
              <option value="малый коворкинг">Малый коворкинг</option>
              <option value="открытая гостиная">Открытая гостиная</option>
              <option value="холл">Холл</option>
            </select>
            <div style={{ marginTop: '-8px', marginBottom: '8px' }}>
              <a 
                href="/open-campus/locations" 
                className="room-details-link"
              >
                Подробнее о помещениях
              </a>
            </div>
          </div>

          {/* Дата и время */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Дата визита</label>
              <input
                type="date"
                value={visitDate}
                onChange={(e) => setVisitDate(e.target.value)}
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label className="form-label">Начало аренды</label>
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="form-input"
                required
              />
            </div>
          </div>

          {/* Длительность */}
          <div className="form-group">
            <label className="form-label">Длительность</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              className="form-input"
              required
            >
              <option value="" disabled hidden>Выберите длительность</option>
              <option value="1 час">1 час</option>
              <option value="1,5 часа">1,5 часа</option>
              <option value="2 часа">2 часа</option>
              <option value="3 часа">3 часа</option>
            </select>
          </div>

          {/* ФИО */}
          <div className="form-group">
            <label className="form-label">ФИО</label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="form-input"
              placeholder="Иванов Иван Иванович"
              required
            />
          </div>

          {/* Цель брони */}
          <div className="form-group">
            <label className="form-label">Цель брони</label>
            <textarea
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="form-input"
              rows={3}
              required
            />
          </div>

          {/* Кнопка отправки */}
          <button
            type="submit"
            className={`submit-button ${isSubmitted ? 'submitted' : ''}`}
            disabled={isSubmitted}
          >
            {isSubmitted ? 'Бронь успешна!' : 'Забронировать'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default BookingModal;