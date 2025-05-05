import React, { useState } from "react";
import { Card, Button, Modal, Form, Image } from "react-bootstrap";

export interface Location {
  id: number;
  name: string;
  capacity: number;
  description: string;
  image?: File | null;
}

interface LocationListProps {
  locations: Location[];
  onDelete: (id: number, reason: string) => void;
  onEdit: (location: Location) => void;
}

export default function LocationList({ locations, onDelete, onEdit }: LocationListProps) {
  const [editing, setEditing] = useState<Location | null>(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [showDelModal, setShowDelModal] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<number | null>(null);

  const startEdit = (location: Location) => setEditing(location);
  const saveEdit = () => {
    if (editing) {
      onEdit(editing);
      setEditing(null);
    }
  };

  const handleField = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditing((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && editing) {
      setEditing({ ...editing, image: e.target.files[0] });
    }
  };

  const askDelete = (id: number) => {
    setToDeleteId(id);
    setDeleteReason("");
    setShowDelModal(true);
  };

  const confirmDelete = () => {
    if (toDeleteId !== null) {
      onDelete(toDeleteId, deleteReason);
      setShowDelModal(false);
    }
  };

  return (
    <div className="mt-5">
      <h3>Список локаций</h3>
      {locations.length === 0 ? (
        <p>Локации пока не добавлены.</p>
      ) : (
        locations.map((loc) => (
          <Card className="mb-3" key={loc.id}>
            <Card.Body>
              <Card.Title>{loc.name}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                Вместимость: {loc.capacity}
              </Card.Subtitle>
              {loc.image && (
                <Image
                  src={URL.createObjectURL(loc.image)}
                  alt=""
                  thumbnail
                  className="mb-2"
                  style={{ maxWidth: 200 }}
                />
              )}
              <Card.Text>{loc.description}</Card.Text>
              <Button size="sm" className="me-2" onClick={() => startEdit(loc)}>
                Редактировать
              </Button>
              <Button size="sm" variant="danger" onClick={() => askDelete(loc.id)}>
                Удалить
              </Button>
            </Card.Body>
          </Card>
        ))
      )}

      {/* Удаление */}
      <Modal show={showDelModal} onHide={() => setShowDelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Удалить локацию</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Причина удаления</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
              placeholder="Укажите причину"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDelModal(false)}>
            Отмена
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Удалить
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Редактирование */}
      {editing && (
        <Card className="mt-4 p-3 shadow-sm">
          <h4 className="mb-3">Редактировать локацию</h4>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Название</Form.Label>
              <Form.Control
                name="name"
                value={editing.name}
                onChange={handleField}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Вместительность</Form.Label>
              <Form.Control
                type="number"
                name="capacity"
                value={editing.capacity}
                onChange={handleField}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Описание</Form.Label>
              <Form.Control
                as="textarea"
                name="description"
                value={editing.description}
                onChange={handleField}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Картинка</Form.Label>
              {editing.image && (
                <Image
                  src={URL.createObjectURL(editing.image)}
                  thumbnail
                  className="mb-2"
                  style={{ maxWidth: 200 }}
                />
              )}
              <Form.Control type="file" accept="image/*" onChange={handleImage} />
            </Form.Group>

            <Button variant="success" onClick={saveEdit}>
              Сохранить изменения
            </Button>
          </Form>
        </Card>
      )}
    </div>
  );
}
