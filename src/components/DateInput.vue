<template>
  <div
    class="vdp-datepicker__date-input"
    :class="{ 'input-group': bootstrapStyling }"
  >
    <!-- Input -->
    <input
      :id="id"
      :ref="refName"
      :type="inline ? 'hidden' : 'text'"
      :class="computedInputClass"
      :name="name"
      :value="formattedValue"
      :open-date="openDate"
      :placeholder="placeholder"
      :disabled="disabled"
      :required="required"
      :readonly="!typeable"
      autocomplete="off"
      @click="showCalendar"
      @keyup="parseTypedDate"
      @blur="inputBlurred"
    />
    <slot name="afterDateInput"></slot>
  </div>
</template>
<script>
import { makeDateUtils } from '../utils/DateUtils'
export default {
  props: {
    selectedDate: Date,
    resetTypedDate: [Date],
    format: [String, Function],
    translation: Object,
    inline: Boolean,
    id: String,
    name: String,
    refName: String,
    openDate: Date,
    placeholder: String,
    inputClass: [String, Object, Array],
    disabled: Boolean,
    required: Boolean,
    typeable: Boolean,
    bootstrapStyling: Boolean,
    useUtc: Boolean,
  },
  data() {
    const constructedDateUtils = makeDateUtils(this.useUtc)
    return {
      input: null,
      typedDate: false,
      utils: constructedDateUtils,
    }
  },
  computed: {
    formattedValue() {
      if (!this.selectedDate) {
        return null
      }
      if (this.typedDate) {
        return this.typedDate
      }
      return typeof this.format === 'function'
        ? this.format(this.selectedDate)
        : this.utils.formatDate(
            new Date(this.selectedDate),
            this.format + '',
            this.translation
          )
    },

    computedInputClass() {
      if (this.bootstrapStyling) {
        if (typeof this.inputClass === 'string') {
          return [this.inputClass, 'form-control'].join(' ')
        }
        return { 'form-control': true, ...this.inputClass }
      }
      return this.inputClass
    },
  },
  watch: {
    resetTypedDate() {
      this.typedDate = false
    },
  },
  mounted() {
    this.input = this.$el.querySelector('input')
  },
  methods: {
    showCalendar() {
      this.$emit('showCalendar')
    },
    /**
     * Attempt to parse a typed date
     * @param {Event} event
     */
    parseTypedDate(event) {
      // close calendar if escape or enter are pressed
      if (
        [
          27, // escape
          13, // enter
        ].includes(event.keyCode)
      ) {
        this.input.blur()
      }

      if (this.typeable) {
        const typedDate = Date.parse(this.input.value)
        if (!isNaN(typedDate)) {
          this.typedDate = this.input.value
          this.$emit('typedDate', new Date(this.typedDate))
        }
      }
    },
    /**
     * nullify the typed date to defer to regular formatting
     * called once the input is blurred
     */
    inputBlurred() {
      if (this.typeable) {
        if (isNaN(Date.parse(this.input.value))) {
          this.clearDate()
          this.input.value = null
          this.typedDate = null
        }
      }

      // this.$emit('closeCalendar') // remove this to support keyboard tapping
    },
    /**
     * emit a clearDate event
     */
    clearDate() {
      this.$emit('clearDate')
    },
  },
}
</script>
