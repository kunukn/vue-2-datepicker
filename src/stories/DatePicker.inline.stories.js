/* eslint-disable @typescript-eslint/no-unused-vars */

import DatePicker from '@/components/DatePicker.vue'
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
  title: 'DatePicker/inline',
  component: DatePicker,
  decorators: [
    () => ({ template: '<div class="my-story-wrap"><story/></div>' }),
  ],
  tags: ['autodocs'],
  render: createRender(DatePicker),
  argTypes: createDatePickerArgTypes(),
}

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
export const InlineUTCMondayMinHeight = {
  args: {
    inline: true,
    useUtc: true,
    mondayFirst: true,
    ensureMinHeight: true,
  },
}

export const CustomDayHeadlineFormatIntlSpanish = {
  args: {
    inline: true,
    minimumView: 'day',
    maximumView: 'day',
    headlineDayFormatter: intlDayFormatter,
    daysCustomDisplay: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
  },
}

function intlDayFormatter(payload) {
  let date = payload.pageDate
  let options = {
    month: 'long',
    year: 'numeric',
  }
  return new Intl.DateTimeFormat('es-ES', options).format(date)
}
