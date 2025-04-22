import LocationList from "../components/Locations/LocationList";
import LocationForm from "../components/Locations/LocationForm";
import BookingOverview from "../components/Locations/BookingOverview";
import { Container, Row, Col } from "react-bootstrap";

function AdminLocations() {
  return (
    <div className="admin-wrapper">
      <Container fluid className="p-0">
        <Row className="g-0">
          <Col md={12} className="p-4">
            <h1>Редактирование локаций</h1>
            <hr />
            <LocationForm />
            <BookingOverview />
            <LocationList />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminLocations;

