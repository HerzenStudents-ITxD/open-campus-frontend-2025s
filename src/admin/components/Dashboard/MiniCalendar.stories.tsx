import type { Meta, StoryObj } from '@storybook/react';
import MiniCalendar from './MiniCalendar';
import 'react-calendar/dist/Calendar.css';
import './MiniCalendar.css'; 

const meta: Meta<typeof MiniCalendar> = {
  title: 'Components/MiniCalendar',
  component: MiniCalendar,
};

export default meta;

type Story = StoryObj<typeof MiniCalendar>;

export const Default: Story = {
  args: {
    events: [
      { id: 1, title: 'Лекция по истории', date: '2025-05-21' },
      { id: 2, title: 'Встреча с профессором', date: '2025-05-22' },
      { id: 3, title: 'Мастер-класс по рисованию', date: '2025-05-23' },
    ],
  },
};
