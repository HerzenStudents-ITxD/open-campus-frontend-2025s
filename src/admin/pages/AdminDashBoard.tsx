import QuickActions from "../components/Dashboard/QuickActions";
import RecentChanges from "../components/Dashboard/RecentChanges";
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
            <hr />

            {/* Quick Actions + Recent Changes */}
            <Row className="gx-5 mb-4">
              <Col md={6}><QuickActions /></Col>
              <Col md={6}><RecentChanges /></Col>
            </Row>

            {/* Mini Calendar - отдельная строка */}
            <Row>
              <Col md={12}>
                <MiniCalendar events={[ 
                  { id: 1, title: "Конференция", date: "2025-05-03" }, 
                  { id: 2, title: "Воркшоп", date: "2025-05-10" }
                ]} />
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminDashboard;
