<template>
  <div
    v-show="showYearView"
    class="vdp-datepicker__calendar vdp-datepicker__calendar--year"
    :class="[calendarClass]"
    
    @mousedown.prevent
  >
    <slot name="beforeCalendarHeader"></slot>
    <header class="vdp-datepicker__header">
      <button
        type="button"
        aria-label="<"
        class="prev"
        :class="{ disabled: isLeftNavDisabled }"
        @click="isRtl ? nextDecade() : previousDecade()"
      >
        <slot name="prevButton" />
      </button>
      <p v-if="headlineYearFormatter" class="custom-formatted page-decade">
        {{ headlineYearFormatter({ pageDate, selectDate, getPageDecade }) }}
      </p>
      <p v-else class="page-decade">{{ getPageDecade }}</p>
      <button
        type="button"
        aria-label=">"
        class="next"
        :class="{ disabled: isRightNavDisabled }"
        @click="isRtl ? previousDecade() : nextDecade()"
      >
        <slot name="nextButton" />
      </button>
    </header>
    <div
      class="vdp-datepicker__pick-buttons vdp-datepicker__pick-buttons--year"
    >
      <button
        v-for="year in years"
        :key="year.timestamp"
        type="button"
        class="cell year"
        :class="{ selected: year.isSelected, disabled: year.isDisabled }"
        @click.stop="selectYear(year)"
      >
        <span>{{ format(year.year) }}</span>
      </button>
    </div>
  </div>
</template>
<script>
import { makeDateUtils } from '../utils/DateUtils'
export default {
  props: {
    formatter: Function,
    headlineYearFormatter: Function,
    showYearView: Boolean,
    selectedDate: Date,
    pageDate: Date,
    pageTimestamp: Number,
    disabledDates: Object,
    highlighted: Object,
    calendarClass: [String, Object, Array],
    translation: Object,
    isRtl: Boolean,
    allowedToShowView: Function,
    useUtc: Boolean,
  },
  data() {
    const constructedDateUtils = makeDateUtils(this.useUtc)
    return {
      utils: constructedDateUtils,
    }
  },
  computed: {
    years() {
      const d = this.pageDate
      let years = []
      // set up a new date object to the beginning of the current 'page'7
      let dObj = this.useUtc
        ? new Date(
            Date.UTC(
              Math.floor(d.getUTCFullYear() / 10) * 10,
              d.getUTCMonth(),
              d.getUTCDate()
            )
          )
        : new Date(
            Math.floor(d.getFullYear() / 10) * 10,
            d.getMonth(),
            d.getDate(),
            d.getHours(),
            d.getMinutes()
          )
      for (let i = 0; i < 10; i++) {
        years.push({
          year: this.utils.getFullYear(dObj),
          timestamp: dObj.getTime(),
          isSelected: this.isSelectedYear(dObj),
          isDisabled: this.isDisabledYear(dObj),
        })
        this.utils.setFullYear(dObj, this.utils.getFullYear(dObj) + 1)
      }
      return years
    },
    /**
     * @return {String}
     */
    getPageDecade() {
      const decadeStart =
        Math.floor(this.utils.getFullYear(this.pageDate) / 10) * 10
      const decadeEnd = decadeStart + 9
      const yearSuffix = this.translation.yearSuffix
      return `${decadeStart} - ${decadeEnd}${yearSuffix}`
    },
    /**
     * Is the left hand navigation button disabled?
     * @return {Boolean}
     */
    isLeftNavDisabled() {
      return this.isRtl
        ? this.isNextDecadeDisabled(this.pageTimestamp)
        : this.isPreviousDecadeDisabled(this.pageTimestamp)
    },
    /**
     * Is the right hand navigation button disabled?
     * @return {Boolean}
     */
    isRightNavDisabled() {
      return this.isRtl
        ? this.isPreviousDecadeDisabled(this.pageTimestamp)
        : this.isNextDecadeDisabled(this.pageTimestamp)
    },
  },
  methods: {
    format(value) {
      if (this.formatter) {
        return this.formatter(value)
      }

      return value
    },
    selectYear(year) {
      if (year.isDisabled) {
        return false
      }
      this.$emit('selectYear', year)
    },
    changeYear(incrementBy) {
      let date = this.pageDate
      this.utils.setFullYear(date, this.utils.getFullYear(date) + incrementBy)
      this.$emit('changedDecade', date)
    },
    previousDecade() {
      if (this.isPreviousDecadeDisabled()) {
        return false
      }
      this.changeYear(-10)
    },
    isPreviousDecadeDisabled() {
      if (!this.disabledDates || !this.disabledDates.to) {
        return false
      }
      const disabledYear = this.utils.getFullYear(this.disabledDates.to)
      const lastYearInPreviousPage =
        Math.floor(this.utils.getFullYear(this.pageDate) / 10) * 10 - 1
      return disabledYear > lastYearInPreviousPage
    },
    nextDecade() {
      if (this.isNextDecadeDisabled()) {
        return false
      }
      this.changeYear(10)
    },
    isNextDecadeDisabled() {
      if (!this.disabledDates || !this.disabledDates.from) {
        return false
      }
      const disabledYear = this.utils.getFullYear(this.disabledDates.from)
      const firstYearInNextPage =
        Math.ceil(this.utils.getFullYear(this.pageDate) / 10) * 10
      return disabledYear < firstYearInNextPage
    },

    /**
     * Whether the selected date is in this year
     * @param {Date}
     * @return {Boolean}
     */
    isSelectedYear(date) {
      return (
        this.selectedDate &&
        this.utils.getFullYear(this.selectedDate) ===
          this.utils.getFullYear(date)
      )
    },
    /**
     * Whether a year is disabled
     * @param {Date}
     * @return {Boolean}
     */
    isDisabledYear(date) {
      let disabledDates = false
      if (typeof this.disabledDates === 'undefined' || !this.disabledDates) {
        return false
      }

      if (
        typeof this.disabledDates.to !== 'undefined' &&
        this.disabledDates.to
      ) {
        if (
          this.utils.getFullYear(date) <
          this.utils.getFullYear(this.disabledDates.to)
        ) {
          disabledDates = true
        }
      }
      if (
        typeof this.disabledDates.from !== 'undefined' &&
        this.disabledDates.from
      ) {
        if (
          this.utils.getFullYear(date) >
          this.utils.getFullYear(this.disabledDates.from)
        ) {
          disabledDates = true
        }
      }

      if (
        typeof this.disabledDates.customPredictor === 'function' &&
        this.disabledDates.customPredictor(date)
      ) {
        disabledDates = true
      }

      return disabledDates
    },
  },
}
</script>

<style lang="scss"></style>
