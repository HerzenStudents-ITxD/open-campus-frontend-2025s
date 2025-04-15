import { Link } from 'react-router-dom';

const AdminEditorAccount = () => {
  return (
    <div>
      <h1>Личный кабинет редактора</h1>
      <p>Здесь редактор может управлять своим аккаунтом.</p>
      <nav>
        <Link to="/admin">Назад в панель администрирования</Link>
      </nav>
    </div>
  );
};

export default AdminEditorAccount;
