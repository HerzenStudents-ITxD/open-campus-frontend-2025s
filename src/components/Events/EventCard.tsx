import { Card, Button } from "react-bootstrap";
import "../../styles/Events.css";

export default function EventCard({ event }) {
  return (
    <Card className="event-card">
      <Card.Img variant="top" src={event.image} className="event-image" />
      <Card.Body>
        <Card.Title>{event.title}</Card.Title>
        <Card.Text className="text-muted event-date">
          {new Date(event.date).toLocaleDateString()}
        </Card.Text>
        <Button className="filter-btn">Подробнее</Button>
      </Card.Body>
    </Card>
  );
}

