import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
// import { addDecorator } from '@storybook/react';
// import { withKnobs } from '@storybook/addon-knobs';
//
// addDecorator(
//     withKnobs({
//         escapeHTML: false,
//     }),
// );

export const parameters = {
  layout: 'fullscreen',
  options: {
    panelPosition: 'right',
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6',
  },
};
