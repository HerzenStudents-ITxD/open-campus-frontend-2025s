import { Table, Button } from "react-bootstrap";

export interface Location {
  id: number;
  name: string;
  capacity: number;
  description: string;
  imageUrl?: string;
}

interface LocationListProps {
  locations: Location[];
  onDelete: (id: number) => void;
  onEdit: (location: Location) => void;
}

function LocationList({ locations, onDelete, onEdit }: LocationListProps) {
  if (locations.length === 0) {
    return (
      <div>
          <h3 className="mt-5 mb-3">Список локаций</h3>
          <p>Локации пока не добавлены.</p>
      </div>
            
    )
  }

  return (
    <div>
      <h3 className="mt-5 mb-3">Список локаций</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Название</th>
            <th>Вместительность</th>
            <th>Описание</th>
            <th>Картинка</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location.id}>
              <td>{location.name}</td>
              <td>{location.capacity}</td>
              <td>{location.description}</td>
              <td>
                {location.imageUrl ? (
                  <img
                    src={location.imageUrl}
                    alt={location.name}
                    style={{ width: "80px", height: "auto", objectFit: "cover" }}
                  />
                ) : (
                  "Нет изображения"
                )}
              </td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  className="me-2"
                  onClick={() => onEdit(location)}
                >
                  Редактировать
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => onDelete(location.id)}
                >
                  Удалить
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default LocationList;
