module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      'babel-preset-expo',
      '@babel/preset-flow'
    ]
  };
};exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    presets: ['nativewind/babel']
  };
};
