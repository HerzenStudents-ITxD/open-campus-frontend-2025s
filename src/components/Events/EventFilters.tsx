//import "./EventFilters.css";
import { useState } from "react";
import "D:/open-campus-frontend-2025s/src/styles/Events.css";

const categories = [
  "Лекции",
  "Выставки",
  "Мастер-классы",
  "Круглые столы",
  "Открытые семинары",
];

export default function EventFilters() {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  return (
    <div className="event-filters">
      <button className="filter-btn">Сегодня</button>
      <button className="filter-btn">Завтра</button>
      <button className="filter-btn">Выходные</button>

      {/* Категории как стилизованный select */}
      <select
        className="filter-btn select-btn"
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Категории</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Выбор конкретной даты */}
      <label className="date-label">
        <input
          type="date"
          className="filter-btn date-input"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
      </label>

      {/* Бесплатно */}
      <label style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
        <input type="checkbox" />
        Бесплатно
      </label>
    </div>
  );
}


