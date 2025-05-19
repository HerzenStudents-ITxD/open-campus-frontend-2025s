import { useState } from "react";
import "../../styles/Events.css";

// Вспомогательная функция для сравнения дат
const isSameDate = (date1, date2) => {
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

export default function EventFilters({ onFilterChange }) {
  const [dateFilter, setDateFilter] = useState("");

  // Получение даты в формате YYYY-MM-DD
  const getFormattedDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const handleTodayClick = () => {
    const today = new Date();
    const todayStr = getFormattedDate(today);
    setDateFilter(todayStr);
    onFilterChange(todayStr);
  };

  const handleTomorrowClick = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStr = getFormattedDate(tomorrow);
    setDateFilter(tomorrowStr);
    onFilterChange(tomorrowStr);
  };

  const handleWeekendClick = () => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    let daysUntilWeekend;
    
    if (dayOfWeek === 0 || dayOfWeek === 6) {
      daysUntilWeekend = 0;
    } else {
      daysUntilWeekend = 6 - dayOfWeek;
    }
    
    const weekendDate = new Date();
    weekendDate.setDate(today.getDate() + daysUntilWeekend);
    const weekendStr = getFormattedDate(weekendDate);
    setDateFilter(weekendStr);
    onFilterChange(weekendStr);
  };

  const handleDateChange = (e) => {
    const selectedDate = e.target.value;
    setDateFilter(selectedDate);
    onFilterChange(selectedDate);
  };

  const handleResetClick = () => {
    setDateFilter("");
    onFilterChange(null); // Используем null для сброса
  };

  // Проверка активных кнопок
  const todayStr = getFormattedDate(new Date());
  const tomorrowStr = getFormattedDate(new Date(new Date().setDate(new Date().getDate() + 1)));

  return (
    <div className="event-filters">
      <button 
        className={`filter-btn ${dateFilter === todayStr ? 'active' : ''}`}
        onClick={handleTodayClick}
      >
        Сегодня
      </button>
      
      <button 
        className={`filter-btn ${dateFilter === tomorrowStr ? 'active' : ''}`}
        onClick={handleTomorrowClick}
      >
        Завтра
      </button>
      
      <button 
        className={`filter-btn ${dateFilter === getFormattedDate(getNextWeekendDate()) ? 'active' : ''}`}
        onClick={handleWeekendClick}
      >
        Выходные
      </button>

      <label className="date-label">
        <input
          type="date"
          className="filter-btn date-input"
          value={dateFilter}
          onChange={handleDateChange}
        />
      </label>

      <button 
        className="filter-btn"
        onClick={handleResetClick}
      >
        Сбросить
      </button>
    </div>
  );
}

// Функция для получения даты ближайших выходных
function getNextWeekendDate() {
  const today = new Date();
  const dayOfWeek = today.getDay();
  let daysUntilWeekend;
  
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    daysUntilWeekend = 0;
  } else {
    daysUntilWeekend = 6 - dayOfWeek;
  }
  
  const weekendDate = new Date();
  weekendDate.setDate(today.getDate() + daysUntilWeekend);
  return weekendDate;
}


