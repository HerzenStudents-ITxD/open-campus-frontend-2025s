import EditorInfoForm from "../components/EditorAccount/EditorInfoForm";
import PasswordChangeForm from "../components/EditorAccount/PasswordChangeForm";
import { Container, Row, Col } from "react-bootstrap";

function AdminEditorAccount() {
  return (
    <div className="admin-wrapper">
      <Container fluid className="p-0">
        <Row className="g-0">
          <Col md={12} className="p-4">
            <h1>Личный кабинет редактора</h1>
            <hr />
            <EditorInfoForm />
            <PasswordChangeForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminEditorAccount;

