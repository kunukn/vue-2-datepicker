<template>
  <main id="app">
    <h1>Vue 2 DatePicker Examples</h1>
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
      <h3>Custom day headline formatter using Intl Browser API</h3>
      <date-picker
        minimumView="day"
        maximumView="day"
        :headlineDayFormatter="intlDayFormatter"
        :daysCustomDisplay="['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa']"
      ></date-picker>
      <pre>
function intlDayFormatter(payload) {
  let date = payload.pageDate
  let options = {
    month: 'long',
    year: 'numeric',
  }
  return new Intl.DateTimeFormat('es-ES', options).format(date)
}</pre
      >
      <code>
        &lt;date-picker minimumView="day" maximumView="day"
        :headlineDayFormatter="intlDayFormatter"
        :daysCustomDisplay="['Do','Lu','Ma','Mi','Ju','Vi','Sa']"&gt;&lt;/date-picker&gt;
      </code>
    </div>

    <div class="example">
      <h3>Typeable datepicker</h3>
      <date-picker placeholder="Type or select date" typeable />
      <code>
        &lt;date-picker placeholder="Type or select date"
        typeable&gt;&lt;/date-picker&gt;
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
      <code>
        &lt;date-picker :disabled="disabled"&gt;&lt;/date-picker&gt;
      </code>
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
      <h3>Fantasy language datepicker</h3>
      <date-picker :language="fantasyLanguage"></date-picker>
      <pre>
import { Language } from '@kunukn/vue-2-datepicker';
let fantasyLanguage = new Language(theLangObject);
      </pre>
      <code>
        &lt;date-picker :language="fantasyLanguage"&gt;&lt;/date-picker&gt;
      </code>
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

    <div class="example">
      <h3>Roman numbers custom formatters</h3>
      <date-picker
        inline
        :dayFormatter="(value, index) => convertToRoman(index + 1)"
        :monthFormatter="(value, index) => convertToRoman(index + 1)"
        :yearFormatter="(value) => convertToRoman(value)"
        :headlineYearFormatter="
          ({ getPageDecade }) => convertToRoman(getPageDecade)
        "
      />
      <pre>
inline
:dayFormatter="(value, index) => convertToRoman(index + 1)"
:monthFormatter="(value, index) => convertToRoman(index + 1)"
:yearFormatter="(value) => convertToRoman(value)"
:headlineYearFormatter=" ({ getPageDecade }) => convertToRoman(getPageDecade)"</pre
      >
      <code> &lt;date-picker inline ...&gt;&lt;/date-picker&gt; </code>
    </div>
  </main>
</template>

<script>
import { DatePicker, Language } from './lib/main.js'
import * as lang from './locale/all.js'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
let fantasyLanguage = new Language(
  'Fantasy',
  [
    'Frostfall',
    'Moonrise',
    'Suncrest',
    'Stormwatch',
    'Starfall',
    'Nightshade',
    'Firebloom',
    'Leafsong',
    'Thundermoon',
    'Mistborn',
    'Shadowweave',
    'Winterveil',
  ],
  null, // implicit month abbreviations
  ['Sun', 'Moo', 'Sta', 'Sha', 'Fir', 'Win', 'Ear']
)

const state = {
  date1: new Date(),
}

import './assets/demo.scss'

export default {
  name: 'Demo',
  components: {
    DatePicker,
  },
  data() {
    return {
      fantasyLanguage,
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
      convertToRoman,
    }
  },
  computed: {
    getInputStyle() {
      return this.styleInput
    },
  },
  async created() {
    // let isoLanguage = 'es'
    // let langObject = await import(`./locale/translations/${isoLanguage}.js`)
    // let newLang = langObject.default || langObject
    // if (newLang) {
    //   console.log('async loading language works', newLang)
    // }
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
    intlDayFormatter(payload) {
      let date = payload.pageDate

      if (typeof Intl) {
        let options = {
          month: 'long',
          year: 'numeric',
        }
        return new Intl.DateTimeFormat('es-ES', options).format(date)
      }

      return date.toLocaleDateString()
    },
  },
}

function convertToRoman(input) {
  if (typeof input === 'string' && input.includes('-')) {
    let a = +input.split('-')[0].trim()
    let b = +input.split('-')[1].trim()

    return `${convertToRoman(a)} - ${convertToRoman(b)}`
  }

  let num = +input

  let roman = {
    M: 1000,
    CM: 900,
    D: 500,
    CD: 400,
    C: 100,
    XC: 90,
    L: 50,
    XL: 40,
    X: 10,
    IX: 9,
    V: 5,
    IV: 4,
    I: 1,
  }
  let str = ''

  for (let i of Object.keys(roman)) {
    let q = Math.floor(num / roman[i])
    num -= q * roman[i]
    str += i.repeat(q)
  }

  return str
}
</script>
