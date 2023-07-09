import fs from 'fs'

fs.copyFile('dist/date-picker.js', 'dist/vue-datepicker.js', (err) => {
  if (err) throw err
  console.log('copy done: vue-datepicker.js')
})
