import { Link } from "react-router-dom";
import EditorInfoForm from "../components/EditorAccount/EditorInfoForm";
import PasswordChangeForm from "../components/EditorAccount/PasswordChangeForm";

function AdminEditorAccount() {
  return (
    <div>
      <h1>Личный кабинет редактора</h1>

      <nav>
        <Link to="/admin">← Назад на главную панель</Link>
      </nav>

      <hr />

      <EditorInfoForm />
      <PasswordChangeForm />
    </div>
  );
}

export default AdminEditorAccount;

