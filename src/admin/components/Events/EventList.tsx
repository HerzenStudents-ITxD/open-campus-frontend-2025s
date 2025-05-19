import React, { useState } from "react";
import { Card, Button, Modal, Form, Image } from "react-bootstrap";
import { EventData } from "../../../api";

interface EventListProps {
  events: EventData[];
  onDelete: (id: string, reason: string) => void;
  onUpdate: (event: EventData) => void;
}

export default function EventList({ events, onDelete, onUpdate }: EventListProps) {
  const [editingEvent, setEditingEvent] = useState<EventData | null>(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<string | null>(null);

  const handleEdit = (event: EventData) => {
    setEditingEvent(event);
  };

  const handleSave = () => {
    if (editingEvent) {
      onUpdate(editingEvent);
      setEditingEvent(null);
    }
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditingEvent(prev => prev ? { ...prev, [name]: value } : null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0] && editingEvent) {
      const file = target.files[0];
      setEditingEvent({ ...editingEvent, image: file });
    }
  };

  const handleDelete = (id: string) => {
    setEventToDelete(id);
    setDeleteReason("");
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    if (eventToDelete !== null && deleteReason.trim()) {
      onDelete(eventToDelete, deleteReason.trim());
      setShowDeleteModal(false);
    }
  };

  return (
    <div className="mt-5">
      <h3>Список мероприятий</h3>

      {events.length === 0 ? (
        <p>Пока нет мероприятий.</p>
      ) : (
        <div style={{ maxWidth: 600, marginLeft: 0 }}>
          {events.map(event => (
            <Card className="mb-3" key={event.id} style={{ maxWidth: "100%", marginLeft: 0 }}>
              <Card.Body>
                <Card.Title>{event.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {new Date(event.date).toLocaleDateString("ru-RU")} — {event.location}
                </Card.Subtitle>
                {event.image && (
                  <Image
                    src={`http://localhost:5241${event.image}`}
                    alt=""
                    thumbnail
                    className="mb-2"
                    style={{ maxWidth: 200 }}
                  />
                )}
                <Card.Text>{event.description}</Card.Text>
                <div className="small text-muted">
                  Организатор: {event.organizer} <br />
                  {event.createdAt && (
                    <>
                      Добавлено: {new Date(event.createdAt).toLocaleString("ru-RU")} ({event.createdBy})
                    </>
                  )}
                </div>
                <div className="mt-2">
                  <Button variant="primary" size="sm" className="me-2" onClick={() => handleEdit(event)}>
                    Редактировать
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(event.id)}>
                    Удалить
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}

      {/* Модалка удаления */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Удалить мероприятие</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Причина удаления:</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={deleteReason}
              onChange={e => setDeleteReason(e.target.value)}
              required
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Отмена
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Форма редактирования */}
      {editingEvent && (
        <Card className="mt-4 p-3 shadow-sm" style={{ maxWidth: 600, marginLeft: 0 }}>
          <h4 className="mb-3">Редактировать мероприятие</h4>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Название</Form.Label>
              <Form.Control
                name="title"
                value={editingEvent.title}
                onChange={handleFieldChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={editingEvent.description}
                onChange={handleFieldChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Дата</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={editingEvent.date}
                onChange={handleFieldChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Место</Form.Label>
              <Form.Control
                name="location"
                value={editingEvent.location}
                onChange={handleFieldChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Организатор</Form.Label>
              <Form.Control
                name="organizer"
                value={editingEvent.organizer}
                onChange={handleFieldChange}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              {editingEvent.image && typeof editingEvent.image !== "string" && (
                <Image
                  src={URL.createObjectURL(editingEvent.image)}
                  thumbnail
                  className="mb-2"
                  style={{ maxWidth: 200 }}
                />
              )}
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>

            <Button variant="success" onClick={handleSave}>
              Сохранить изменения
            </Button>
          </Form>
        </Card>
      )}
    </div>
  );
}
