import { Link } from "react-router-dom";
import LocationList from "../components/Locations/LocationList";
import LocationForm from "../components/Locations/LocationForm";
import BookingOverview from "../components/Locations/BookingOverview";

function AdminLocations() {
  return (
    <div>
      <h1>Редактирование локаций</h1>

      <hr />

      <LocationForm />
      <BookingOverview />
      <LocationList />
    </div>
  );
}

export default AdminLocations;

