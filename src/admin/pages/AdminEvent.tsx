import { useState } from "react";
import EventForm, { EventData } from "../components/Events/EventForm";
import EventList from "../components/Events/EventList";
import { Container, Row, Col } from "react-bootstrap";

function AdminEvent() {
  const [events, setEvents] = useState<EventData[]>([]);

  const handleAdd = (event: EventData) => {
    setEvents((prev) => [...prev, event]);
  };

  const handleUpdate = (updatedEvent: EventData) => {
    setEvents((prev) => prev.map((event) => (event.id === updatedEvent.id ? updatedEvent : event)));
  };

  const handleDelete = (id: number, reason: string) => {
    console.log("Причина удаления:", reason);
    setEvents((prev) => prev.filter((event) => event.id !== id));
  };

  return (
    <div className="admin-wrapper">
      <Container fluid className="p-0">
        <Row className="g-0">
          <Col md={12} className="p-4">
            <h1>Редактирование мероприятий</h1>
            <hr />
            <EventForm onSubmit={handleAdd} />
            <EventList events={events} onUpdate={handleUpdate} onDelete={handleDelete} />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminEvent;


