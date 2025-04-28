import React, { useState } from "react";
import { Card, Row, Col, Button } from "react-bootstrap";

interface Review {
  author: string;
  content: string;
  date: string; // строка формата "дд.мм.гггг чч:мм"
}

export default function ReviewsList() {
  const [reviews, setReviews] = useState<Review[]>([
    {
      author: "Мария Иванова",
      content: "Очень уютное место для лекций и встреч!",
      date: "27.04.2025 14:30",
    },
    {
      author: "Александр Петров",
      content: "Посещал мастер-класс — всё прошло на высшем уровне!",
      date: "26.04.2025 18:15",
    },
    {
      author: "Екатерина Смирнова",
      content: "Очень рекомендую, особенно открытые лекции.",
      date: "25.04.2025 12:45",
    },
  ]);

  const handleDelete = (index: number) => {
    setReviews((prevReviews) => prevReviews.filter((_, i) => i !== index));
  };

  return (
    <div className="mb-5">
      <h2 className="mb-4">Отзывы</h2>
      <Row className="g-4">
        {reviews.map((review, index) => (
          <Col md={6} key={index}>
            <Card className="h-100 shadow-sm">
              <Card.Body>
                <Card.Title>{review.author}</Card.Title>
                <Card.Text>{review.content}</Card.Text>
              </Card.Body>
              <Card.Footer className="text-muted" style={{ fontSize: "0.9rem" }}>
                {review.date}
                <Button
                  variant="danger"
                  size="sm"
                  className="float-end ms-2"
                  onClick={() => handleDelete(index)}
                >
                  Удалить
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
