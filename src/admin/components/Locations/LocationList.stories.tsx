import { Meta, StoryFn } from "@storybook/react";
import LocationList, { Location } from "./LocationList";

const meta: Meta<typeof LocationList> = {
  title: "Components/LocationList",
  component: LocationList,
};

export default meta;

const Template: StoryFn<typeof LocationList> = (args) => <LocationList {...args} />;

const sampleLocations: Location[] = [
  {
    id: 1,
    name: "Зал 1",
    capacity: 50,
    description: "Большой зал для мероприятий",
    imageUrl: "/images/hall1.jpg",
  },
  {
    id: 2,
    name: "Конференц-зал",
    capacity: 30,
    description: "Для встреч и семинаров",
    imageUrl: "/images/conference.jpg",
  },
];

export const Default = Template.bind({});
Default.args = {
  locations: sampleLocations,
  onDelete: (id, reason) => alert(`Удаление локации id=${id} по причине: ${reason}`),
  onEdit: (location) => alert("Редактирование локации:\n" + JSON.stringify(location, null, 2)),
};
