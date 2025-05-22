import type { Meta, StoryObj } from '@storybook/react';
import PasswordChangeForm from './PasswordChangeForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const meta: Meta<typeof PasswordChangeForm> = {
  title: 'Forms/PasswordChangeForm',
  component: PasswordChangeForm,
};

export default meta;
type Story = StoryObj<typeof PasswordChangeForm>;

export const Default: Story = {};
