import type { Meta, StoryObj } from '@storybook/react';
import EditorInfoForm from './EditorInfoForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const meta: Meta<typeof EditorInfoForm> = {
  title: 'Forms/EditorInfoForm',
  component: EditorInfoForm,
};

export default meta;
type Story = StoryObj<typeof EditorInfoForm>;

export const Default: Story = {};
