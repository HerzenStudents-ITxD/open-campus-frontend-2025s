export interface Location {
    id: number;
    name: string;
    capacity: number;
    description: string;
    imageUrl: string;
  }
  
  const API_URL = "http://localhost:5241/locations"; // замените порт и путь, если нужно
  
  export async function fetchLocations(): Promise<Location[]> {
    const res = await fetch(API_URL);
    return await res.json();
  }
  
  export async function createLocation(location: Omit<Location, "id">): Promise<Location> {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(location),
    });
    return await res.json();
  }
  
  export async function deleteLocation(id: number): Promise<void> {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  }
  
  export async function updateLocation(location: Location): Promise<Location> {
    const res = await fetch(`${API_URL}/${location.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(location),
    });
    return await res.json();
  }
  