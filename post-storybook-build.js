import fs from 'fs'

fs.copyFile('.storybook/.nojekyll', 'storybook-static/.nojekyll', (err) => {
  if (err) throw err
  console.log('copy done: .nojekyll')
})
