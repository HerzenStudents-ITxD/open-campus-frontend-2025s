import React, { useState } from "react";
import { Card, Button, Modal, Form, Image } from "react-bootstrap";
import { Event } from "../../../api";
import { deleteEvent, updateEvent } from "../../../api";

interface EventListProps {
  events: Event[];
  onEventUpdated: (updated: Event) => void;
  onEventDeleted: (id: number) => void;
}

export default function EventList({ events, onEventUpdated, onEventDeleted }: EventListProps) {
  const [editingEvent, setEditingEvent] = useState<(Event & { image?: File }) | null>(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<number | null>(null);

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
  };

  const handleSave = async () => {
    if (editingEvent) {
      try {
        const updated = await updateEvent(editingEvent);
        onEventUpdated(updated);
        setEditingEvent(null);
      } catch (err: any) {
        alert(err.message || "Ошибка при обновлении");
      }
    }
  };

  const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditingEvent((prev) => prev ? { ...prev, [name]: value } : null);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && editingEvent) {
      setEditingEvent({ ...editingEvent, image: file });
    }
  };

  const handleDelete = (id: number) => {
    setEventToDelete(id);
    setDeleteReason("");
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (eventToDelete !== null) {
      try {
        await deleteEvent(eventToDelete, deleteReason);
        onEventDeleted(eventToDelete);
        setShowDeleteModal(false);
      } catch (err: any) {
        alert(err.message || "Ошибка при удалении");
      }
    }
  };

  return (
    <div className="mt-5">
      <h3>Список мероприятий</h3>

      {events.length === 0 ? (
        <p>Пока нет мероприятий.</p>
      ) : (
        events.map((event) => (
          <Card className="mb-3" key={event.id}>
            <Card.Body>
              <Card.Title>{event.title}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {event.date} — {event.location}
              </Card.Subtitle>
              {event.imageUrl && (
                <Image
                  src={event.imageUrl}
                  alt=""
                  thumbnail
                  className="mb-2"
                  style={{ maxWidth: 200 }}
                />
              )}
              <Card.Text>{event.description}</Card.Text>
              <div className="small text-muted">
                Организатор: {event.organizer} <br />
                Добавлено: {event.createdAt} ({event.createdBy})
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
        ))
      )}

      {/* Удаление */}
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
              onChange={(e) => setDeleteReason(e.target.value)}
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

      {/* Редактирование */}
      {editingEvent && (
        <Card className="mt-4 p-3 shadow-sm">
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
              {editingEvent.imageUrl && (
                <Image
                  src={editingEvent.imageUrl}
                  thumbnail
                  className="mb-2"
                  style={{ maxWidth: 200 }}
                />
              )}
              <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
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

