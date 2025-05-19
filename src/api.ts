import axios from "axios";

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

// export interface Event {
//   id: number;
//   title: string;
//   description: string;
//   date: string;
//   location: string;
//   organizer: string;
//   createdAt: string;
//   createdBy: string;
//   imageUrl?: string;
// }

// const EVENTS_API_URL = "http://localhost:5241/api/event";

// export async function fetchEvents(): Promise<Event[]> {
//   const res = await fetch(EVENTS_API_URL);
//   if (!res.ok) throw new Error("Ошибка при загрузке мероприятий");
//   return await res.json();
// }

// export async function createEvent(data: Omit<Event, "id" | "imageUrl"> & { image?: File }): Promise<Event> {
//   const formData = new FormData();
//   formData.append("Title", data.title);
//   formData.append("Description", data.description);
//   formData.append("Date", data.date);
//   formData.append("Location", data.location);
//   formData.append("Organizer", data.organizer);
//   formData.append("CreatedAt", data.createdAt);
//   formData.append("CreatedBy", data.createdBy);
//   if (data.image) {
//     formData.append("Image", data.image);
//   }

//   const res = await fetch(EVENTS_API_URL, {
//     method: "POST",
//     body: formData,
//   });

//   if (!res.ok) throw new Error("Ошибка при создании мероприятия");
//   return await res.json();
// }

// export async function updateEvent(event: Event & { image?: File }): Promise<Event> {
//   const formData = new FormData();
//   formData.append("Title", event.title);
//   formData.append("Description", event.description);
//   formData.append("Date", event.date);
//   formData.append("Location", event.location);
//   formData.append("Organizer", event.organizer);
//   formData.append("CreatedAt", event.createdAt);
//   formData.append("CreatedBy", event.createdBy);
//   if (event.image) {
//     formData.append("Image", event.image);
//   }

//   const res = await fetch(`${EVENTS_API_URL}/${event.id}`, {
//     method: "PUT",
//     body: formData,
//   });

//   if (!res.ok) throw new Error("Ошибка при обновлении мероприятия");
//   return await res.json();
// }

// export async function deleteEvent(id: number, reason: string): Promise<void> {
//   const res = await fetch(`${EVENTS_API_URL}/${id}`, {
//     method: "DELETE",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ reason }),
//   });

//   if (!res.ok) throw new Error("Ошибка при удалении мероприятия");
// }

export interface Booking {
  userId: string;
  locationId: number;
  dateStart: string; // ISO строка, например "2025-05-19T14:00"
  dateEnd: string;
  purpose: string;
  status?: string; // опционально, сервер может сам установить
}

export async function createBooking(data: Booking): Promise<void> {
  const res = await fetch(`${API_BASE}/booking`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(errText || "Ошибка при создании бронирования");
  }
}

export interface NewsData {
  id?: string;
  title: string;
  content: string;
  author: string;
  publishedAt: string;
  isPublished: boolean;
  imageFile?: File;
  imagePath?: string;
}

const NEWS_API = "http://localhost:5241/api/news";

// 🔹 Получить все новости
export async function fetchNews(): Promise<NewsData[]> {
  const res = await fetch(NEWS_API);
  if (!res.ok) throw new Error("Ошибка при загрузке новостей");
  return await res.json();
}

// 🔹 Создать новость
export async function createNews(data: NewsData): Promise<NewsData> {
  const formData = new FormData();
  formData.append("Title", data.title);
  formData.append("Content", data.content);
  formData.append("Author", data.author);
  formData.append("PublishedAt", data.publishedAt);
  formData.append("IsPublished", String(data.isPublished));
  if (data.imageFile) formData.append("Image", data.imageFile);

  const res = await fetch(NEWS_API, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) throw new Error("Ошибка при создании новости");
  return await res.json();
}

// 🔹 Обновить новость
export async function updateNews(id: string, data: NewsData): Promise<NewsData> {
  const formData = new FormData();
  formData.append("Title", data.title);
  formData.append("Content", data.content);
  formData.append("Author", data.author);
  formData.append("PublishedAt", data.publishedAt);
  formData.append("IsPublished", String(data.isPublished));
  if (data.imageFile) formData.append("Image", data.imageFile);

  const res = await fetch(`${NEWS_API}/${id}`, {
    method: "PUT",
    body: formData,
  });

  if (!res.ok) throw new Error("Ошибка при обновлении новости");
  return await res.json();
}

// 🔹 Удалить новость
export async function deleteNews(id: string, reason: string): Promise<void> {
  const res = await fetch(`${NEWS_API}/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ reason }),
  });

  if (!res.ok) throw new Error("Ошибка при удалении новости");
}

// Тип мероприятия
export interface EventData {
  id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  organizer: string;
  createdAt?: string;
  createdBy: string;
  image: File | string | null; // файл для нового или строка (url) для существующего
}


const EVENTS_API_URL = "http://localhost:5241/api/event";

// Получение всех мероприятий
// export const fetchEvents = async (): Promise<EventData[]> => {
//   const res = await axios.get(EVENTS_API_URL);
//   return res.data.map((event: any) => ({
//     ...event,
//     image: event.imagePath || event.imageUrl || null
//   }));
// };

export async function fetchEvents(): Promise<EventData[]> {
  const res = await fetch(EVENTS_API_URL);
  if (!res.ok) throw new Error("Ошибка при загрузке мероприятий");
  return await res.json();
}


// Создание мероприятия
export const createEvent = async (data: EventData): Promise<EventData> => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("date", data.date);
  formData.append("location", data.location);
  formData.append("organizer", data.organizer);
  formData.append("createdBy", data.createdBy);
  if (data.image) formData.append("image", data.image);

  const res = await axios.post(EVENTS_API_URL, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

// Обновление мероприятия
export const updateEvent = async (id: string, data: EventData): Promise<EventData> => {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("date", data.date);
  formData.append("location", data.location);
  formData.append("organizer", data.organizer);
  formData.append("createdBy", data.createdBy);
  if (data.image) formData.append("image", data.image);

  const res = await axios.put(`${EVENTS_API_URL}/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return res.data;
};

// Удаление мероприятия
export const deleteEvent = async (id: string, reason: string): Promise<void> => {
  await axios.delete(`${EVENTS_API_URL}/${id}`, {
    data: { reason },
    headers: { "Content-Type": "application/json" },
  });
};

