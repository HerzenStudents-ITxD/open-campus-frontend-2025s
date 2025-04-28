// src/admin/pages/AdminEvent.tsx

import { useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

import LocationForm, {
  // Тип без id, который отдаёт форма
  Location as LocationFormData,
} from "../components/Locations/LocationForm";
import LocationList, { Location } from "../components/Locations/LocationList";
import BookingOverview from "../components/Locations/BookingOverview";

export default function AdminLocations() {
  // Храним массив локаций (с id)
  const [locations, setLocations] = useState<Location[]>([]);

  // Вызывается, когда форма сохраняет новую локацию
  const handleSaveLocation = (formData: Omit<Location, "id">) => {
    const newLocation: Location = {
      ...formData,
      id: Date.now(), // временный уникальный id
    };
    setLocations((prev) => [...prev, newLocation]);
  };

  // Удаление по id
  const handleDeleteLocation = (id: number) => {
    setLocations((prev) => prev.filter((loc) => loc.id !== id));
  };

  // Редактирование — получаем уже полный объект Location
  const handleEditLocation = (updated: Location) => {
    setLocations((prev) =>
      prev.map((loc) => (loc.id === updated.id ? updated : loc))
    );
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Управление локациями</h2>

      <Row className="gy-4">
        {/* Форма добавления */}
        <Col md={6}>
          <Card>
            <Card.Body>
              <LocationForm onSave={handleSaveLocation} />
            </Card.Body>
          </Card>
        </Col>

        {/* Список локаций */}
        <Col md={6}>
          <Card>
            <Card.Body>
              <LocationList
                locations={locations}
                onDelete={handleDeleteLocation}
                onEdit={handleEditLocation}
              />
            </Card.Body>
          </Card>
        </Col>

        {/* Обзор бронирований (пример) */}
        <Col md={12}>
          <Card>
            <Card.Body>
              <BookingOverview
                bookings={[
                  {
                    id: 1,
                    eventName: "Концерт",
                    date: "2025-06-01",
                    location: "Большой зал",
                    user: "Анна И.",
                  },
                  {
                    id: 2,
                    eventName: "Лекция",
                    date: "2025-06-03",
                    location: "Малая аудитория",
                    user: "Пётр С.",
                  },
                ]}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
