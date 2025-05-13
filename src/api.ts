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
  
  export interface User {
  id: string;
  name: string;
  email: string;
  bio: string;
  avatarUrl: string | null;
}

export const API_BASE = "http://localhost:5241/api";

// 🔹 Получить редактора
export async function fetchUser(id: string): Promise<User> {
  const res = await fetch(`${API_BASE}/user/${id}`);
  if (!res.ok) throw new Error("Не удалось загрузить данные пользователя");
  return await res.json();
}

// 🔹 Обновить редактора (с аватаром)
export async function updateUser(
  id: string,
  data: { name: string; email: string; bio: string; avatarFile?: File }
): Promise<User> {
  const formData = new FormData();
  formData.append("Name", data.name);
  formData.append("Email", data.email);
  formData.append("Bio", data.bio);
  if (data.avatarFile) formData.append("Avatar", data.avatarFile);

  const res = await fetch(`${API_BASE}/user/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) throw new Error("Ошибка при обновлении пользователя");

  return await res.json();
}

// 🔹 Сменить пароль
export async function changePassword(
  id: string,
  oldPassword: string,
  newPassword: string
): Promise<void> {
  const res = await fetch(`${API_BASE}/user/change-password/${id}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      oldPassword,
      newPassword,
    }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(errorText || "Ошибка при смене пароля");
  }
}

export interface Event {
  id: number;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: string;
  createdAt: string;
  createdBy: string;
  imageUrl?: string;
}

const EVENTS_API_URL = "http://localhost:5241/api/event";

export async function fetchEvents(): Promise<Event[]> {
  const res = await fetch(EVENTS_API_URL);
  if (!res.ok) throw new Error("Ошибка при загрузке мероприятий");
  return await res.json();
}

export async function createEvent(data: Omit<Event, "id" | "imageUrl"> & { image?: File }): Promise<Event> {
  const formData = new FormData();
  formData.append("Title", data.title);
  formData.append("Description", data.description);
  formData.append("Date", data.date);
  formData.append("Location", data.location);
  formData.append("Organizer", data.organizer);
  formData.append("CreatedAt", data.createdAt);
  formData.append("CreatedBy", data.createdBy);
  if (data.image) {
    formData.append("Image", data.image);
  }

  const res = await fetch(EVENTS_API_URL, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Ошибка при создании мероприятия");
  return await res.json();
}

export async function updateEvent(event: Event & { image?: File }): Promise<Event> {
  const formData = new FormData();
  formData.append("Title", event.title);
  formData.append("Description", event.description);
  formData.append("Date", event.date);
  formData.append("Location", event.location);
  formData.append("Organizer", event.organizer);
  formData.append("CreatedAt", event.createdAt);
  formData.append("CreatedBy", event.createdBy);
  if (event.image) {
    formData.append("Image", event.image);
  }

  const res = await fetch(`${EVENTS_API_URL}/${event.id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) throw new Error("Ошибка при обновлении мероприятия");
  return await res.json();
}

export async function deleteEvent(id: number, reason: string): Promise<void> {
  const res = await fetch(`${EVENTS_API_URL}/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ reason }),
  });

  if (!res.ok) throw new Error("Ошибка при удалении мероприятия");
}

