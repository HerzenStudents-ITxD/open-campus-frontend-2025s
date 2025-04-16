import { Link } from "react-router-dom";
import QuickActions from "../components/Dashboard/QuickActions";
import UpcomingEvents from "../components/Dashboard/UpcomingEvents";
import MiniCalendar from "../components/Dashboard/MiniCalendar";

function AdminDashboard() {
  return (
    <div>
      <h1>Панель администратора</h1>

      <nav>
        <ul>
          <li><Link to="/admin/events">Редактировать мероприятия</Link></li>
          <li><Link to="/admin/locations">Редактировать локации</Link></li>
          <li><Link to="/admin/about">Редактировать “О пространстве”</Link></li>
          <li><Link to="/admin/editor-account">Личный кабинет редактора</Link></li>
        </ul>
      </nav>

      <hr />

      <QuickActions />
      <UpcomingEvents />
      <MiniCalendar />
    </div>
  );
}

export default AdminDashboard;
