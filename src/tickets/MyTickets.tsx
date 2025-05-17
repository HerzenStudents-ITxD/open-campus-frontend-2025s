import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTicketContext } from '../context/TicketContext';
import '../styles/MyTickets.css';

// Интерфейс для типизации билетов на мероприятия
interface EventTicket {
  title: string;       // Название мероприятия
  location: string;    // Место проведения
  date: string;        // Дата и время
  type: 'event';       // Тип (только мероприятия)
}

// Основной компонент для отображения билетов
const MyTickets: React.FC = () => {
  // Получаем события из контекста билетов
  const { events } = useTicketContext();
  
  // Локальное состояние для отображаемых билетов
  const [displayedTickets, setDisplayedTickets] = useState<EventTicket[]>([]);

  // Эффект для синхронизации данных из контекста с локальным состоянием
  useEffect(() => {
    // Проверяем, что events существует и является массивом
    if (events && Array.isArray(events)) {
      // Фильтруем только мероприятия (на всякий случай)
      const validEvents = events.filter(
        (event): event is EventTicket => event?.type === 'event'
      );
      setDisplayedTickets(validEvents);
    } else {
      // Если events невалидный - устанавливаем пустой массив
      setDisplayedTickets([]);
    }
  }, [events]); // Зависимость от events

  // Рендер компонента
  return (
    <div className="tickets-container">
      {/* Заголовок раздела */}
      <h1 className="tickets-main-title">Мои билеты</h1>

      {/* Условный рендеринг в зависимости от наличия билетов */}
      {displayedTickets.length === 0 ? (
        // Если билетов нет - показываем сообщение
        <div className="empty-tickets">
          <p>Пока пусто!</p>
        </div>
      ) : (
        // Если билеты есть - показываем их список
        <div className="full-width-ticket">
          {/* Шапка таблицы */}
          <div className="ticket-header">
            <div className="ticket-col-event">
              Мероприятие
            </div>
            <div className="ticket-col-date">
              Забронировано
            </div>
          </div>
          
          {/* Тело таблицы - список билетов */}
          {displayedTickets.map((ticket, index) => (
            <div 
              key={`ticket-${index}`} 
              className={`ticket-content ${index === displayedTickets.length - 1 ? 'last-ticket' : ''}`}
            >
              <div className="ticket-col-event">
                <div className="ticket-title">
                  {ticket.title}
                </div>
                <div className="ticket-location">
                  <span className="location-label">
                    Локация:
                  </span>
                  <span className="location-value">
                    {ticket.location}
                  </span>
                </div>
              </div>
              <div className="ticket-col-date">
                {ticket.date}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Блок с призывом к действию */}
      <div className="more-events-block">
        <span className="more-events-text">
          Посетите больше мероприятий!
        </span>
        <Link 
          to="/events" 
          className="events-button"
          aria-label="Перейти к списку мероприятий"
        >
          Мероприятия
        </Link>
      </div>
    </div>
  );
};

export default MyTickets;