const path = require('path');

const externalLibs = [path.resolve(__dirname, '../node_modules/react-native')];

module.exports = ({ config }) => {
  config.module.rules.push({
    test: /\.tsx?$/,
    exclude: /node_modules/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-expo'],
        },
      },
    ],
  });
  config.module.rules.push({
    test: /\.jsx?$/,
    include: externalLibs,
    use: [
      {
        loader: 'babel-loader',
        options: {
          presets: ['babel-preset-expo'],
        },
      },
    ],
  });
  config.module.rules.push({
    test: /\.ttf$/,
    loader: 'url-loader', // or directly file-loader
    include: path.resolve(__dirname, 'node_modules/react-native-vector-icons'),
  });

  config.resolve.alias = {
    // replace `react-native` imports with `react-native-web`
    'react-native$': require.resolve('react-native-web'),
    // "remove" react-native-windows import, because it is not possible to build a storybook with it
    'react-native-windows$': require.resolve('./__mocks__/universal-mock.ts'),
    // "remove" @sentry/react-native import, because it is not possible to build a storybook with it
    '@sentry/react-native$': require.resolve('./__mocks__/universal-mock.ts'),
  };

  config.resolve.extensions.push('.ts', '.tsx', '.web.ts', '.web.tsx');

  return config;
};
