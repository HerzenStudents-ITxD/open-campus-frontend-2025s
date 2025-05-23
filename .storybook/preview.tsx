import type { Preview } from '@storybook/react';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
  decorators: [
    (Story) => (
      <div className="admin-wrapper">
        <Story />
      </div>
    ),
  ],
};

export default preview;
