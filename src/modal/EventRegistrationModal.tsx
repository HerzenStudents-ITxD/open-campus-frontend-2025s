import React, { useState } from 'react';
import { useTicketContext } from '../context/TicketContext';
import '../styles/EventRegistrationModal.css';

interface EventRegistrationModalProps {
  show: boolean;
  onHide: () => void;
}

const EventRegistrationModal: React.FC<EventRegistrationModalProps> = ({ show, onHide }) => {
  // Состояния формы
  const [fullName, setFullName] = useState<string>('');
  const [selectedEvent, setSelectedEvent] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Получаем метод добавления события из контекста
  const { addEvent } = useTicketContext();

  // Валидация ФИО (3 слова с заглавной буквы на русском)
  const validateFullName = (name: string): boolean => {
    const namePattern = /^[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+\s[А-ЯЁ][а-яё]+$/;
    return namePattern.test(name.trim());
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

    // Проверка выбора мероприятия
    if (!selectedEvent) {
      setError('Пожалуйста, выберите мероприятие.');
      return;
    }

    // Добавляем мероприятие через контекст
    addEvent({
      title: 'Лекция "Искусство XX века"', // Можно динамизировать на основе selectedEvent
      location: 'открытая гостиная',       // Можно брать из данных мероприятия
      date: '16.11.25, 15:00'             // Можно динамизировать
    });

    // Обновляем состояние формы
    setIsSubmitted(true);
    setError('');
    // onHide(); // Можно автоматически закрыть модалку после успешной регистрации
  };

  // Если модальное окно скрыто - не рендерим
  if (!show) return null;

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
        <h2 className="modal-title-center">Регистрация на мероприятие</h2>
        
        {/* Форма регистрации */}
        <form onSubmit={handleSubmit} className="modal-form">
          {/* Блок ошибок */}
          {error && <p className="error-message">{error}</p>}

          {/* Выбор мероприятия */}
          <div className="form-group">
            <select
              value={selectedEvent}
              onChange={(e) => setSelectedEvent(e.target.value)}
              className="form-input"
              required
            >
              <option value="" disabled hidden>Выберите мероприятие</option>
              <option value="lecture">Лекция "Искусство XX века" — 16.11.25, 15:00</option>
              {/* Другие мероприятия можно добавить здесь */}
            </select>
          </div>

          {/* Поле ФИО */}
          <div className="form-group">
            <input
              type="text"
              className="form-input"
              placeholder="Введите ФИО"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          {/* Кнопка отправки */}
          <button
            type="submit"
            className={`submit-button ${isSubmitted ? 'submitted' : ''}`}
            disabled={isSubmitted}
          >
            {isSubmitted ? 'Вы зарегистрировались!' : 'Зарегистрироваться'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EventRegistrationModal;