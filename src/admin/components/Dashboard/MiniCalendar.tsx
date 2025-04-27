import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import "./MiniCalendar.css"; // подключим свои стили для календаря

function MiniCalendar() {
  const [date, setDate] = useState<Date | null>(new Date());

  return (
    <div className="mini-calendar-wrapper">
      <h2 className="mini-calendar-title">Мини-календарь</h2>
      <Calendar
        onChange={(value) => setDate(value as Date)}
        value={date}
        calendarType="iso8601"
        prevLabel="<"
        nextLabel=">"
        tileClassName={({ date, view }) => {
          if (view === "month") {
            const day = date.getDay();
            if (day === 0 || day === 6) {
              return "weekend";
            }
          }
          return null;
        }}
      />
      <p className="mt-3 selected-date">
        Выбрана дата: {date ? date.toLocaleDateString() : "Не выбрана"}
      </p>
    </div>
  );
}

export default MiniCalendar;


