import { Meta, StoryFn } from "@storybook/react";
import LocationForm, { LocationFormProps } from "./LocationForm";

const meta: Meta<typeof LocationForm> = {
  title: "Components/LocationForm",
  component: LocationForm,
};

export default meta;

const Template: StoryFn<LocationFormProps> = (args) => <LocationForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSave: (location) => {
    alert("Saved location:\n" + JSON.stringify(location, null, 2));
  },
};
