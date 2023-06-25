<template>
  <div class="vdp-datepicker" :class="[wrapperClass, isRtl ? 'rtl' : '']">
    <DateInput
      :selectedDate="selectedDate"
      :resetTypedDate="resetTypedDate"
      :format="format"
      :translation="translation"
      :inline="inline"
      :id="id"
      :name="name"
      :refName="refName"
      :openDate="openDate"
      :placeholder="placeholder"
      :inputClass="inputClass"
      :typeable="typeable"
      :clearButton="clearButton"
      :clearButtonIcon="clearButtonIcon"
      :calendarButton="calendarButton"
      :calendarButtonIcon="calendarButtonIcon"
      :calendarButtonIconContent="calendarButtonIconContent"
      :disabled="disabled"
      :required="required"
      :bootstrapStyling="bootstrapStyling"
      :use-utc="useUtc"
      @showCalendar="showCalendar"
      @closeCalendar="close"
      @typedDate="setTypedDate"
      @clearDate="clearDate"
    >
      <slot name="afterDateInput" slot="afterDateInput"></slot>
    </DateInput>

    <!-- Day View -->
    <div class="vdp-datepicker__body">
      <PickerDay
        v-if="allowedToShowView('day')"
        :pageDate="pageDate"
        :selectedDate="selectedDate"
        :showDayView="showDayView"
        :fullMonthName="fullMonthName"
        :allowedToShowView="allowedToShowView"
        :disabledDates="disabledDates"
        :highlighted="highlighted"
        :calendarClass="calendarClass"
        :calendarStyle="calendarStyle"
        :translation="translation"
        :pageTimestamp="pageTimestamp"
        :isRtl="isRtl"
        :mondayFirst="mondayFirst"
        :dayCellContent="dayCellContent"
        :use-utc="useUtc"
        @changedMonth="handleChangedMonthFromDayPicker"
        @selectDate="selectDate"
        @showMonthCalendar="showMonthCalendar"
        @selectedDisabled="selectDisabledDate"
      >
        <slot name="beforeCalendarHeader" slot="beforeCalendarHeader"></slot>
      </PickerDay>

      <!-- Month View -->
      <PickerMonth
        v-if="allowedToShowView('month')"
        :pageDate="pageDate"
        :selectedDate="selectedDate"
        :showMonthView="showMonthView"
        :allowedToShowView="allowedToShowView"
        :disabledDates="disabledDates"
        :calendarClass="calendarClass"
        :calendarStyle="calendarStyle"
        :translation="translation"
        :isRtl="isRtl"
        :use-utc="useUtc"
        @selectMonth="selectMonth"
        @showYearCalendar="showYearCalendar"
        @changedYear="setPageDate"
      >
        <slot name="beforeCalendarHeader" slot="beforeCalendarHeader"></slot>
      </PickerMonth>

      <!-- Year View -->
      <PickerYear
        v-if="allowedToShowView('year')"
        :pageDate="pageDate"
        :selectedDate="selectedDate"
        :showYearView="showYearView"
        :allowedToShowView="allowedToShowView"
        :disabledDates="disabledDates"
        :calendarClass="calendarClass"
        :calendarStyle="calendarStyle"
        :translation="translation"
        :isRtl="isRtl"
        :use-utc="useUtc"
        @selectYear="selectYear"
        @changedDecade="setPageDate"
      >
        <slot name="beforeCalendarHeader" slot="beforeCalendarHeader"></slot>
      </PickerYear>
    </div>
  </div>
</template>
<script>
import englishLanguage from '../locale/translations/en.js'
import DateInput from './DateInput.vue'
import PickerDay from './PickerDay.vue'
import PickerMonth from './PickerMonth.vue'
import PickerYear from './PickerYear.vue'
import utils, { makeDateUtils } from '../utils/DateUtils'

export default {
  components: {
    DateInput,
    PickerDay,
    PickerMonth,
    PickerYear,
  },
  props: {
    value: {
      validator: (val) => utils.validateDateInput(val),
    },
    name: String,
    refName: String,
    id: String,
    format: {
      type: [String, Function],
      default: 'dd MMM yyyy',
    },
    language: {
      type: Object,
      default: () => englishLanguage,
    },
    openDate: {
      validator: (val) => utils.validateDateInput(val),
    },
    dayCellContent: Function,
    fullMonthName: Boolean,
    disabledDates: Object,
    highlighted: Object,
    placeholder: String,
    inline: Boolean,
    calendarClass: [String, Object, Array],
    inputClass: [String, Object, Array],
    wrapperClass: [String, Object, Array],
    mondayFirst: Boolean,
    clearButton: Boolean,
    clearButtonIcon: String,
    calendarButton: Boolean,
    calendarButtonIcon: String,
    calendarButtonIconContent: String,
    bootstrapStyling: Boolean,
    initialView: String,
    disabled: Boolean,
    required: Boolean,
    typeable: Boolean,
    useUtc: Boolean,
    minimumView: {
      type: String,
      default: 'day',
    },
    maximumView: {
      type: String,
      default: 'year',
    },
  },
  data() {
    const startDate = this.openDate ? new Date(this.openDate) : new Date()
    const constructedDateUtils = makeDateUtils(this.useUtc)
    const pageTimestamp = constructedDateUtils.setDate(startDate, 1)
    return {
      /*
       * Vue cannot observe changes to a Date Object so date must be stored as a timestamp
       * This represents the first day of the current viewing month
       * {Number}
       */
      pageTimestamp,
      /*
       * Selected Date
       * {Date}
       */
      selectedDate: null,
      /*
       * Flags to show calendar views
       * {Boolean}
       */
      showDayView: false,
      showMonthView: false,
      showYearView: false,
      /*
       * Positioning
       */
      calendarHeight: 0,
      resetTypedDate: new Date(),
      utils: constructedDateUtils,
    }
  },
  watch: {
    value(value) {
      this.setValue(value)
    },
    openDate() {
      this.setPageDate()
    },
    initialView() {
      this.setInitialView()
    },
  },
  computed: {
    computedInitialView() {
      if (!this.initialView) {
        return this.minimumView
      }

      return this.initialView
    },
    pageDate() {
      return new Date(this.pageTimestamp)
    },

    translation() {
      return this.language
    },

    calendarStyle() {
      return {
        position: this.isInline ? 'static' : undefined,
      }
    },
    isOpen() {
      return this.showDayView || this.showMonthView || this.showYearView
    },
    isInline() {
      return !!this.inline
    },
    isRtl() {
      return this.translation.rtl === true
    },
  },
  methods: {
    /**
     * Called in the event that the user navigates to date pages and
     * closes the picker without selecting a date.
     */
    resetDefaultPageDate() {
      if (this.selectedDate === null) {
        this.setPageDate()
        return
      }
      this.setPageDate(this.selectedDate)
    },
    /**
     * Effectively a toggle to show/hide the calendar
     * @return {mixed}
     */
    showCalendar() {
      if (this.disabled || this.isInline) {
        return false
      }
      if (this.isOpen) {
        return this.close(true)
      }
      this.setInitialView()
    },
    /**
     * Sets the initial picker page view: day, month or year
     */
    setInitialView() {
      const initialView = this.computedInitialView
      if (!this.allowedToShowView(initialView)) {
        throw new Error(
          `initialView '${this.initialView}' cannot be rendered based on minimum '${this.minimumView}' and maximum '${this.maximumView}'`
        )
      }
      switch (initialView) {
        case 'year':
          this.showYearCalendar()
          break
        case 'month':
          this.showMonthCalendar()
          break
        default:
          this.showDayCalendar()
          break
      }
    },
    /**
     * Are we allowed to show a specific picker view?
     * @param {String} view
     * @return {Boolean}
     */
    allowedToShowView(view) {
      const views = ['day', 'month', 'year']
      const minimumViewIndex = views.indexOf(this.minimumView)
      const maximumViewIndex = views.indexOf(this.maximumView)
      const viewIndex = views.indexOf(view)

      return viewIndex >= minimumViewIndex && viewIndex <= maximumViewIndex
    },
    /**
     * Show the day picker
     * @return {Boolean}
     */
    showDayCalendar() {
      if (!this.allowedToShowView('day')) {
        return false
      }
      this.close()
      this.showDayView = true
      return true
    },
    /**
     * Show the month picker
     * @return {Boolean}
     */
    showMonthCalendar() {
      if (!this.allowedToShowView('month')) {
        return false
      }
      this.close()
      this.showMonthView = true
      return true
    },
    /**
     * Show the year picker
     * @return {Boolean}
     */
    showYearCalendar() {
      if (!this.allowedToShowView('year')) {
        return false
      }
      this.close()
      this.showYearView = true
      return true
    },
    /**
     * Set the selected date
     * @param {Number} timestamp
     */
    setDate(timestamp) {
      const date = new Date(timestamp)
      this.selectedDate = date
      this.setPageDate(date)
      this.$emit('selected', date)
      this.$emit('input', date)
    },
    /**
     * Clear the selected date
     */
    clearDate() {
      this.selectedDate = null
      this.setPageDate()
      this.$emit('selected', null)
      this.$emit('input', null)
      this.$emit('cleared')
    },
    /**
     * @param {Object} date
     */
    selectDate(date) {
      this.setDate(date.timestamp)
      if (!this.isInline) {
        this.close(true)
      }
      this.resetTypedDate = new Date()
    },
    /**
     * @param {Object} date
     */
    selectDisabledDate(date) {
      this.$emit('selectedDisabled', date)
    },
    /**
     * @param {Object} month
     */
    selectMonth(month) {
      const date = new Date(month.timestamp)
      if (this.allowedToShowView('day')) {
        this.setPageDate(date)
        this.$emit('changedMonth', month)
        this.showDayCalendar()
      } else {
        this.selectDate(month)
      }
    },
    /**
     * @param {Object} year
     */
    selectYear(year) {
      const date = new Date(year.timestamp)
      if (this.allowedToShowView('month')) {
        this.setPageDate(date)
        this.$emit('changedYear', year)
        this.showMonthCalendar()
      } else {
        this.selectDate(year)
      }
    },
    /**
     * Set the datepicker value
     * @param {Date|String|Number|null} date
     */
    setValue(date) {
      if (typeof date === 'string' || typeof date === 'number') {
        let parsed = new Date(date)
        date = isNaN(parsed.valueOf()) ? null : parsed
      }
      if (!date) {
        this.setPageDate()
        this.selectedDate = null
        return
      }
      this.selectedDate = date
      this.setPageDate(date)
    },
    /**
     * Sets the date that the calendar should open on
     */
    setPageDate(date) {
      if (!date) {
        if (this.openDate) {
          date = new Date(this.openDate)
        } else {
          date = new Date()
        }
      }
      this.pageTimestamp = this.utils.setDate(new Date(date), 1)
    },
    /**
     * Handles a month change from the day picker
     */
    handleChangedMonthFromDayPicker(date) {
      this.setPageDate(date)
      this.$emit('changedMonth', date)
    },
    /**
     * Set the date from a typedDate event
     */
    setTypedDate(date) {
      this.setDate(date.getTime())
    },
    /**
     * Close all calendar layers
     * @param {Boolean} emitEvent - emit close event
     */
    close(emitEvent) {
      this.showDayView = this.showMonthView = this.showYearView = false
      if (!this.isInline) {
        if (emitEvent) {
          this.$emit('closed')
        }
        document.removeEventListener('click', this.clickOutside, false)
      }
    },
    /**
     * Initiate the component
     */
    init() {
      if (this.value) {
        this.setValue(this.value)
      }
      if (this.isInline) {
        this.setInitialView()
      }
    },
  },
  mounted() {
    this.init()
  },
}
</script>
<style lang="scss">
.vdp-datepicker__calendar header .prev,
.vdp-datepicker__calendar header .next {
  width: 14.285714285714286%;
  float: left;
  text-indent: -10000px;
  position: relative;
}
.vdp-datepicker__calendar header .prev:after,
.vdp-datepicker__calendar header .next:after {
  content: '';
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%) translateY(-50%);
  border: 6px solid transparent;
}

.vdp-datepicker {
  --vdp-cell-size: 48px;
  --vdp-color-cal-bg: #fff;
  --vdp-color-theme: #0092bc;

  position: relative;
  text-align: left;

  * {
    box-sizing: border-box;
  }

  &.rtl {
    direction: rtl;
  }
}

.vdp-datepicker__calendar {
  position: absolute;
  z-index: 100;
  background: var(--vdp-color-cal-bg);
  width: calc(7 * var(--vdp-cell-size) + 2px); // plus the border
  border: 1px solid #ccc;

  header {
    display: block;
    line-height: 40px;

    span,
    button {
      border: 0;
      display: inline-block;
      text-align: center;
      width: 71.42857142857143%;
      float: left;
    }

    .prev {
      &:after {
        border-right: 10px solid #000;
        margin-left: -5px;
      }
      &.disabled {
        &:after {
          border-right: 10px solid #ddd;
        }
      }
    }

    .next {
      &:after {
        border-left: 10px solid #000;
        margin-left: 5px;
      }
      &.disabled {
        &:after {
          border-left: 10px solid #ddd;
        }
      }
    }
  }

  .disabled {
    color: #ddd;
    cursor: default;
  }

  .flex-rtl {
    display: flex;
    width: inherit;
    flex-wrap: wrap;
  }

  .cell {
    display: inline-block;
    width: 14.285714285714286%;
    height: var(--vdp-cell-size);
    line-height: var(--vdp-cell-size);
    text-align: center;
    vertical-align: middle;
    border: 1px solid transparent;

    // display: inline-grid;
    // place-items: center;
    // line-height: 1;

    &.day {
      border-radius: 50%;
    }
    &.month {
    }
    &.year {
    }

    &.selected {
      background: var(--vdp-color-theme);
      color: white;

      &:hover {
        background: var(--vdp-color-theme);
      }
      &.highlighted {
        background: var(--vdp-color-theme);
      }
    }
    &.highlighted {
      background: #cae5ed;
      &.disabled {
        color: #a3a3a3;
      }
    }
    &.grey {
      color: #888;
      &:hover {
        background: inherit;
      }
    }
    &.day-header {
      font-size: 75%;
      white-space: nowrap;
      cursor: inherit;
      &:hover {
        background: inherit;
      }
    }
  }
}

.vdp-datepicker__calendar header .prev:not(.disabled),
.vdp-datepicker__calendar header .next:not(.disabled),
.vdp-datepicker__calendar header .up:not(.disabled) {
  cursor: pointer;
}
.vdp-datepicker__calendar header .prev:not(.disabled):hover,
.vdp-datepicker__calendar header .next:not(.disabled):hover,
.vdp-datepicker__calendar header .up:not(.disabled):hover {
  background: #ccc;
}
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day,
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month,
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year {
  cursor: pointer;
}
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover,
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover,
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover {
  border: 1px solid var(--vdp-color-theme);
}
.vdp-datepicker__calendar .month,
.vdp-datepicker__calendar .year {
  width: 33.333%;
}
.vdp-datepicker__clear-button,
.vdp-datepicker__calendar-button {
  cursor: pointer;
  font-style: normal;
}
.vdp-datepicker__clear-button.disabled,
.vdp-datepicker__calendar-button.disabled {
  color: #999;
  cursor: default;
}
</style>
