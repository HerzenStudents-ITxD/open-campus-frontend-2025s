import AboutContentEditor from "../components/About/AboutContentEditor";
import ReviewsList from "../components/About/ReviewsList";
import ReviewApproveForm from "../components/About/ReviewApproveForm";
import PhotoGalleryEditor from "../components/About/PhotoGalleryEditor";
import { Container, Row, Col } from "react-bootstrap";

function AdminAbout() {
  return (
    <div className="admin-wrapper">
      <Container fluid className="p-0">
        <Row className="g-0">
          <Col md={12} className="p-4">
            <h1>Редактирование раздела “О пространстве”</h1>
            <hr />
            <AboutContentEditor />
            <PhotoGalleryEditor />
            <ReviewsList />
            <ReviewApproveForm />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AdminAbout;
