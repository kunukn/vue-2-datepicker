<template>
  <div id="app">
    <h1>Datepicker Examples</h1>

    <div class="example">
      <h3>Inline datepicker, UTC and Monday first</h3>
      <vue-datepicker
        :inline="true"
        :use-utc="true"
        :monday-first="true"
      ></vue-datepicker>
      <code> &lt;datepicker :inline="true"&gt;&lt;/datepicker&gt; </code>
    </div>

    <div class="example">
      <h3>Default datepicker...</h3>
      <vue-datepicker placeholder="Select Date" />
      <code>
        &lt;datepicker placeholder="Select Date"&gt;&lt;/datepicker&gt;
      </code>
    </div>

    <div class="example">
      <h3>Typeable datepicker</h3>
      <vue-datepicker placeholder="Type or select date" :typeable="true" />
      <code>
        &lt;datepicker placeholder="Type or select date"
        :typeable="true"&gt;&lt;/datepicker&gt;
      </code>
    </div>

    <div class="example">
      <h3>Bootstrap styled datepicker</h3>
      <vue-datepicker
        :bootstrapStyling="true"
        :calendarButton="true"
        :clearButton="true"
      >
      </vue-datepicker>
      <code>
        &lt;datepicker placeholder="Select Date"&gt;&lt;/datepicker&gt;
      </code>
    </div>

    <div class="example">
      <h3>v-model datepicker</h3>
      <vue-datepicker
        placeholder="Select Date"
        v-model="vModelExample"
      ></vue-datepicker>
      <code>
        &lt;datepicker placeholder="Select Date"
        v-model="vmodelexample"&gt;&lt;/datepicker&gt;
      </code>
      <hr />
      <p>{{ vModelExample }}</p>
    </div>

    <div class="example">
      <h3>Format datepicker</h3>
      <vue-datepicker :format="format"></vue-datepicker>
      <code> &lt;datepicker :format="format"&gt;&lt;/datepicker&gt; </code>
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
      <vue-datepicker :disabledDates="disabledDates"></vue-datepicker>
      <code>
        &lt;datepicker :disabledDates="disabledDates"&gt;&lt;/datepicker&gt;
      </code>
      <div class="settings">
        <h5>Settings</h5>
        <div class="form-group">
          <label>Disabled to:</label>
          <vue-datepicker v-on:selected="disableTo"></vue-datepicker>
        </div>
        <div class="form-group">
          <label>Disabled from:</label>
          <vue-datepicker v-on:selected="disableFrom"></vue-datepicker>
        </div>
        <div class="form-group">
          <label>Disabled Days of Month:</label>
          <input
            type="text"
            value=""
            v-on:change="setDisabledDays"
            placeholder="5,6,12,13"
          />
        </div>
        <pre>disabled: {{ disabledDates }}</pre>

        <h5>Resulting Date picker</h5>
        <vue-datepicker :disabledDates="disabledDates"></vue-datepicker>
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
        <vue-datepicker :disabledDates="disabledFn"></vue-datepicker>
      </div>
    </div>

    <div class="example">
      <h3>Highlighting Dates Matching Given Function</h3>
      <vue-datepicker :highlighted="highlighted"></vue-datepicker>
      <code>
        &lt;datepicker :highlighted="highlighted"&gt;&lt;/datepicker&gt;
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
        <vue-datepicker :highlighted="highlightedFn"></vue-datepicker>
      </div>
    </div>

    <div class="example">
      <h3>Highlighting Dates</h3>
      <code>
        &lt;datepicker :highlighted="highlighted"&gt;&lt;/datepicker&gt;
      </code>
      <div class="settings">
        <h5>Settings</h5>
        <div class="form-group">
          <label>Highlight from:</label>
          <vue-datepicker v-on:selected="highlightFrom"></vue-datepicker>
        </div>
        <div class="form-group">
          <label>Highlight to:</label>
          <vue-datepicker v-on:selected="highlightTo"></vue-datepicker>
        </div>
        <div class="form-group">
          <label>Highlight Days of Month:</label>
          <input type="text" value="" v-on:change="setHighlightedDays" />
        </div>
        <pre>highlighted: {{ highlighted }}</pre>

        <h5>Resulting Date picker</h5>
        <vue-datepicker :highlighted="highlighted"></vue-datepicker>
      </div>
    </div>

    <div class="example">
      <h3>With default open date</h3>
      <vue-datepicker :open-date="openDate"></vue-datepicker>
      <code> &lt;datepicker :disabled="disabled"&gt;&lt;/datepicker&gt; </code>
      <div class="settings">
        <h5>Settings</h5>
        <div class="form-group">
          <label>Open date:</label>
          <vue-datepicker v-model="openDate"></vue-datepicker>
        </div>
        <pre>openDate: {{ openDate }}</pre>
      </div>
    </div>

    <div class="example">
      <h3>Translations</h3>
      <h5>{{ languages[language].language }} datepicker</h5>

      <vue-datepicker
        :language="languages[language]"
        format="d MMMM yyyy"
      ></vue-datepicker>
      <code>
        &lt;datepicker :language="languages.{{
          language
        }}"&gt;&lt;/datepicker&gt;
      </code>
      <div class="settings">
        <h5>Settings</h5>
        <select v-model="language">
          <option :value="key" v-for="(language, key) in languages" :key="key">
            {{ language.language }}
          </option>
        </select>
      </div>
    </div>

    <div class="example">
      <h3>RTL datepicker</h3>
      <vue-datepicker :language="languages.he"></vue-datepicker>
      <code>
        &lt;datepicker :language="languages.he"&gt;&lt;/datepicker&gt;
      </code>
    </div>

    <div class="example">
      <h3>Day view only</h3>
      <vue-datepicker
        :minimumView="'day'"
        :maximumView="'day'"
      ></vue-datepicker>
      <code>
        &lt;datepicker :minimumView="'day'"
        :maximumView="'day'"&gt;&lt;/datepicker&gt;
      </code>
    </div>

    <div class="example">
      <h3>Day view only RTL</h3>
      <vue-datepicker
        :minimumView="'day'"
        :maximumView="'day'"
        :language="languages.he"
      ></vue-datepicker>
      <code>
        &lt;datepicker :minimumView="'day'" :maximumView="'day'"
        language="languages.he"&gt;&lt;/datepicker&gt;
      </code>
    </div>

    <div class="example">
      <h3>Month view only</h3>
      <vue-datepicker
        :minimumView="'month'"
        :maximumView="'month'"
      ></vue-datepicker>
      <code>
        &lt;datepicker :minimumView="'month'"
        :maximumView="'month'"&gt;&lt;/datepicker&gt;
      </code>
    </div>

    <div class="example">
      <h3>Day and month view only</h3>
      <vue-datepicker
        :minimumView="'day'"
        :maximumView="'month'"
        :initialView="'month'"
      ></vue-datepicker>
      <code>
        &lt;datepicker :minimumView="'day'" :maximumView="'month'"
        :initialView="'month'"&gt;&lt;/datepicker&gt;
      </code>
    </div>

    <div class="example">
      <h3>Year and month view only</h3>
      <vue-datepicker
        :minimumView="'month'"
        :maximumView="'year'"
        :initialView="'year'"
      ></vue-datepicker>
      <code>
        &lt;datepicker :minimumView="'month'" :maximumView="'year'"
        :initialView="'year'"&gt;&lt;/datepicker&gt;
      </code>
    </div>
  </div>
</template>

<script>
import VueDatepicker from './components/Datepicker.vue'
import * as lang from './locale/all.js'

const state = {
  date1: new Date(),
}

export default {
  name: 'demo',
  components: {
    VueDatepicker,
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
      state: state,
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
        .map((day) => parseInt(day))
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
        .map((day) => parseInt(day))
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

<style>
@import url('https://cdn.jsdelivr.net/npm/bootstrap@4.6.2/dist/css/bootstrap.min.css');
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
  font-family: 'Helvetica Neue Light', Helvetica, sans-serif;
  padding: 1rem 2rem 2rem;
  min-height: 100%;
  position: relative;
}
input,
select {
  padding: 0.75rem 0.5rem;
  font-size: 100%;
  border: 1px solid #ccc;
  width: 100%;
}

select {
}

.example {
  background: #f2f2f2;
  border: 1px solid #ddd;
  padding: 0rem 1rem 1rem;
  margin-bottom: 2rem;
}

code,
pre {
  margin: 1rem 0;
  padding: 1rem;
  border: 1px solid #bbb;
  display: block;
  background: #ddd;
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
</style>
