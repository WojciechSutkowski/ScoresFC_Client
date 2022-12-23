// module.exports = {
//   presets: ['@babel/preset-env'],
//   env: {
//     test: {
//       plugins: ['@babel/plugin-transform-modules-commonjs'],
//     },
//   },
// };

module.exports = {
  presets: [
    [
      'airbnb',
      {
        targets: {
          node: '6.10',
        },
        useBuiltIns: 'usage',
        corejs: '3.6.4',
      },
    ],
  ],
  plugins: ['@babel/plugin-proposal-class-properties'],
};
