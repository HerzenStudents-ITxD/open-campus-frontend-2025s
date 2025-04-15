import { Link } from 'react-router-dom';

const AdminEvent = () => {
  return (
    <div>
      <h1>Редактирование мероприятий</h1>
      <p>Здесь вы можете редактировать мероприятия.</p>
      <nav>
        <Link to="/admin">Назад в панель администрирования</Link>
      </nav>
    </div>
  );
};

export default AdminEvent;
