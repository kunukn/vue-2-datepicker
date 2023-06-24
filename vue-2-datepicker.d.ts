import Vue, { PluginFunction, VueConstructor } from 'vue'

declare const DatePicker: VueConstructor<Vue> & {
  install: PluginFunction<any>
}
export default DatePicker
