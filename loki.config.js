module.exports = {
  diffingEngine: 'pixelmatch',
  configurations: {
    'chrome.laptop': {
      target: 'chrome.docker',
      width: 414,
      height: 736,
    },
    android: {
      target: 'android.emulator',
    },
  },
};
