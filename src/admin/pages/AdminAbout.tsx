import { Link } from "react-router-dom";
import AboutContentEditor from "../components/About/AboutContentEditor";
import ReviewsList from "../components/About/ReviewsList";
import ReviewApproveForm from "../components/About/ReviewApproveForm";
import PhotoGalleryEditor from "../components/About/PhotoGalleryEditor";

function AdminAbout() {
  return (
    <div>
      <h1>Редактирование раздела “О пространстве”</h1>

      <nav>
        <Link to="/admin">← Назад на главную панель</Link>
      </nav>

      <hr />

      <AboutContentEditor />
      <PhotoGalleryEditor />
      <ReviewsList />
      <ReviewApproveForm />
    </div>
  );
}

export default AdminAbout;
