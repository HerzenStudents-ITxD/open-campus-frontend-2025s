import { useState } from "react";
import { Card, Button, Modal } from "react-bootstrap";
import "../../styles/Events.css";

export default function EventCard({ event }) {
  const [showModal, setShowModal] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate();
    const month = date.toLocaleString('ru-RU', { month: 'long' });
    const year = date.getFullYear();
    return `${day} ${month} ${year}`;
  };

  const imageUrl = event.image 
    ? `http://localhost:5241${event.image}`
    : '/images/default-event.jpg';

  const handleRegister = () => {
    setRegistrationSuccess(true);
    setTimeout(() => {
      setRegistrationSuccess(false);
      setShowModal(false);
    }, 2000);
  };

  return (
    <>
      <Card className="event-card">
        <Card.Img variant="top" src={imageUrl} className="event-image" />
        <Card.Body>
          <Card.Title>{event.title}</Card.Title>
          <Card.Text className="text-muted event-date">
            {formatDate(event.date)}
          </Card.Text>
          <Card.Text className="event-location">
            📍 {event.location}
          </Card.Text>
          <Button 
            variant="primary" 
            className="filter-btn"
            onClick={() => setShowModal(true)}
          >
            Подробнее
          </Button>
        </Card.Body>
      </Card>

      {/* Широкая модалка с изображением вверху */}
      <Modal 
        show={showModal} 
        onHide={() => setShowModal(false)} 
        dialogClassName="custom-modal-width"
        centered
      >
        <Modal.Header closeButton className="border-0 pb-0">
          <Modal.Title className="w-100 text-center h3 mb-3">{event.title}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="pt-0">
          {/* Большое изображение вверху модалки */}
          <div className="mb-4">
            <img 
              src={imageUrl} 
              alt={event.title} 
              className="img-fluid rounded-3 w-100"
              style={{ maxHeight: "400px", objectFit: "cover" }}
            />
          </div>
          
          {/* Блок с информацией */}
          <div className="row">
            <div className="col-md-6">
              <div className="event-details-card p-3 rounded-3">
                <p className="mb-3"><strong>Дата:</strong> {formatDate(event.date)}</p>
                <p className="mb-3"><strong>Место:</strong> {event.location}</p>
                <p className="mb-3"><strong>Организатор:</strong> {event.organizer}</p>
              </div>
            </div>
            <div className="col-md-6">
              <div className="event-description-card p-3 rounded-3 h-100">
                <h5 className="fw-bold mb-3">Описание</h5>
                <p className="text-muted">{event.description}</p>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer className="border-0 pt-0">
          {registrationSuccess ? (
            <div className="alert alert-success w-100 text-center mb-0 py-2">
              Вы успешно зарегистрировались!
            </div>
          ) : (
            <>
              <Button 
                variant="outline-secondary" 
                onClick={() => setShowModal(false)}
                className="px-4"
              >
                Закрыть
              </Button>
              <Button 
                variant="primary" 
                onClick={handleRegister}
                className="px-4"
              >
                Зарегистрироваться
              </Button>
            </>
          )}
        </Modal.Footer>
      </Modal>
    </>
  );
}
