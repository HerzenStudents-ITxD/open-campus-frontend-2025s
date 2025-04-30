import EditorInfoForm from "../components/EditorAccount/EditorInfoForm";
import PasswordChangeForm from "../components/EditorAccount/PasswordChangeForm";
import { Container, Row, Col, Card } from "react-bootstrap";

function AdminEditorAccount() {
  return (
    <div className="admin-wrapper">
      <Container fluid className="p-0">
        <Row className="g-0">
          <Col md={12} className="p-4">
            <h1>Личный кабинет редактора</h1>
            <hr />
            
            <Row className="mb-4">
              {/* Первая колонка с информацией редактора */}
              <Col md={6}>
                <Card className="mb-4">
                  <Card.Body>
                    <h3>Информация о редакторе</h3>
                    <EditorInfoForm />
                  </Card.Body>
                </Card>
              </Col>
              
              {/* Вторая колонка для изменения пароля */}
              <Col md={6}>
                <Card className="mb-4">
                  <Card.Body>
                    <h3>Изменение пароля</h3>
                    <PasswordChangeForm />
                  </Card.Body>
                </Card>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminEditorAccount;


