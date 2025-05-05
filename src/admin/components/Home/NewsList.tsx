import React, { useState } from "react";
import {
  Card,
  Button,
  Modal,
  Form,
  Image,
  Row,
  Col,
} from "react-bootstrap";
import { NewsData } from "./NewsForm";

interface NewsListProps {
  newsItems: NewsData[];
  onUpdate: (item: NewsData) => void;
  onDelete: (id: number, reason: string) => void;
}

export default function NewsList({
  newsItems,
  onUpdate,
  onDelete,
}: NewsListProps) {
  const [editing, setEditing] = useState<NewsData | null>(null);
  const [deleteReason, setDeleteReason] = useState("");
  const [showDelModal, setShowDelModal] = useState(false);
  const [toDeleteId, setToDeleteId] = useState<number | null>(null);

  const startEdit = (item: NewsData) => setEditing(item);
  const saveEdit = () => {
    if (editing) {
      onUpdate(editing);
      setEditing(null);
    }
  };

  const handleField = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setEditing((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    if (target.files && target.files[0] && editing) {
      setEditing({ ...editing, image: target.files![0] });
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
      <h3>Список новостей</h3>
      {newsItems.length === 0 ? (
        <p>Пока нет новостей.</p>
      ) : (
        <Row className="g-4">
          {newsItems.map((item) => (
            <Col md={6} key={item.id}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{item.title}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {item.date} — {item.author}
                  </Card.Subtitle>
                  {item.image && (
                    <div style={{ width: "100%", marginBottom: "1rem" }}>
                      <Image
                        src={URL.createObjectURL(item.image)}
                        thumbnail
                        fluid
                        style={{
                          width: "100%",
                          height: "200px",
                          objectFit: "cover",
                          borderRadius: "0.5rem",
                        }}
                      />
                    </div>
                  )}
                  <Card.Text>{item.content}</Card.Text>
                  <Button
                    size="sm"
                    variant="primary"
                    className="me-2"
                    onClick={() => startEdit(item)}
                  >
                    Редактировать
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => askDelete(item.id!)}
                  >
                    Удалить
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Модалка удаления */}
      <Modal show={showDelModal} onHide={() => setShowDelModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Удалить новость</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Причина удаления</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={deleteReason}
              onChange={(e) => setDeleteReason(e.target.value)}
              placeholder="Напишите причину"
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

      {/* Форма редактирования */}
      {editing && (
        <Card className="mt-5 p-3 shadow-sm">
          <h4 className="mb-3">Редактировать новость</h4>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Заголовок</Form.Label>
              <Form.Control
                name="title"
                value={editing.title}
                onChange={handleField}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Содержание</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="content"
                value={editing.content}
                onChange={handleField}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Дата публикации</Form.Label>
              <Form.Control
                type="date"
                name="date"
                value={editing.date}
                onChange={handleField}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Автор</Form.Label>
              <Form.Control
                name="author"
                value={editing.author}
                onChange={handleField}
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Изображение</Form.Label>
              {editing.image && (
                <div style={{ width: "100%", marginBottom: "1rem" }}>
                  <Image
                    src={URL.createObjectURL(editing.image)}
                    thumbnail
                    fluid
                    style={{
                      width: "100%",
                      height: "200px",
                      objectFit: "cover",
                      borderRadius: "0.5rem",
                    }}
                  />
                </div>
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
