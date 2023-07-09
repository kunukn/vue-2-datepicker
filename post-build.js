import fs from 'fs'

// https://github.com/storybookjs/storybook/issues/20564
fs.copyFile('dist/date-picker.js', 'dist/vue-datepicker.js', (err) => {
  if (err) throw err
  console.log('copy done: vue-datepicker.js')
})
