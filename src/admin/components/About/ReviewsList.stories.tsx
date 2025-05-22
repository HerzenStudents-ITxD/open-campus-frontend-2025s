import type { Meta, StoryObj } from '@storybook/react';
import ReviewsList from './ReviewsList';
import 'bootstrap/dist/css/bootstrap.min.css';

const meta: Meta<typeof ReviewsList> = {
  title: 'Components/ReviewsList',
  component: ReviewsList,
};

export default meta;

type Story = StoryObj<typeof ReviewsList>;

export const Default: Story = {};
