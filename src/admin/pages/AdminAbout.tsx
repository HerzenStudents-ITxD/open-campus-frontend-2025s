import { Link } from 'react-router-dom';

const AdminAbout = () => {
  return (
    <div>
      <h1>Редактирование информации о проекте</h1>
      <p>Здесь вы можете редактировать информацию о пространстве.</p>
      <nav>
        <Link to="/admin">Назад в панель администрирования</Link>
      </nav>
    </div>
  );
};

export default AdminAbout;
