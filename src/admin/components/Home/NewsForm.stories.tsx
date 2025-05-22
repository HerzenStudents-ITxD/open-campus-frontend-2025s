import { Meta, StoryFn } from "@storybook/react";
import NewsForm, { NewsData } from "./NewsForm";

const meta: Meta<typeof NewsForm> = {
  title: "Components/NewsForm",
  component: NewsForm,
};

export default meta;

const Template: StoryFn<typeof NewsForm> = (args) => <NewsForm {...args} />;

export const Default = Template.bind({});
Default.args = {
  onSubmit: (news: NewsData) => {
    alert("Submitted news:\n" + JSON.stringify(news, null, 2));
  },
};
