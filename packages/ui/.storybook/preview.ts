import type { Preview } from '@storybook/react-vite'
import React from 'react';
import { UIProvider } from '../src/provider/UIProvider';
import { colors } from '../src/tokens/colors';

const preview: Preview = {
  decorators: [
    (Story) => {
      return React.createElement(
        'div',
        {
          style: {
            padding: '2rem',
            minHeight: '100vh',
            background: colors.background,
            color: colors.text.DEFAULT,
          }
        },
        React.createElement(UIProvider, null, React.createElement(Story, null))
      );
    },
  ],
  parameters: {
    backgrounds: {
      default: 'dark',
      values: [
        { name: 'dark', value: colors.background },
      ],
    },
    controls: {
      matchers: {
       color: /(background|color)$/i,
       date: /Date$/i,
      },
    },
    a11y: {
      test: 'todo'
    }
  },
};

export default preview;
