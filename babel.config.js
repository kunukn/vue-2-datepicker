const devPresets = ['@vue/babel-preset-app']
const buildPresets = ['@babel/preset-env', '@babel/preset-typescript']

let presets = buildPresets

console.log('***** process.env.NODE_ENV', process.env.NODE_ENV)

if (process.env.NODE_ENV === 'development') {
  presets = devPresets
}

if (process.env.NODE_ENV === 'production') {
  presets = buildPresets
}

if (process.env.NODE_ENV === 'test') {
  presets = devPresets
}

module.exports = {
  presets,
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
