import QuickActions from "../components/Dashboard/QuickActions";
import UpcomingEvents from "../components/Dashboard/UpcomingEvents";
import MiniCalendar from "../components/Dashboard/MiniCalendar";
import { Container, Row, Col } from "react-bootstrap";

function AdminDashboard() {
  return (
    <div className="admin-wrapper">
      <Container fluid className="p-0">
        <Row className="g-0">
          {/* Main Content */}
          <Col md={12} className="p-4">
            <h2 className="mb-4">Главная панель</h2>

            {/* Quick Actions + Upcoming Events */}
            <Row className="mb-4">
              <Col md={6}><QuickActions /></Col>
              <Col md={6}><UpcomingEvents /></Col>
            </Row>

            {/* Mini Calendar - отдельная строка */}
            <Row>
              <Col md={12}><MiniCalendar /></Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboard;
