# Vue 2 Datepicker

[![npm version](https://img.shields.io/npm/v/vue-2-datepicker.svg?style=flat-square)](https://www.npmjs.com/package/vue-2-datepicker)
[![npm downloads](https://img.shields.io/npm/dm/vue-2-datepicker.svg?style=flat-square)](https://www.npmjs.com/package/vue-2-datepicker)
[![gzip](https://img.shields.io/bundlephobia/minzip/vue-2-datepicker.svg)](https://bundlephobia.com/result?p=vue-2-datepicker)
[![license](https://img.shields.io/github/license/kunukn/vue-2-datepicker.svg)](https://github.com/kunukn/vue-2-datepicker/blob/master/LICENSE)

A datepicker Vue component. Compatible with Vue 2.x

- [Demo](#demo)
- [Install](#install)
- [Usage](#usage)
- [Date Formatting](#date-formatting)
- [Props](#available-props)
- [Events](#events)
- [Disabled dates](#disabled-dates)
- [Highlighted dates](#highlighted-dates)
- [Translations](#translations)

## Demo

To view a demo online:

<table style="border-spacing: 16px;border-collapse: separate;">

<tr>
<td>Codesandbox Vue 2</td>
<td><img width="24" height="24" src="ui-library-logo/Vue-logo.svg"/></td>
<td><a href="https://d9xtk7.csb.app/" target="_blank">View</a></td>
<td><a href="https://codesandbox.io/s/vue-2-datepicker-demo-d9xtk7" target="_blank">Edit</a></td>
</tr>

</table>

To view demo examples locally clone the repo and run

```bash
npm install vue-2-datepicker
// or yarn install -D vue-2-datepicker
```

```js
import VueDatepicker from 'vue-2-datepicker'

export default {
  // ...
  components: {
    VueDatepicker,
  },
  // ...
}
```

Or use directly from a CDN

```vue
<div id="app">
  <vue-datepicker></vue-datepicker>
</div>
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-2-datepicker"></script>
<script>
const app = new Vue({
  el: '#app',
  components: {
    vueDatepicker,
  },
})
</script>

<!-- French language example -->
<div id="app">
  <VueDatepicker :language="fr" />
</div>
<script src="https://unpkg.com/vue"></script>
<script src="https://unpkg.com/vue-2-datepicker"></script>
<script src="https://unpkg.com/vue-2-datepicker/dist/locale/translations/fr.js"></script>
<script>
const app = new Vue({
  el: '#app',
  data() {
    return {
      fr: vdp_translation_fr.js,
    }
  },
  components: {
    VueDatepicker,
  },
})
</script>
```

## Usage

```vue
<VueDatepicker />
```

_value_ prop if passed should be a Date object

```vue
<script>
let state = {
  date: new Date(2023, 6, 24),
}
</script>
<VueDatepicker :value="state.date" />
```

support name attribute for normal html form submission

```vue
<VueDatepicker :value="state.date" name="uniquename" />
```

Using `v-model`

```vue
<VueDatepicker v-model="state.date" name="uniquename" />
```

Emits events

```vue
<VueDatepicker
  @selected="doSomethingInParentComponentFunction"
  @opened="datepickerOpenedFunction"
  @closed="datepickerClosedFunction"
/>
```

Inline always open version

```vue
<VueDatepicker :inline="true" />
```

## Available props

| Prop                         | Type             | Default     | Description                              |
| ---------------------------- | ---------------- | ----------- | ---------------------------------------- |
| value                        | Date\|String     |             | Date value of the datepicker             |
| name                         | String           |             | Input name property                      |
| id                           | String           |             | Input id                                 |
| format                       | String\|Function | dd MMM yyyy | Date formatting string or function       |
| full-month-name              | Boolean          | false       | To show the full month name              |
| language                     | Object           | en          | Translation for days and months          |
| disabled-dates               | Object           |             | See below for configuration              |
| placeholder                  | String           |             | Input placeholder text                   |
| inline                       | Boolean          |             | To show the datepicker always open       |
| calendar-class               | String\|Object   |             | CSS class applied to the calendar el     |
| input-class                  | String\|Object   |             | CSS class applied to the input el        |
| wrapper-class                | String\|Object   |             | CSS class applied to the outer div       |
| monday-first                 | Boolean          | false       | To start the week on Monday              |
| clear-button                 | Boolean          | false       | Show an icon for clearing the date       |
| clear-button-icon            | String           |             | Use icon for button (ex: fa fa-times)    |
| calendar-button              | Boolean          | false       | Show an icon that that can be clicked    |
| calendar-button-icon         | String           |             | Use icon for button (ex: fa fa-calendar) |
| calendar-button-icon-content | String           |             | Use for material-icons (ex: event)       |
| day-cell-content             | Function         |             | Use to render custom content in day cell |
| bootstrap-styling            | Boolean          | false       | Output bootstrap v4 styling classes.     |
| initial-view                 | String           | minimumView | If set, open on that view                |
| disabled                     | Boolean          | false       | If true, disable Datepicker on screen    |
| required                     | Boolean          | false       | Sets html required attribute on input    |
| typeable                     | Boolean          | false       | If true, allow the user to type the date |
| use-utc                      | Boolean          | false       | use UTC for time calculations            |
| open-date                    | Date\|String     |             | If set, open on that date                |
| minimum-view                 | String           | 'day'       | If set, lower-level views won't show     |
| maximum-view                 | String           | 'year'      | If set, higher-level views won't show    |

## Events

These events are emitted on actions in the datepicker

| Event            | Output     | Description                       |
| ---------------- | ---------- | --------------------------------- |
| opened           |            | The picker is opened              |
| closed           |            | The picker is closed              |
| selected         | Date\|null | A date has been selected          |
| selectedDisabled | Object     | A disabled date has been selected |
| input            | Date\|null | Input value has been modified     |
| cleared          |            | Selected date has been cleared    |
| changedMonth     | Object     | Month page has been changed       |
| changedYear      | Object     | Year page has been changed        |
| changedDecade    | Object     | Decade page has been changed      |

## Date formatting

#### String formatter

NB. This is not very robust at all - use at your own risk! Needs a better implementation.

| Token | Desc                   | Example     |
| ----- | ---------------------- | ----------- |
| d     | day                    | 1           |
| dd    | 0 prefixed day         | 01          |
| D     | abbr day               | Mon         |
| su    | date suffix            | st, nd, rd  |
| M     | month number (1 based) | 1 (for Jan) |
| MM    | 0 prefixed month       | 01          |
| MMM   | abbreviated month name | Jan         |
| MMMM  | month name             | January     |
| yy    | two digit year         | 16          |
| yyyy  | four digit year        | 2016        |

#### Function formatter

Delegates date formatting to provided function.
Function will be called with date and it has to return formated date as a string.
This allow us to use moment, date-fns, globalize or any other library to format date.

```vue
<script>
  methods: {
    customFormatter(date) {
      return moment(date).format('MMMM Do YYYY, h:mm:ss a');
    }
  }
</script>
<VueDatepicker :format="customFormatter" />
```

## Disabled Dates

Dates can be disabled in a number of ways.

```vue
<script>
  let state = {
    disabledDates: {
      to: new Date(2016, 0, 5), // Disable all dates up to specific date
      from: new Date(2016, 0, 26), // Disable all dates after specific date
      days: [6, 0], // Disable Saturday's and Sunday's
      daysOfMonth: [29, 30, 31], // Disable 29th, 30th and 31st of each month
      dates: [
        // Disable an array of dates
        new Date(2016, 9, 16),
        new Date(2016, 9, 17),
        new Date(2016, 9, 18),
      ],
      ranges: [
        {
          // Disable dates in given ranges (exclusive).
          from: new Date(2016, 11, 25),
          to: new Date(2016, 11, 30),
        },
        {
          from: new Date(2017, 1, 12),
          to: new Date(2017, 2, 25),
        },
      ],
      // a custom function that returns true if the date is disabled
      // this can be used for wiring you own logic to disable a date if none
      // of the above conditions serve your purpose
      // this function should accept a date and return true if is disabled
      customPredictor: function (date) {
        // disables the date if it is a multiple of 5
        if (date.getDate() % 5 == 0) {
          return true
        }
      },
    },
  }
</script>
<VueDatepicker :disabled-dates="state.disabledDates" />
```

## Highlighted Dates

Dates can be highlighted (e.g. for marking an appointment) in a number of ways. Important:
By default disabled dates are ignored, to highlight disabled dates set the `includeDisabled`
property to `true`. Note: Both `to` and `from` properties are required to define a range of
dates to highlight.

```vue
<script>
  let state = {
    highlighted: {
      to: new Date(2016, 0, 5), // Highlight all dates up to specific date
      from: new Date(2016, 0, 26), // Highlight all dates after specific date
      days: [6, 0], // Highlight Saturday's and Sunday's
      daysOfMonth: [15, 20, 31], // Highlight 15th, 20th and 31st of each month
      dates: [
        // Highlight an array of dates
        new Date(2016, 9, 16),
        new Date(2016, 9, 17),
        new Date(2016, 9, 18),
      ],
      // a custom function that returns true of the date is highlighted
      // this can be used for wiring you own logic to highlight a date if none
      // of the above conditions serve your purpose
      // this function should accept a date and return true if is highlighted
      customPredictor: function (date) {
        // highlights the date if it is a multiple of 4
        if (date.getDate() % 4 == 0) {
          return true
        }
      },
      includeDisabled: true, // Highlight disabled dates
    },
  }
</script>
<VueDatepicker :highlighted="state.highlighted" />
```

## Slots

Slots will help you customize content. .

#### beforeCalendarHeader

Sometimes you need to show custom content before the calendar header. For such cases you can use the named slot `beforeCalendarHeader`.

An example would be to use bootstrap's `input-group-prepend` and `input-group-append`
to show some custom text:

```vue
<VueDatepicker :bootstrap-styling="true">
  <div slot="beforeCalendarHeader" class="calender-header">Choose a Date</div>
</VueDatepicker>
```

#### afterDateInput

To implement some custom styling (for instance to add an animated placeholder) on DateInput, you might need to add elements as DateInput siblings. Slot named
`afterDateInput` allows you to do that:

```vue
<VueDatepicker>
  <span slot="afterDateInput" class="animated-placeholder">
    Choose a Date
  </span>
</VueDatepicker>
```

## Translations

Contributing guide - please use appropriate code from this [list](http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry) as the translation property.

- Add your language as a module in the `src/locale/translations` dir.
- Import and export it in the `src/locale/index` file
- Add the Language to the available languages in the readme file.
- Run `yarn lint` to make sure your code formatting is in line with the required code style.

### How to apply language

Below script tag in component.

```js
import { en, es } from 'vue-2-datepicker/dist/locale'
```

In component data.

```js
data () {
    return {
      en,
      es
    }
}
```

html.

```js
<VueDatepicker :language="es" />
```

Available languages

| Abbr   | Language          |           |
| ------ | ----------------- | --------- |
| af     | Afrikaans         |           |
| ar     | Arabic            |           |
| bg     | Bulgarian         |           |
| bs     | Bosnian           |           |
| ca     | Catalan           |           |
| cs     | Czech             |           |
| da     | Danish            |           |
| de     | German            |           |
| ee     | Estonian          |           |
| el     | Greek             |           |
| en     | English           | _Default_ |
| es     | Spanish           |           |
| fa     | Persian (Farsi)   |           |
| fi     | Finnish           |           |
| fo     | Faroese           |           |
| fr     | French            |           |
| ge     | Georgia           |           |
| gl     | Galician          |           |
| he     | Hebrew            |           |
| hu     | Hungarian         |           |
| hr     | Croatian          |           |
| id     | Indonesian        |           |
| is     | Icelandic         |           |
| it     | Italian           |           |
| ja     | Japanese          |           |
| kk     | Kazakh            |           |
| ko     | Korean            |           |
| lb     | Luxembourgish     |           |
| lt     | Lithuanian        |           |
| lv     | Latvian           |           |
| mk     | Macedonian        |           |
| mn     | Mongolian         |           |
| nbNO   | Norwegian Bokmål  |           |
| nl     | Dutch             |           |
| pl     | Polish            |           |
| ptBR   | Portuguese-Brazil |           |
| ro     | Romanian          |           |
| ru     | Russian           |           |
| sk     | Slovak            |           |
| slSI   | Slovenian         |           |
| sv     | Swedish           |           |
| sr     | Serbian (Latin)   |           |
| srCyrl | Serbian (Cyrl)    |           |
| th     | Thai              |           |
| tr     | Turkish           |           |
| uk     | Ukrainian         |           |
| ur     | Urdu              |           |
| vi     | Vietnamese        |           |
| zh     | Chinese           |           |
| zhHK   | Chinese_HK        |           |
