import { useState } from "react";
import "../../styles/Events.css";

export default function EventFilters({ onFilterChange }) {
  const [dateFilter, setDateFilter] = useState("");

  // Обработчики изменений фильтров
  const handleTodayClick = () => {
    const today = new Date().toISOString().split('T')[0];
    setDateFilter(today);
    onFilterChange(today);
  };

  const handleTomorrowClick = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = tomorrow.toISOString().split('T')[0];
    setDateFilter(tomorrowStr);
    onFilterChange(tomorrowStr);
  };

  const handleWeekendClick = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    let daysUntilWeekend;
    
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      // Уже выходные
      daysUntilWeekend = 0;
    } else {
      daysUntilWeekend = 6 - dayOfWeek;
    }
    
    const weekendDate = new Date();
    weekendDate.setDate(today.getDate() + daysUntilWeekend);
    const weekendStr = weekendDate.toISOString().split('T')[0];
    setDateFilter(weekendStr);
    onFilterChange(weekendStr);
  };

  const handleDateChange = (e) => {
    setDateFilter(e.target.value);
    onFilterChange(e.target.value);
  };

  const handleResetClick = () => {
    setDateFilter("");
    onFilterChange("");
  };

  return (
    <div className="event-filters">
      <button 
        className={`filter-btn ${dateFilter === new Date().toISOString().split('T')[0] ? 'active' : ''}`}
        onClick={handleTodayClick}
      >
        Сегодня
      </button>
      
      <button 
        className={`filter-btn ${dateFilter === new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().split('T')[0] ? 'active' : ''}`}
        onClick={handleTomorrowClick}
      >
        Завтра
      </button>
      
      <button 
        className="filter-btn"
        onClick={handleWeekendClick}
      >
        Выходные
      </button>

      {/* Выбор конкретной даты */}
      <label className="date-label">
        <input
          type="date"
          className="filter-btn date-input"
          value={dateFilter}
          onChange={handleDateChange}
        />
      </label>

      {/* Кнопка сброса */}
      <button 
        className="filter-btn"
        onClick={handleResetClick}
      >
        Сбросить
      </button>
    </div>
  );
}


