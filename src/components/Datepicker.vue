<template>
  <div class="vdp-datepicker" :class="[wrapperClass, isRtl ? 'rtl' : '']">
    <DateInput
      :id="id"
      :selectedDate="selectedDate"
      :resetTypedDate="resetTypedDate"
      :format="format"
      :translation="translation"
      :inline="inline"
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
      :useUtc="useUtc"
      @showCalendar="showCalendar"
      @closeCalendar="close"
      @typedDate="setTypedDate"
      @clearDate="clearDate"
    >
      <slot slot="afterDateInput" name="afterDateInput"></slot>
    </DateInput>

    <div class="vdp-datepicker__body">
      <!-- Day View -->
      <PickerDay
        v-if="allowedToShowView('day')"
        :formatter="dayFormatter"
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
        :useUtc="useUtc"
        :daysCustomDisplay="daysCustomDisplay"
        @changedMonth="handleChangedMonthFromDayPicker"
        @selectDate="selectDate"
        @showMonthCalendar="showMonthCalendar"
        @selectedDisabled="selectDisabledDate"
      >
        <slot slot="beforeCalendarHeader" name="beforeCalendarHeader"></slot>
        <slot slot="prevButton" name="prevButton"><IconLeft /></slot>
        <slot slot="nextButton" name="nextButton"><IconRight /></slot>
      </PickerDay>

      <!-- Month View -->
      <PickerMonth
        v-if="allowedToShowView('month')"
        :formatter="monthFormatter"
        :pageDate="pageDate"
        :selectedDate="selectedDate"
        :showMonthView="showMonthView"
        :allowedToShowView="allowedToShowView"
        :disabledDates="disabledDates"
        :calendarClass="calendarClass"
        :calendarStyle="calendarStyle"
        :translation="translation"
        :isRtl="isRtl"
        :useUtc="useUtc"
        :monthsCustomDisplay="monthsCustomDisplay"
        @selectMonth="selectMonth"
        @showYearCalendar="showYearCalendar"
        @changedYear="setPageDate"
      >
        <slot slot="beforeCalendarHeader" name="beforeCalendarHeader"></slot>
        <slot slot="prevButton" name="prevButton"><IconLeft /></slot>
        <slot slot="nextButton" name="nextButton"><IconRight /></slot>
      </PickerMonth>

      <!-- Year View -->
      <PickerYear
        v-if="allowedToShowView('year')"
        :formatter="yearFormatter"
        :pageDate="pageDate"
        :selectedDate="selectedDate"
        :showYearView="showYearView"
        :allowedToShowView="allowedToShowView"
        :disabledDates="disabledDates"
        :calendarClass="calendarClass"
        :calendarStyle="calendarStyle"
        :translation="translation"
        :isRtl="isRtl"
        :useUtc="useUtc"
        @selectYear="selectYear"
        @changedDecade="setPageDate"
      >
        <slot slot="beforeCalendarHeader" name="beforeCalendarHeader"></slot>
        <slot slot="prevButton" name="prevButton"><IconLeft /></slot>
        <slot slot="nextButton" name="nextButton"><IconRight /></slot>
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
import IconLeft from './IconChevronLeft.vue'
import IconRight from './IconChevronRight.vue'
import utils, { makeDateUtils } from '../utils/DateUtils'

export default {
  components: {
    DateInput,
    PickerDay,
    PickerMonth,
    PickerYear,
    IconLeft,
    IconRight,
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
    dayFormatter: Function,
    monthFormatter: Function,
    yearFormatter: Function,
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
    useRtl: {
      type: Boolean,
      default: null,
    },
    minimumView: {
      type: String,
      default: 'day',
    },
    maximumView: {
      type: String,
      default: 'year',
    },
    daysCustomDisplay: {
      type: Array,
      default: null,
    },
    monthsCustomDisplay: {
      type: Array,
      default: null,
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
        position: this.isInline ? 'relative' : undefined,
      }
    },
    isOpen() {
      return this.showDayView || this.showMonthView || this.showYearView
    },
    isInline() {
      return !!this.inline
    },
    isRtl() {
      if (this.useRtl != null) {
        return this.useRtl
      }

      return this.translation.rtl === true
    },
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
  mounted() {
    this.init()
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
}
</script>
<style lang="scss">
.vdp-datepicker {
  --vdp-cell-size: 48px;
  --vdp-color-theme-bg: #fff;
  --vdp-color-theme: #0092bc;
  --vdp-color-border: #ccc;
  --vdp-color-disabled: #ddd;
  --vdp-color-button-disabled: #999;
  --vdp-color-header-button-hover: #eee;
  --vdp-color-header-bg: #fff;
  --vdp-color-highlighted-bg: #cae5ed;
  --vdp-color-highlighted-disabled-fg: #a3a3a3;
  --vdp-color-grey: #a3a3a3;
  --vdp-day-header-font-size: 14px;

  box-sizing: border-box;
  position: relative;
  text-align: left;

  &.rtl {
    direction: rtl;
  }

  * {
    box-sizing: border-box;
  }
}

.vdp-datepicker__calendar {
  position: absolute;
  z-index: 1;
  background: var(--vdp-color-theme-bg);
  width: calc(7 * var(--vdp-cell-size) + 2px); // plus the border
  border: 1px solid var(--vdp-color-border);

  .disabled {
    color: var(--vdp-color-disabled);
    cursor: default;
  }

  .flex-rtl {
    display: flex;
    width: inherit;
    flex-wrap: wrap;
  }

  .cell {
    display: inline-block;
    width: var(--vdp-cell-size);
    height: var(--vdp-cell-size);
    line-height: var(--vdp-cell-size);
    text-align: center;
    vertical-align: middle;
    border: 1px solid transparent;
    background: inherit;
    padding: 0;

    &.day {
      border-radius: 50%;
      width: var(--vdp-cell-size);
    }

    &.month {
      border-radius: 0;
    }

    &.year {
      border-radius: 0;
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
      background: var(--vdp-color-highlighted-bg);

      &.disabled {
        color: var(--vdp-color-highlighted-disabled-fg);
      }
    }

    &.grey {
      color: var(--vdp-color-grey);

      &:hover {
        background: inherit;
      }
    }

    &.day-header {
      width: var(--vdp-cell-size);
      font-size: var(--vdp-day-header-font-size);
      white-space: nowrap;
      cursor: inherit;

      &:hover {
        background: inherit;
      }
    }
  }
}

.vdp-datepicker__header {
  height: var(--vdp-cell-size);
  background: var(--vdp-color-header-bg);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;

  > :nth-child(2) {
    flex: 1;
    display: grid;
    place-items: center;
  }

  > * {
    border: 0;
    margin: 0;
    text-align: center;
    background: inherit;
    height: 100%;
  }

  > .prev,
  > .next {
    min-width: var(--vdp-cell-size);

    &.disabled {
      color: var(--vdp-color-disabled);
    }
  }

  :is(.prev:not(.disabled), .next:not(.disabled), .up:not(.disabled)) {
    cursor: pointer;
  }

  :is(
      .prev:not(.disabled):hover,
      .next:not(.disabled):hover,
      .up:not(.disabled):hover
    ) {
    background: var(--vdp-color-header-button-hover);
  }
}

.vdp-datepicker__pick-buttons {
  background: var(--vdp-color-theme-bg);

  > button {
    background: inherit;
  }
}

.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day,
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month,
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year {
  cursor: pointer;
}

.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).day:hover,
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).month:hover,
.vdp-datepicker__calendar .cell:not(.blank):not(.disabled).year:hover {
  border-color: var(--vdp-color-theme);
}

.vdp-datepicker__calendar :is(.month, .year) {
  width: 33.333%;
}

.vdp-datepicker__clear-button,
.vdp-datepicker__calendar-button {
  cursor: pointer;
  font-style: normal;
}

.vdp-datepicker__clear-button.disabled,
.vdp-datepicker__calendar-button.disabled {
  color: var(--vdp-color-button-disabled);
  cursor: default;
}
</style>
