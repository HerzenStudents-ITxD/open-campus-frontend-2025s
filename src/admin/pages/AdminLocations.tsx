import { useState } from "react";
import LocationForm from "../components/Locations/LocationForm";
import LocationList, { Location } from "../components/Locations/LocationList";
import BookingOverview from "../components/Locations/BookingOverview";

function AdminLocations() {
  const [locations, setLocations] = useState<Location[]>([]);

  const handleSaveLocation = (location: Omit<Location, "id">) => {
    setLocations((prev) => [
      ...prev,
      { ...location, id: Date.now() }, // Ставим уникальный id через Date.now()
    ]);
  };

  const handleDeleteLocation = (id: number) => {
    setLocations((prev) => prev.filter((loc) => loc.id !== id));
  };

  const handleEditLocation = (updatedLocation: Location) => {
    setLocations((prev) =>
      prev.map((loc) => (loc.id === updatedLocation.id ? updatedLocation : loc))
    );
  };

  return (
    <div className="p-4">
      <h1 className="mb-4">Управление мероприятиями</h1>
      <hr />

      {/* Форма добавления локации */}
      <LocationForm onSave={handleSaveLocation} />

      {/* Список локаций */}
      <LocationList 
        locations={locations} 
        onDelete={handleDeleteLocation}
        onEdit={handleEditLocation}
      />

      {/* Обзор бронирований */}
      <BookingOverview 
        bookings={[
          { id: 1, eventName: "Концерт", date: "2025-06-01", location: "Большой зал", user: "Такой То" },
          { id: 2, eventName: "Лекция", date: "2025-06-03", location: "Малая аудитория", user: "Сякой То" }
        ]}
      />
    </div>
  );
}

export default AdminLocations;
