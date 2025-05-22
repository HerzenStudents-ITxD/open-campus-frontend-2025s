import type { Meta, StoryObj } from "@storybook/react";
import EventList from "./EventList";
import { EventData } from "../../../api";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState } from "react";

const sampleEvents: EventData[] = [
  {
    id: "1",
    title: "Концерт классической музыки",
    description: "Вечерняя программа с симфоническим оркестром.",
    date: "2025-06-01",
    location: "Концертный зал",
    organizer: "Музыкальная школа",
    createdAt: "2025-04-01T12:00:00Z",
    createdBy: "admin",
    image: null,
  },
  {
    id: "2",
    title: "Лекция по истории искусства",
    description: "Обзор эпохи Ренессанса.",
    date: "2025-06-15",
    location: "Аудитория 101",
    organizer: "Исторический факультет",
    createdAt: "2025-04-10T15:30:00Z",
    createdBy: "editor",
    image: null,
  },
];

const meta: Meta<typeof EventList> = {
  title: "Event/EventList",
  component: EventList,
};

export default meta;
type Story = StoryObj<typeof EventList>;

export const Default: Story = {
  render: () => {
    const Wrapper = () => {
      const [events, setEvents] = useState<EventData[]>(sampleEvents);

      const handleDelete = (id: string, reason: string) => {
        alert(`Удалено событие ${id} по причине: ${reason}`);
        setEvents((ev) => ev.filter((e) => e.id !== id));
      };

      const handleUpdate = (updatedEvent: EventData) => {
        alert(`Событие обновлено:\n${JSON.stringify(updatedEvent, null, 2)}`);
        setEvents((ev) =>
          ev.map((e) => (e.id === updatedEvent.id ? updatedEvent : e))
        );
      };

      return (
        <EventList events={events} onDelete={handleDelete} onUpdate={handleUpdate} />
      );
    };

    return <Wrapper />;
  },
};
