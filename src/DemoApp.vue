<template>
  <div id="app">
    <h1>Datepicker Examples</h1>
    <h2 class="mb-4">Keyboard navigation supported by using tabs and enter.</h2>

    <div class="example">
      <h3>Inline datepicker, UTC, Monday first, min-height</h3>
      <date-picker inline useUtc mondayFirst ensureMinHeight></date-picker>
      <code>
        &lt;date-picker inline useUtc mondayFirst
        ensureMinHeight&gt;&lt;/date-picker&gt;
      </code>
    </div>

    <div class="example">
      <h3>Default datepicker...</h3>
      <date-picker placeholder="Select Date" />
      <code>
        &lt;date-picker placeholder="Select Date"&gt;&lt;/date-picker&gt;
      </code>
    </div>

    <div class="example">
      <h3>Custom day label formatter</h3>
      <date-picker
        placeholder="Select Date"
        :dayFormatter="(value, index) => `${(value || '').slice(0, 2)}${index}`"
      />
      <code>
        &lt;date-picker placeholder="Select Date" :dayFormatter="(value, index)
        =&gt; `${(value || '').slice(0, 2)}${index}`"&gt;&lt;/date-picker&gt;
      </code>
    </div>

    <div class="example">
      <h3>Typeable datepicker</h3>
      <date-picker placeholder="Type or select date" :typeable="true" />
      <code>
        &lt;date-picker placeholder="Type or select date"
        :typeable="true"&gt;&lt;/date-picker&gt;
      </code>
    </div>

    <div class="example">
      <h3>Bootstrap styled datepicker</h3>
      <date-picker bootstrapStyling calendarButton clearButton> </date-picker>
      <code>
        &lt;date-picker placeholder="Select Date"&gt;&lt;/date-picker&gt;
      </code>
    </div>

    <div class="example">
      <h3>v-model datepicker</h3>
      <date-picker
        v-model="vModelExample"
        placeholder="Select Date"
      ></date-picker>
      <code>
        &lt;date-picker placeholder="Select Date"
        v-model="vmodelexample"&gt;&lt;/date-picker&gt;
      </code>
      <hr />
      <p>{{ vModelExample }}</p>
    </div>

    <div class="example">
      <h3>Force day label display</h3>
      <date-picker
        :daysCustomDisplay="['😖', '😏', '😌', '😊', '😜', '😝', '🥴']"
      ></date-picker>
      <code>
        &lt;date-picker :daysCustomDisplay="['😖', '😏', '😌', '😊', '😜', '😝',
        '🥴']"&gt;&lt;/date-picker&gt;
      </code>
    </div>

    <div class="example">
      <h3>Slots</h3>
      <date-picker>
        <template #prevButton> 👈 </template>
        <template #nextButton> 👉 </template>
      </date-picker>
      <code>
        &lt;date-picker&gt; &lt;template #prevButton&gt; 👈 &lt;/template&gt;
        &lt;template #nextButton&gt; 👉 &lt;/template&gt; &lt;/date-picker&gt;
      </code>
    </div>

    <div class="example">
      <h3>Format datepicker</h3>
      <date-picker :format="format"></date-picker>
      <code> &lt;date-picker :format="format"&gt;&lt;/date-picker&gt; </code>
      <div class="settings">
        <h5>Settings</h5>
        <div class="form-group">
          <label>Format</label>
          <select v-model="format">
            <option value="d MMM yyyy" selected>
              d MMM yyyy - e.g 12 Feb 2016
            </option>
            <option value="d MMMM yyyy">
              d MMMM yyyy - e.g 12 February 2016
            </option>
            <option value="yyyy-MM-dd">yyyy-MM-dd - e.g 2016-02-12</option>
            <option value="dsu MMM yyyy">
              dsu MMM yyyy - e.g 12th Feb 2016
            </option>
            <option value="D dsu MMM yyyy">
              D dsu MMM yyyy - e.g Sat 12th Feb 2016
            </option>
          </select>
        </div>
      </div>
    </div>

    <div class="example">
      <h3>With minimum and maximum date range</h3>
      <date-picker :disabledDates="disabledDates"></date-picker>
      <code>
        &lt;date-picker :disabledDates="disabledDates"&gt;&lt;/date-picker&gt;
      </code>
      <div class="settings">
        <h5>Settings</h5>
        <div class="form-group">
          <label>Disabled to:</label>
          <date-picker @selected="disableTo"></date-picker>
        </div>
        <div class="form-group">
          <label>Disabled from:</label>
          <date-picker @selected="disableFrom"></date-picker>
        </div>
        <div class="form-group">
          <label>Disabled Days of Month:</label>
          <input
            type="text"
            value=""
            placeholder="5,6,12,13"
            @change="setDisabledDays"
          />
        </div>
        <pre>disabled: {{ disabledDates }}</pre>

        <h5>Resulting Date picker</h5>
        <date-picker :disabledDates="disabledDates"></date-picker>
      </div>
    </div>

    <div class="example">
      <div class="settings">
        <h5>Settings</h5>
        <div class="form-group">
          <label>Disabled Function:</label>
        </div>
        <pre>
          disabledDates: {
            customPredictor: function (date) {
              // disables every day of a month which is a multiple of 3
              if (date.getDate() % 3 === 0) {
                return true
              }
            }
          }
        </pre>
        <h5>Resulting Date picker</h5>
        <date-picker :disabledDates="disabledFn"></date-picker>
      </div>
    </div>

    <div class="example">
      <h3>Highlighting Dates Matching Given Function</h3>
      <date-picker :highlighted="highlighted"></date-picker>
      <code>
        &lt;date-picker :highlighted="highlighted"&gt;&lt;/date-picker&gt;
      </code>
      <div class="settings">
        <h5>Settings</h5>
        <pre>
          highlighted: {
            customPredictor: function (date) {
              // highlights every day of a month which is a multiple of 4
              if (date.getDate() % 4 === 0) {
                return true
              }
            }
          }
        </pre>

        <h5>Resulting Date picker</h5>
        <date-picker :highlighted="highlightedFn"></date-picker>
      </div>
    </div>

    <div class="example">
      <h3>Highlighting Dates</h3>
      <code>
        &lt;date-picker :highlighted="highlighted"&gt;&lt;/date-picker&gt;
      </code>
      <div class="settings">
        <h5>Settings</h5>
        <div class="form-group">
          <label>Highlight from:</label>
          <date-picker @selected="highlightFrom"></date-picker>
        </div>
        <div class="form-group">
          <label>Highlight to:</label>
          <date-picker @selected="highlightTo"></date-picker>
        </div>
        <div class="form-group">
          <label>Highlight Days of Month:</label>
          <input type="text" value="" @change="setHighlightedDays" />
        </div>
        <pre>highlighted: {{ highlighted }}</pre>

        <h5>Resulting Date picker</h5>
        <date-picker :highlighted="highlighted"></date-picker>
      </div>
    </div>

    <div class="example">
      <h3>With default open date</h3>
      <date-picker :open-date="openDate"></date-picker>
      <code> &lt;date-picker :disabled="disabled"&gt;&lt;/date-picker&gt; </code>
      <div class="settings">
        <h5>Settings</h5>
        <div class="form-group">
          <label>Open date:</label>
          <date-picker v-model="openDate"></date-picker>
        </div>
        <pre>openDate: {{ openDate }}</pre>
      </div>
    </div>

    <div class="example">
      <h3>Translations</h3>
      <h5>{{ languages[language].language }} datepicker</h5>

      <date-picker
        :language="languages[language]"
        format="d MMMM yyyy"
      ></date-picker>
      <code>
        &lt;date-picker :language="languages.{{
          language
        }}"&gt;&lt;/date-picker&gt;
      </code>
      <div class="settings">
        <h5>Settings</h5>
        <select v-model="language">
          <option v-for="(l, index) in languages" :key="index" :value="index">
            {{ l.language }}
          </option>
        </select>
      </div>
    </div>

    <div class="example">
      <h3>RTL datepicker</h3>
      <date-picker :language="languages.he"></date-picker>
      <code>
        &lt;date-picker :language="languages.he"&gt;&lt;/date-picker&gt;
      </code>
    </div>

    <div class="example">
      <h3>RTL datepicker English</h3>
      <date-picker useRtl :language="languages.en"></date-picker>
      <code>
        &lt;date-picker useRtl :language="languages.en"&gt;&lt;/date-picker&gt;
      </code>
    </div>

    <div class="example">
      <h3>Day view only</h3>
      <date-picker minimumView="day" maximumView="day"></date-picker>
      <code>
        &lt;date-picker minimumView="day"
        maximumView="day"&gt;&lt;/date-picker&gt;
      </code>
    </div>

    <div class="example">
      <h3>Day view only RTL</h3>
      <date-picker
        minimumView="day"
        maximumView="day"
        :language="languages.he"
      ></date-picker>
      <code>
        &lt;date-picker minimumView="day" maximumView="day"
        language="languages.he"&gt;&lt;/date-picker&gt;
      </code>
    </div>

    <div class="example">
      <h3>Month view only</h3>
      <date-picker minimumView="month" maximumView="month"></date-picker>
      <code>
        &lt;date-picker minimumView="month"
        maximumView="month"&gt;&lt;/date-picker&gt;
      </code>
    </div>

    <div class="example">
      <h3>Force month label display</h3>
      <date-picker
        minimumView="month"
        maximumView="month"
        :monthsCustomDisplay="[
          'Jany',
          'Febry',
          'Marty',
          'Apryl',
          'May',
          'Juny',
          'Jylu',
          'Augy',
          'Septy',
          'Octy',
          'Novy',
          'Decy',
        ]"
      ></date-picker>
      <code>
        &lt;date-picker inline minimumView="month" maximumView="month"
        :monthsCustomDisplay="[ 'Jany', 'Febry', 'Marty', 'Apryl', 'May',
        'Juny', 'Jylu', 'Augy', 'Septy', 'Octy', 'Novy', 'Decy'
        ]"&gt;&lt;/date-picker&gt;
      </code>
    </div>

    <div class="example">
      <h3>Custom month label formatter</h3>
      <date-picker
        minimumView="month"
        maximumView="month"
        :monthFormatter="
          (value, index) => `${(value || '').slice(0, 2)}${index}`
        "
      ></date-picker>
      <code>
        &lt;date-picker inline minimumView="month" maximumView="month"
        :monthFormatter=" (value, index) =&gt; `${(value || '').slice(0,
        2)}${index}` "&gt;&lt;/date-picker&gt;
      </code>
    </div>

    <div class="example">
      <h3>Day and month view only</h3>
      <date-picker
        minimumView="day"
        maximumView="month"
        initialView="month"
      ></date-picker>
      <code>
        &lt;date-picker minimumView="day" maximumView="month"
        initialView="month"&gt;&lt;/date-picker&gt;
      </code>
    </div>

    <div class="example">
      <h3>Year and month view only</h3>
      <date-picker
        minimumView="month"
        maximumView="year"
        initialView="year"
      ></date-picker>
      <code>
        &lt;date-picker minimumView="month" maximumView="year"
        initialView="year"&gt;&lt;/date-picker&gt;
      </code>
    </div>
  </div>
</template>

<script>
import { DatePicker, Language } from './lib/main.js'
import * as lang from './locale/all.js'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let en = new Language(
  'English',
  [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ],
  [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ],
  ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
)

const state = {
  date1: new Date(),
}

export default {
  name: 'Demo',
  components: {
    DatePicker,
  },
  data() {
    return {
      styleInput: null,
      format: 'd MMMM yyyy',
      disabledDates: {},
      openDate: null,
      disabledFn: {
        customPredictor(date) {
          if (date.getDate() % 3 === 0) {
            return true
          }
        },
      },
      highlightedFn: {
        customPredictor(date) {
          if (date.getDate() % 4 === 0) {
            return true
          }
        },
      },
      highlighted: {},
      eventMsg: null,
      state,
      vModelExample: null,
      languages: lang,
      language: 'en',
    }
  },
  computed: {
    getInputStyle() {
      return this.styleInput
    },
  },
  methods: {
    highlightTo(val) {
      if (typeof this.highlighted.to === 'undefined') {
        this.highlighted = {
          to: null,
          daysOfMonth: this.highlighted.daysOfMonth,
          from: this.highlighted.from,
        }
      }
      this.highlighted.to = val
    },
    highlightFrom(val) {
      if (typeof this.highlighted.from === 'undefined') {
        this.highlighted = {
          to: this.highlighted.to,
          daysOfMonth: this.highlighted.daysOfMonth,
          from: null,
        }
      }
      this.highlighted.from = val
    },
    setHighlightedDays(elem) {
      if (elem.target.value === 'undefined') {
        return
      }
      let highlightedDays = elem.target.value
        .split(',')
        .map((day) => parseInt(day, 10))
      this.highlighted = {
        from: this.highlighted.from,
        to: this.highlighted.to,
        daysOfMonth: highlightedDays,
      }
    },
    setDisabledDays(elem) {
      if (elem.target.value === 'undefined') {
        return
      }
      let disabledDays = elem.target.value
        .split(',')
        .map((day) => parseInt(day, 10))
      this.disabledDates = {
        from: this.disabledDates.from,
        to: this.disabledDates.to,
        daysOfMonth: disabledDays,
      }
    },
    disableTo(val) {
      if (typeof this.disabledDates.to === 'undefined') {
        this.disabledDates = {
          to: null,
          daysOfMonth: this.disabledDates.daysOfMonth,
          from: this.disabledDates.from,
        }
      }
      this.disabledDates.to = val
    },
    disableFrom(val) {
      if (typeof this.disabledDates.from === 'undefined') {
        this.disabledDates = {
          to: this.disabledDates.to,
          daysOfMonth: this.disabledDates.daysOfMonth,
          from: null,
        }
      }
      this.disabledDates.from = val
    },
  },
}
</script>

<style lang="scss">
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css';

*,
::before,
::after {
  box-sizing: border-box;
}

html {
  font-size: 100%;
  height: 100%;
}

body {
  min-height: 100%;
  font-family: 'Helvetica Neue Light', Helvetica, sans-serif;
  position: relative;
  padding: 0.5rem 0.5rem 6rem;

  @media (min-width: 500px) {
    padding: 1rem 1rem 6rem;
  }
}

input,
select {
  padding: 0.75rem 0.5rem;
  font-size: 100%;
  border: 1px solid #ccc;
  width: 100%;
}

.example {
  background: #fcfcfc;
  border: 1px solid #eee;
  padding: 0 0 1rem;
  margin-bottom: 2rem;

  @media (min-width: 400px) {
    padding: 0 1rem 1rem;
  }
}

code,
pre {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #bbb;
  display: block;
  background: #eee;
  border-radius: 3px;
}

.settings {
  margin: 2rem 0;
  border-top: 1px solid #bbb;
  background: #eee;
}

h5 {
  font-size: 100%;
  padding: 0;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  font-size: 16px;
  display: block;
}

.mb-4 {
  margin-block-end: 4rem;
}
</style>
