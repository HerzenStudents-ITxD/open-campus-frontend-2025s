import { Container, Row, Col } from "react-bootstrap";

function AdminHome() {
  return (
    <div className="admin-wrapper">
      <Container fluid className="p-0">
        <Row className="g-0">
          <Col md={12} className="p-4">
            <h2>Редактирование домашней страницы сайта</h2>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminHome;
