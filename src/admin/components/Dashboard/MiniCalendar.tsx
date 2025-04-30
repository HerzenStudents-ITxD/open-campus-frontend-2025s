import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState } from "react";
import "./MiniCalendar.css";

interface MiniCalendarProps {
  events: { id: number; title: string; date: string }[];
}

function MiniCalendar({ events }: MiniCalendarProps) {
  const [date, setDate] = useState<Date | null>(new Date());

  // Преобразуем события для быстрого поиска по дате
  const eventsByDate = events.reduce<Record<string, { id: number; title: string }[]>>((acc, event) => {
    const dateStr = event.date; // формат "yyyy-mm-dd"
    if (!acc[dateStr]) acc[dateStr] = [];
    acc[dateStr].push({ id: event.id, title: event.title });
    return acc;
  }, {});

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
        tileContent={({ date, view }) => {
          if (view === "month") {
            const dateStr = date.toISOString().split("T")[0];
            const todaysEvents = eventsByDate[dateStr];
            if (todaysEvents) {
              return (
                <div title={todaysEvents.map(e => e.title).join(", ")}>
                  <div className="event-dot" />
                </div>
              );
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
