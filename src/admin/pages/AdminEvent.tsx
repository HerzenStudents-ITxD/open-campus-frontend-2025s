import { Link } from "react-router-dom";
import EventList from "../components/Events/EventList";
import EventForm from "../components/Events/EventForm";
import GalleryEditor from "../components/Events/GalleryEditor";

function AdminEvent() {
  return (
    <div>
      <h1>Редактирование мероприятий</h1>

      <nav>
        <Link to="/admin">← Назад на главную панель</Link>
      </nav>

      <hr />

      <EventForm />
      <GalleryEditor />
      <EventList />
    </div>
  );
}

export default AdminEvent;
