import type { Meta, StoryObj } from '@storybook/react';
import RecentChanges from './RecentChanges';
import 'bootstrap/dist/css/bootstrap.min.css';

const meta: Meta<typeof RecentChanges> = {
  title: 'Components/RecentChanges',
  component: RecentChanges,
};

export default meta;

type Story = StoryObj<typeof RecentChanges>;

export const Default: Story = {};
