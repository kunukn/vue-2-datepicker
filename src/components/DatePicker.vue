<template>
  <div
    class="vdp-datepicker"
    :class="[wrapperClass]"
    :data-rtl="!!isRtl + ''"
    :data-inline="!!isInline + ''"
    :data-min-height="!!ensureMinHeight + ''"
    :data-is-open="!!isOpen + ''"
  >
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
      :disabled="disabled"
      :required="required"
      :bootstrapStyling="bootstrapStyling"
      :useUtc="useUtc"
      :isOpen="isOpen"
      @showCalendar="showCalendar"
      @closeCalendar="close"
      @typedDate="setTypedDate"
      @clearDate="clearDate"
    >
      <slot slot="afterDateInput" name="afterDateInput"></slot>
    </DateInput>

    <div class="vdp-datepicker__container">
      <div class="vdp-datepicker__picker">
        <!-- Day View -->
        <PickerDay
          v-if="allowedToShowView('day')"
          :value="value"
          :dayFormatter="dayFormatter"
          :headlineDayFormatter="headlineDayFormatter"
          :prevDisabled="prevDisabled"
          :nextDisabled="nextDisabled"
          :pageDate="pageDate"
          :selectedDate="selectedDate"
          :showDayView="showDayView"
          :fullMonthName="fullMonthName"
          :allowedToShowView="allowedToShowView"
          :disabledDates="disabledDates"
          :highlighted="highlighted"
          :calendarClass="calendarClass"
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
          :value="value"
          :monthFormatter="monthFormatter"
          :headlineMonthFormatter="headlineMonthFormatter"
          :prevDisabled="prevDisabled"
          :nextDisabled="nextDisabled"
          :pageDate="pageDate"
          :selectedDate="selectedDate"
          :showMonthView="showMonthView"
          :allowedToShowView="allowedToShowView"
          :disabledDates="disabledDates"
          :calendarClass="calendarClass"
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
          :value="value"
          :yearFormatter="yearFormatter"
          :headlineYearFormatter="headlineYearFormatter"
          :prevDisabled="prevDisabled"
          :nextDisabled="nextDisabled"
          :pageDate="pageDate"
          :selectedDate="selectedDate"
          :showYearView="showYearView"
          :allowedToShowView="allowedToShowView"
          :disabledDates="disabledDates"
          :calendarClass="calendarClass"
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
    headlineDayFormatter: Function,
    headlineMonthFormatter: Function,
    headlineYearFormatter: Function,
    nextDisabled: Function,
    prevDisabled: Function,
    fullMonthName: Boolean,
    disabledDates: Object,
    highlighted: Object,
    placeholder: String,
    inline: Boolean,
    calendarClass: [String, Object, Array],
    inputClass: [String, Object, Array],
    wrapperClass: [String, Object, Array],
    mondayFirst: Boolean,
    ensureMinHeight: Boolean,
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
    daysCustomDisplay: Array,
    monthsCustomDisplay: Array,
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
      return this.language || englishLanguage
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
  --vdp-cell-size: 44px;
  --vdp-cell-gap: 4px;
  --vdp-header-gap: 4px;
  --vdp-cell-border-radius-square: 50%;
  --vdp-cell-border-radius-rectangle: 8px;
  --vdp-color-theme-bg: #fff;
  --vdp-color-theme: #007da0;
  --vdp-color-selected: #fff;
  --vdp-color-border: #ccc;
  --vdp-color-disabled: #ddd;
  --vdp-color-button-disabled: #999;
  --vdp-color-header-button-hover: #f2f2f2;
  --vdp-color-header-bg: #fff;
  --vdp-color-highlighted-bg: #cae5ed;
  --vdp-color-highlighted-disabled-fg: #a3a3a3;
  --vdp-color-grey: #a3a3a3;
  --vdp-font-size-day-header: 14px;

  box-sizing: border-box;
  position: relative;
  text-align: left;
  font-family: inherit;

  * {
    box-sizing: border-box;
  }

  p {
    margin: 0;
  }

  button {
    padding: 0;
  }

  &[data-rtl='true'],
  &.rtl {
    direction: rtl;
  }

  &[data-inline='true'] {
    .vdp-datepicker__picker {
      position: relative; // higher specificity
    }
  }

  &[data-min-height='true'] {
    .vdp-datepicker__calendar--day {
      // higher specificity
      min-height: calc(
        var(--vdp-cell-size) * 8 + var(--vdp-cell-gap) * 8 +
          var(--vdp-header-gap) * 2
      );
    }
  }

  &[data-is-open='false'] {
    .vdp-datepicker__picker {
      display: none;
    }
  }
}

.vdp-datepicker__container {
  display: flex;
  position: relative;
}

.vdp-datepicker__picker {
  z-index: 1;
  position: absolute;
  top: 0;
  background: var(--vdp-color-theme-bg);
  border: 1px solid var(--vdp-color-border);
  display: inline-flex;
  flex-direction: column;
}

.vdp-datepicker__calendar {
  position: relative;

  // using min-width breaks the RTL layout
  width: calc(7 * var(--vdp-cell-size) + var(--vdp-cell-gap) * 8);

  .disabled,
  button.disabled {
    color: var(--vdp-color-disabled);
    cursor: not-allowed;
  }

  .flex-rtl {
    display: flex;
    width: inherit;
    flex-wrap: wrap;
  }

  .cell {
    display: flex;
    align-items: center;
    justify-content: center;
    width: auto;
    height: var(--vdp-cell-size);
    border: 1px solid transparent;
    padding: 0;
    z-index: 1;

    &.day {
      border-radius: var(--vdp-cell-border-radius-square);
      width: var(--vdp-cell-size);
    }

    &.month {
      border-radius: var(--vdp-cell-border-radius-rectangle);
    }

    &.year {
      border-radius: var(--vdp-cell-border-radius-rectangle);
    }

    &.selected {
      background: var(--vdp-color-theme);
      color: var(--vdp-color-selected);

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

    &.day-header {
      width: var(--vdp-cell-size);
      font-size: var(--vdp-font-size-day-header);
      white-space: nowrap;
      cursor: inherit;
    }

    > span {
      line-height: 1;
    }
  }
}

.vdp-datepicker__header {
  background: var(--vdp-color-header-bg);
  display: grid;
  grid-template-columns: auto 1fr auto;
  gap: var(--vdp-header-gap);
  padding: var(--vdp-header-gap);
  min-width: 0;

  > :nth-child(2) {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: var(--vdp-cell-border-radius-rectangle);
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
    min-height: var(--vdp-cell-size);
    border-radius: var(--vdp-cell-border-radius-square);

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

.vdp-datepicker__pick-buttons--day {
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: var(--vdp-cell-gap);
  padding: var(--vdp-cell-gap);
  position: relative;
  min-width: 0;
}

.vdp-datepicker__pick-buttons--month,
.vdp-datepicker__pick-buttons--year {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--vdp-cell-gap);
  padding: var(--vdp-cell-gap);
  min-width: 0;
}

.vdp-datepicker__day-header-background {
  position: absolute;
  pointer-events: none;
  user-select: none;
  top: var(--vdp-cell-gap);
  left: var(--vdp-cell-gap);
  width: calc(100% - var(--vdp-cell-gap) * 2);
  height: calc(var(--vdp-cell-size));
}

.vdp-datepicker__container .cell:not(.blank):not(.disabled).day,
.vdp-datepicker__container .cell:not(.blank):not(.disabled).month,
.vdp-datepicker__container .cell:not(.blank):not(.disabled).year {
  cursor: pointer;
}

.vdp-datepicker__container .cell:not(.blank):not(.disabled).day:hover,
.vdp-datepicker__container .cell:not(.blank):not(.disabled).month:hover,
.vdp-datepicker__container .cell:not(.blank):not(.disabled).year:hover {
  border-color: var(--vdp-color-theme);
}
</style>
