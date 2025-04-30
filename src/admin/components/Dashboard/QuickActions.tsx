import { Button } from "react-bootstrap";
import { Calendar, FilePlus } from "react-feather"; // Иконки

function QuickActions() {
  return (
    <div className="mb-4">
      <h3>Быстрые действия</h3>
      <div className="d-flex gap-3">
        <Button variant="primary" as="a" href="/admin/events">
          <Calendar size={16} className="me-2" /> Добавить мероприятие
        </Button>
        <Button variant="secondary" as="a" href="/admin/home">
          <FilePlus size={16} className="me-2" /> Добавить новость
        </Button>
      </div>
    </div>
  );
}

export default QuickActions;

  