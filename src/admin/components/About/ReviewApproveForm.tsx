import { useState } from "react";
import { Card, Row, Col, Button, Modal, Form } from "react-bootstrap";

interface PendingReview {
  author: string;
  content: string;
  date: string;
}

export default function ReviewApproveForm() {
  const [pendingReviews, setPendingReviews] = useState<PendingReview[]>([
    {
      author: "Иван Кузнецов",
      content: "Очень понравилась лекция!",
      date: "27.04.2025 11:00",
    },
    {
      author: "Ольга Новикова",
      content: "Хотелось бы больше мероприятий.",
      date: "26.04.2025 15:45",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [deleteComment, setDeleteComment] = useState("");
  const [reviewToDeleteIndex, setReviewToDeleteIndex] = useState<number | null>(null);

  const handleApprove = (index: number) => {
    const approvedReview = pendingReviews[index];
    console.log("Одобрен отзыв:", approvedReview);
    setPendingReviews((prev) => prev.filter((_, i) => i !== index));
  };

  const openDeleteModal = (index: number) => {
    setReviewToDeleteIndex(index);
    setDeleteComment("");
    setShowModal(true);
  };

  const confirmDelete = () => {
    if (reviewToDeleteIndex !== null) {
      console.log("Удалён отзыв:", pendingReviews[reviewToDeleteIndex]);
      console.log("Комментарий к удалению:", deleteComment);
      setPendingReviews((prev) => prev.filter((_, i) => i !== reviewToDeleteIndex));
    }
    setShowModal(false);
  };

  return (
    <div className="mb-5">
      <h2 className="mb-4">Одобрение отзывов</h2>

      {pendingReviews.length === 0 ? (
        <p>Нет отзывов на модерацию.</p>
      ) : (
        <Row className="g-4">
          {pendingReviews.map((review, index) => (
            <Col md={6} key={index}>
              <Card className="h-100 shadow-sm">
                <Card.Body>
                  <Card.Title>{review.author}</Card.Title>
                  <Card.Text>{review.content}</Card.Text>
                </Card.Body>
                <Card.Footer className="d-flex justify-content-between align-items-center text-muted" style={{ fontSize: "0.9rem" }}>
                  {review.date}
                  <div>
                    <Button
                      variant="success"
                      size="sm"
                      className="me-2"
                      onClick={() => handleApprove(index)}
                    >
                      Одобрить
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => openDeleteModal(index)}
                    >
                      Удалить
                    </Button>
                  </div>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}

      {/* Модальное окно подтверждения удаления */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Удаление отзыва</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group>
            <Form.Label>Комментарий к удалению</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={deleteComment}
              onChange={(e) => setDeleteComment(e.target.value)}
              placeholder="Почему вы удаляете этот отзыв?"
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Отмена
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Удалить отзыв
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

  