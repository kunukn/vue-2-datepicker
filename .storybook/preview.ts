import type { Preview } from '@storybook/vue'
// import '../src/assets/ress.min.css'
import '../src/assets/demo.scss'

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
}

export default preview
