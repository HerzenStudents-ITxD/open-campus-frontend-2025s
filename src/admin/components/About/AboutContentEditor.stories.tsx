import type { Meta, StoryObj } from '@storybook/react';
import AboutContentEditor from './AboutContentEditor';
import 'bootstrap/dist/css/bootstrap.min.css'; // на всякий случай продублируем

const meta: Meta<typeof AboutContentEditor> = {
  title: 'Components/AboutContentEditor',
  component: AboutContentEditor,
};

export default meta;

type Story = StoryObj<typeof AboutContentEditor>;

export const Default: Story = {};
