const devPresets = ['@vue/babel-preset-app']
const buildPresets = ['@babel/preset-env', '@babel/preset-typescript']
module.exports = {
  presets: process.env.NODE_ENV === 'development' ? devPresets : buildPresets,
  plugins: [
    [
      'module-resolver',
      {
        extensions: ['.js', 'ts', '.vue', '.jsx', '.tsx', '.css', '.scss'],
        root: ['./src'],
        alias: {
          /* this is for tools like Jest */
          '~': '.',
          '@': './src',
        },
      },
    ],
  ],
  env: {
    test: {
      plugins: ['@babel/plugin-transform-modules-commonjs'],
    },
  },
}
