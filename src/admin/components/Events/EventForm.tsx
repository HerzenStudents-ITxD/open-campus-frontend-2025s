import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { EventData } from "../../../api";

interface EventFormProps {
  onSubmit: (event: EventData) => void;
}

export default function EventForm({ onSubmit }: EventFormProps) {
  const [event, setEvent] = useState<EventData>({
    id: "",
    title: "",
    description: "",
    date: "",
    location: "",
    organizer: "",
    createdAt: new Date().toISOString(),
    createdBy: "",
    image: null,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setEvent((prev) => ({ ...prev, image: e.target.files![0] }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ ...event, id: Date.now().toString() });
    setEvent({
      id: "",
      title: "",
      description: "",
      date: "",
      location: "",
      organizer: "",
      createdAt: new Date().toISOString(),
      createdBy: "",
      image: null,
    });
  };

  return (
    <div>
      <h3>Добавить новое мероприятие</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Название</Form.Label>
          <Form.Control name="title" value={event.title} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Описание</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            name="description"
            value={event.description}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Дата проведения</Form.Label>
          <Form.Control type="date" name="date" value={event.date} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Место проведения</Form.Label>
          <Form.Control name="location" value={event.location} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Организатор</Form.Label>
          <Form.Control name="organizer" value={event.organizer} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Кем добавлено</Form.Label>
          <Form.Control name="createdBy" value={event.createdBy} onChange={handleChange} required />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Изображение</Form.Label>
          <Form.Control type="file" onChange={handleImageChange} />
        </Form.Group>

        <Button type="submit">Добавить мероприятие</Button>
      </Form>
    </div>
  );
}
