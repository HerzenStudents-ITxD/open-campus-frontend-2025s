import EventList from "../components/Events/EventList";
import EventForm from "../components/Events/EventForm";
import GalleryEditor from "../components/Events/GalleryEditor";
import { Container, Row, Col } from "react-bootstrap";

function AdminEvent() {
  return (
    <div className="admin-wrapper">
      <Container fluid className="p-0">
        <Row className="g-0">
          <Col md={12} className="p-4">
            <h1>Редактирование мероприятий</h1>
            <hr />
            <EventForm />
            <GalleryEditor />
            <EventList />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminEvent;

