import { Meta, StoryFn } from "@storybook/react";
import BookingOverview, { Booking } from "./BookingOverview";

const meta: Meta<typeof BookingOverview> = {
  title: "Components/BookingOverview",
  component: BookingOverview,
};

export default meta;

const Template: StoryFn<typeof BookingOverview> = (args) => <BookingOverview {...args} />;

const sampleBookings: Booking[] = [
  { id: "1", location: "Москва", date: "2025-06-01", user: "Иван Иванов" },
  { id: "2", location: "Санкт-Петербург", date: "2025-06-02", user: "Мария Петрова" },
  { id: "3", location: "Казань", date: "2025-06-03", user: "Алексей Смирнов" },
];

export const Default = Template.bind({});
Default.args = {
  bookings: sampleBookings,
};
