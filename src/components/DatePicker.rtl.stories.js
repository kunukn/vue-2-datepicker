/* eslint-disable @typescript-eslint/no-unused-vars */

import DatePicker from './DatePicker.vue'
import { withActions } from '@storybook/addon-actions/decorator'
import pick from 'lodash.pick'
import { action } from '@storybook/addon-actions'
import dayjs from 'dayjs'
import {
  createDatePickerArgTypes,
  createRender,
} from '@/stories/datePickerStoryHelpers'

const noop = () => {
  /* */
}

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'DatePicker/rtl',
  component: DatePicker,
  decorators: [],
  tags: ['autodocs'],
  render: createRender(DatePicker),
  argTypes: createDatePickerArgTypes(),
}

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args

export const RtlDatePicker = {
  args: {
    placeholder: 'Select date',
    useRtl: true,
  },
}
