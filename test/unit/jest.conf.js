var path = require('path')

module.exports = {
  testEnvironment: 'jsdom',
  rootDir: path.resolve(__dirname, '../../'),
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(js|ts)?$',
  moduleFileExtensions: ['js', 'jsx', 'tsx', 'json', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^~/(.*)$': '<rootDir>/$1',
    '^vue$': 'vue/dist/vue.common.js',
    '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': 'babel-jest',
    '.*\\.(vue)$': 'vue-jest',
  },
  coverageDirectory: '<rootDir>/test/unit/coverage',
  collectCoverageFrom: [
    'src/**/*.{js,ts,vue}',
    '!src/locale/translations/**/*.js',
  ],
  // setupFiles: ['<rootDir>/test/unit/setup'],
  setupFilesAfterEnv: ['<rootDir>/test/unit/setup'],
}
