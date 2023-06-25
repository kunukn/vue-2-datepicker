# Vue 2 Datepicker

[![npm version](https://img.shields.io/npm/v/@kunukn/vue-2-datepicker.svg?style=flat-square)](https://www.npmjs.com/package/@kunukn/vue-2-datepicker)
[![npm downloads](https://img.shields.io/npm/dm/@kunukn/vue-2-datepicker.svg?style=flat-square)](https://www.npmjs.com/package/@kunukn/vue-2-datepicker)
[![gzip](https://img.shields.io/bundlephobia/minzip/@kunukn/vue-2-datepicker.svg)](https://bundlephobia.com/result?p=@kunukn/vue-2-datepicker)
[![license](https://img.shields.io/github/license/kunukn/vue-2-datepicker.svg)](https://github.com/kunukn/vue-2-datepicker/blob/master/LICENSE)

A datepicker Vue component. Compatible with Vue 2.x

# About

A datepicker Vue component. Compatible with Vue 2.x
The source code is based on https://github.com/charliekassel/vuejs-datepicker#readme

It has been modified to use Vite and Vitest and the goal is to support Vue 2.6+ with pretty default styling.
Vue 3 is out of scope in this repo.

# Table of contents

- [Demo](#demo)
- [Install](#install)
- [Size](#size)
- [Usage](#usage)
- [Date Formatting](#date-formatting)
- [Props](#available-props)
- [Events](#events)
- [Disabled dates](#disabled-dates)
- [Highlighted dates](#highlighted-dates)
- [Translations](#translations)

# Demo

To view a demo online:

<table style="border-spacing: 16px;border-collapse: separate;">

<tr>
<td>Codesandbox</td>
<td><img width="24" height="24" src="ui-library-logo/Vue-logo.svg"/></td>
<td><a href="#" target="_blank">View</a></td>
<td><a href="#" target="_blank" >Edit</a></td>
</tr>

</table>

To view demo examples locally clone the repo and run `yarn install && yarn dev`

## Install

```bash
yarn add -D @kunukn/vue-2-datepicker
```

```js
import Datepicker from '@kunukn/vue-2-datepicker'

export default {
  // ...
  components: {
    Datepicker,
  },
  // ...
}
```

# Size

| name                     | size   | gzip    |
| ------------------------ | ------ | ------- |
| vue-2-datepicker.css     | ~3 kB  | ~0.7 kB |
| vue-2-datepicker.js      | ~45 kB | ~8.8 kB |
| vue-2-datepicker.umd.cjs | ~29 kB | ~6.6 kB |
