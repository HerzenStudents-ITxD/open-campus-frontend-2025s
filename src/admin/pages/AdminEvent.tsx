import { useEffect, useState } from "react";
import { EventData } from "../../api";
import EventList from "../components/Events/EventList";
import { Container, Row, Col } from "react-bootstrap";
import { fetchEvents, createEvent, updateEvent, deleteEvent } from "../../api";
import EventForm from "../components/Events/EventForm";

function AdminEvent() {
  const [events, setEvents] = useState<EventData[]>([]);

  useEffect(() => {
    fetchEvents().then(setEvents).catch(console.error);
  }, []);

  const handleAdd = async (event: EventData) => {
    try {
      const newEvent = await createEvent(event);
      setEvents((prev) => [...prev, newEvent]);
    } catch (err) {
      console.error("Ошибка создания:", err);
    }
  };

  const handleUpdate = async (updatedEvent: EventData) => {
    try {
      const res = await updateEvent(updatedEvent.id, updatedEvent);
      setEvents((prev) => prev.map((e) => (e.id === res.id ? res : e)));
    } catch (err) {
      console.error("Ошибка обновления:", err);
    }
  };

  const handleDelete = async (id: string, reason: string) => {
    try {
      console.log("Причина удаления:", reason);
      await deleteEvent(id, reason);
      setEvents((prev) => prev.filter((e) => e.id !== id));
    } catch (err) {
      console.error("Ошибка удаления:", err);
    }
  };

  return (
    <div className="admin-wrapper">
      <Container fluid className="p-0">
        <Row className="g-0">
          <Col md={12} className="p-4">
            <h1>Редактирование мероприятий</h1>
            <hr />
            <EventForm onSubmit={handleAdd} />
            <EventList
              events={events}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminEvent;



