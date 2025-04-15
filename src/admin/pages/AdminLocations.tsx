import { Link } from 'react-router-dom';

const AdminLocations = () => {
  return (
    <div>
      <h1>Редактирование локаций</h1>
      <p>Здесь вы можете редактировать локации.</p>
      <nav>
        <Link to="/admin">Назад в панель администрирования</Link>
      </nav>
    </div>
  );
};

export default AdminLocations;
