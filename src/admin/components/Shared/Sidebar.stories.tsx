import { Meta, StoryFn } from "@storybook/react";
import Sidebar from "./Sidebar";

const meta: Meta<typeof Sidebar> = {
  title: "Components/Sidebar",
  component: Sidebar,
};

export default meta;

const Template: StoryFn<typeof Sidebar> = () => <Sidebar />;

export const Default = Template.bind({});