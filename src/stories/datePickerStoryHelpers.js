import { action } from '@storybook/addon-actions'

function createTemplate() {
  return `<DatePicker v-bind="$props" 
  @opened="myaction('opened')"
  @closed="myaction('closed')"
  @selected="myaction('selected')"
  @selectedDisabled="myaction('selectedDisabled')"
  @input="myaction('input')"
  @cleared="myaction('cleared')"
  @changedMonth="myaction('changedMonth')"
  @changedYear="myaction('changedYear')"
  @changedDecade="myaction('changedDecade')"
/>`
}

export function createDatePickerArgTypes() {
  return {
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
    placeholder: {
      control: 'string',
      defaultValue: '',
    },
    dayFormatter: {
      defaultValue: null,
    },
    headlineDayFormatter: {
      defaultValue: null,
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
  }
}

export function createRender(DatePicker) {
  return (args, { argTypes }) => {
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
      template: createTemplate(),
    }
  }
}
