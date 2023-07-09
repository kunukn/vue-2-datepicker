/* eslint-disable @typescript-eslint/no-unused-vars */

import DatePicker from './DatePicker.vue'
import { withActions } from '@storybook/addon-actions/decorator'
import pick from 'lodash.pick'
import { action } from '@storybook/addon-actions'
import dayjs from 'dayjs'

const noop = () => {
  /* */
}

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'DatePicker/DatePicker',
  component: DatePicker,
  decorators: [],
  tags: ['autodocs'],
  render: (args, { argTypes }) => {
    let props = Object.keys(argTypes)

    return {
      props,
      components: { DatePicker },
      data() {
        return {
          myaction(input) {
            console.log(input, Date.now())
            return action(input)
          },
        }
      },
      template: `
      <DatePicker v-bind="$props" 
        @opened="myaction('opened')"
        @closed="myaction('closed')"
        @selected="myaction('selected')"
        @selectedDisabled="myaction('selectedDisabled')"
        @input="myaction('input')"
        @cleared="myaction('cleared')"
        @changedMonth="myaction('changedMonth')"
        @changedYear="myaction('changedYear')"
        @changedDecade="myaction('changedDecade')"
      />`,
    }
  },
  argTypes: {
    inline: {
      control: 'boolean',
      defaultValue: false,
    },
    useUtc: {
      control: 'boolean',
      defaultValue: false,
    },
    useRtl: {
      control: 'boolean',
      defaultValue: false,
    },
    mondayFirst: {
      control: 'boolean',
      defaultValue: false,
    },
    typeable: {
      control: 'boolean',
      defaultValue: false,
    },
    minimumView: {
      control: 'radio',
      options: ['day', 'month', 'year'],
      defaultValue: 'day',
    },
    maximumView: {
      control: 'radio',
      options: ['day', 'month', 'year'],
      defaultValue: 'year',
    },
    monthsCustomDisplay: {
      control: 'array',
      defaultValue: [],
    },
    daysCustomDisplay: {
      control: 'array',
      defaultValue: [],
    },
    opened: { action: 'opened' },
    closed: { action: 'closed' },
    selected: { action: 'selected' },
    selectedDisabled: { action: 'selectedDisabled' },
    input: { action: 'input' },
    cleared: { action: 'cleared' },
    changedMonth: { action: 'changedMonth' },
    changedYear: { action: 'changedYear' },
    changedDecade: { action: 'changedDecade' },

    beforeCalendarHeader: { action: 'beforeCalendarHeader' },
    afterDateInput: { action: 'afterDateInput' },

    nextButton: { action: 'nextButton' },
    prevButton: { action: 'prevButton' },
  },
}

// More on writing stories with args: https://storybook.js.org/docs/vue/writing-stories/args
export const InlineUTCMondayFirst = {
  args: {
    inline: true,
    useUtc: true,
    mondayFirst: true,
  },
}

export const DefaultDatePicker = {
  args: {},
}
