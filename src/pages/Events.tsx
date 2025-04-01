import { Link } from "react-router-dom";

export default function Events() {
  return (
    <div>
      <h1>Мероприятия</h1>
      <Link to="/about-event">Подробнее о мероприятии</Link>
    </div>
  );
}