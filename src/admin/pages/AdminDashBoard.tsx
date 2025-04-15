import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>
      <h1>Панель администрирования</h1>
      <p>Добро пожаловать в панель управления админом.</p>
      <nav>
        <ul>
          <li><Link to="/admin/events">Редактировать мероприятия</Link></li>
          <li><Link to="/admin/locations">Редактировать локации</Link></li>
          <li><Link to="/admin/about">Редактировать информацию о пространстве</Link></li>
          <li><Link to="/admin/editor-account">Аккаунт редактора</Link></li>
        </ul>
      </nav>
    </div>
  );
};

export default AdminDashboard;
