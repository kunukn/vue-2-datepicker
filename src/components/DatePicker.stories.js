import DatePicker from './DatePicker.vue'
import { action } from '@storybook/addon-actions';

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
    template: '<DatePicker v-bind="$props" v-on="$props" />',
  }),
  argTypes: {
    inline: {
      control: 'boolean',
      description: '',
      defaultValue: false,
    },
    useUtc: {
      control: 'boolean',
      description: '',
      defaultValue: false,
    },
    mondayFirst: {
      control: 'boolean',
      description: '',
      defaultValue: false,
    },
    nextButton: { action: 'nextButton' },
    prevButton: { action: 'prevButton' },
    beforeCalendarHeader: { action: 'beforeCalendarHeader' },
    afterDateInput: { action: 'afterDateInput' },
    closed: { action: 'closed' },
    changedMonth: { action: 'changedMonth' },
    changedYear: { action: 'changedYear' },
    selectedDisabled: { action: 'selectedDisabled' },
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
