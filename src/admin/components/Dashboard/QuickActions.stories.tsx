import type { Meta, StoryObj } from '@storybook/react';
import QuickActions from './QuickActions';
import 'bootstrap/dist/css/bootstrap.min.css';

const meta: Meta<typeof QuickActions> = {
  title: 'Components/QuickActions',
  component: QuickActions,
};

export default meta;

type Story = StoryObj<typeof QuickActions>;

export const Default: Story = {};
