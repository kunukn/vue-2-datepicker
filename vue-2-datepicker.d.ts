import Vue, { PluginFunction, VueConstructor } from 'vue'

declare const Datepicker: VueConstructor<Vue> & {
  install: PluginFunction<any>
}
export default Datepicker
