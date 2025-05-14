import { useEffect, useState } from "react";
import axios from "axios";
import LocationForm from "../components/Locations/LocationForm";
import LocationList, { Location } from "../components/Locations/LocationList";
import BookingOverview from "../components/Locations/BookingOverview";

function AdminLocations() {
  const [locations, setLocations] = useState<Location[]>([]);
  const apiBase = "http://localhost:5241/api/location";

  useEffect(() => {
    axios.get(apiBase)
      .then((res: { data: Location[] }) => setLocations(res.data))
      .catch((err: any) => console.error("Ошибка при загрузке локаций:", err));
  }, []);

  const handleSaveLocation = async (
    location: Omit<Location, "id" | "imageUrl"> & { imageFile: File }
  ) => {
    const formData = new FormData();
    formData.append("Name", location.name);
    formData.append("Capacity", String(location.capacity));
    formData.append("Description", location.description);
    formData.append("Image", location.imageFile);

    try {
      const res = await axios.post(apiBase, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const newLocation = res.data;

      setLocations(prev => [
        ...prev,
        {
          id: newLocation.id,
          name: newLocation.name,
          capacity: newLocation.capacity,
          description: newLocation.description,
          imageUrl: newLocation.imagePath,
        },
      ]);
    } catch (err: any) {
      console.error("Ошибка при сохранении локации:", err);
    }
  };

  const handleEditLocation = async (
    updated: Omit<Location, "imageUrl"> & { imageFile?: File }
  ) => {
    const formData = new FormData();
    formData.append("Name", updated.name);
    formData.append("Capacity", String(updated.capacity));
    formData.append("Description", updated.description);
    if (updated.imageFile) {
      formData.append("Image", updated.imageFile);
    }

    try {
      const res = await axios.put(`${apiBase}/${updated.id}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      const updatedLocation = res.data;

      setLocations(prev =>
        prev.map(loc =>
          loc.id === updatedLocation.id
            ? {
                id: updatedLocation.id,
                name: updatedLocation.name,
                capacity: updatedLocation.capacity,
                description: updatedLocation.description,
                imageUrl: updatedLocation.imagePath
              }
            : loc
        )
      );

    } catch (err: any) {
      console.error("Ошибка при обновлении локации:", err);
    }
  };


  const handleDeleteLocation = async (id: number) => {
    try {
      await axios.delete(`${apiBase}/${id}`);
      setLocations(prev => prev.filter(loc => loc.id !== id));
    } catch (err: any) {
      console.error("Ошибка при удалении локации:", err);
    }
  };

  return (
    <div className="p-4">
      <h1 className="mb-4">Управление локациями</h1>
      <hr />

      <LocationForm onSave={handleSaveLocation} />

      <LocationList 
        locations={locations} 
        onDelete={handleDeleteLocation}
        onEdit={handleEditLocation}
      />

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


