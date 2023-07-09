import DatePicker from './DatePicker.vue'
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { action } from '@storybook/addon-actions'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const noop = () => {
  /* */
}

// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
export default {
  title: 'DatePicker/DatePicker',
  component: DatePicker,
  tags: ['autodocs'],
  render: (args, { argTypes }) => ({
    props: Object.keys(argTypes),
    components: { DatePicker },
    template: '<DatePicker v-bind="$props"  />',
    // v-on="$props"
  }),
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
