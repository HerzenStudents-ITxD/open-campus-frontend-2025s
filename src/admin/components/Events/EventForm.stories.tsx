import type { Meta, StoryObj } from "@storybook/react";
import EventForm from "./EventForm";
import "bootstrap/dist/css/bootstrap.min.css";

const meta: Meta<typeof EventForm> = {
  title: "Event/EventForm",
  component: EventForm,
};

export default meta;
type Story = StoryObj<typeof EventForm>;

export const Default: Story = {
  args: {
    onSubmit: (event) => {
      alert("Событие добавлено:\n" + JSON.stringify(event, null, 2));
    },
  },
};
