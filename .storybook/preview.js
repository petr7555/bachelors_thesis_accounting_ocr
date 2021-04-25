import { INITIAL_VIEWPORTS } from '@storybook/addon-viewport';
import { addDecorator } from '@storybook/react';
import { withKnobs } from '@storybook/addon-knobs';

/** Insert react-native-vector-icons **/
// Generate required css
import ionicons from 'react-native-vector-icons/Fonts/Ionicons.ttf';
import materialCommunityIcons from 'react-native-vector-icons/Fonts/MaterialCommunityIcons.ttf';

// if not running test
if (typeof window !== 'undefined') {
  const iconFontStyles = `
  @font-face {
    src: url(${ionicons});
    font-family: Ionicons;
  }
  @font-face {
    src: url(${materialCommunityIcons});
    font-family: MaterialCommunityIcons;
  }
`;

  // Create stylesheet
  const style = document.createElement('style');
  style.type = 'text/css';
  style.appendChild(document.createTextNode(iconFontStyles));
  // Inject stylesheet
  document.head.appendChild(style);
}
/** end **/

addDecorator(
  withKnobs({
    escapeHTML: false,
  }),
);

export const parameters = {
  layout: 'fullscreen',
  options: {
    panelPosition: 'right',
  },
  viewport: {
    viewports: INITIAL_VIEWPORTS,
    defaultViewport: 'iphone6',
  },
  backgrounds: {
    default: 'white',
    values: [
      {
        name: 'white',
        value: '#fff',
      },
      {
        name: 'black',
        value: '#000',
      },
    ],
  },
};
