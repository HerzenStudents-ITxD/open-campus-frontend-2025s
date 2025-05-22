import type { Meta, StoryObj } from '@storybook/react';
import PhotoGalleryEditor from './PhotoGalleryEditor';
import 'bootstrap/dist/css/bootstrap.min.css';

const meta: Meta<typeof PhotoGalleryEditor> = {
  title: 'Components/PhotoGalleryEditor',
  component: PhotoGalleryEditor,
};

export default meta;

type Story = StoryObj<typeof PhotoGalleryEditor>;

export const Default: Story = {};
