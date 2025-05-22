import type { Meta, StoryObj } from '@storybook/react';
import ReviewApproveForm from './ReviewApproveForm';
import 'bootstrap/dist/css/bootstrap.min.css';

const meta: Meta<typeof ReviewApproveForm> = {
  title: 'Components/ReviewApproveForm',
  component: ReviewApproveForm,
};

export default meta;

type Story = StoryObj<typeof ReviewApproveForm>;

export const Default: Story = {};
