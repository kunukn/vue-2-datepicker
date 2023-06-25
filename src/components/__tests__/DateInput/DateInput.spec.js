import { describe, it, expect, beforeEach } from 'vitest'
import DateInput from '@/components/DateInput.vue'
import { shallowMount, mount } from '@vue/test-utils'
import en from '@/locale/translations/en.js'

describe('DateInput', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(DateInput, {
      propsData: {
        selectedDate: new Date(2018, 2, 24),
        format: 'dd MMM yyyy',
        translation: en,
      },
    })
  })

  it('should render correct contents', () => {
    expect(wrapper.findAll('input')).toHaveLength(1)
  })

  it('nulls date', () => {
    wrapper.setProps({
      selectedDate: null,
    })
    expect(wrapper.vm.formattedValue).toBeNull()
    expect(wrapper.findComponent('input').element.value).toEqual('')
  })

  it('formats date', () => {
    expect(wrapper.vm.formattedValue).toEqual('24 Mar 2018')
    expect(wrapper.findComponent('input').element.value).toEqual('24 Mar 2018')
  })

  it('delegates date formatting', () => {
    wrapper.setProps({
      selectedDate: new Date(2016, 1, 15),
      format: () => '2016/1/15',
    })
    expect(wrapper.vm.formattedValue).toEqual('2016/1/15')
    expect(wrapper.findComponent('input').element.value).toEqual('2016/1/15')
  })

  it('emits showCalendar', () => {
    wrapper.vm.showCalendar()
    expect(wrapper.emitted().showCalendar).toBeTruthy()
  })

  it('adds bootstrap classes', () => {
    wrapper.setProps({
      bootstrapStyling: true,
    })
    expect(wrapper.findComponent('input').element.classList).toContain(
      'form-control'
    )
  })

  it('appends bootstrap classes', () => {
    wrapper.setProps({
      inputClass: 'someClass',
      bootstrapStyling: true,
    })
    expect(wrapper.findComponent('input').element.classList).toContain(
      'form-control'
    )
    expect(wrapper.findComponent('input').element.classList).toContain(
      'someClass'
    )
  })

  it('can be disabled', () => {
    wrapper.setProps({
      disabled: true,
    })
    expect(wrapper.findComponent('input').attributes().disabled).toBeDefined()
  })

  it('accepts a function as a formatter', () => {
    wrapper.setMethods({
      format: () => '!',
    })
    expect(wrapper.findComponent('input').element.value).toEqual('!')
  })

  it('triggers closeCalendar on blur', () => {
    wrapper.findComponent('input').trigger('blur')
    expect(wrapper.emitted('closeCalendar')).toBeTruthy()
  })
})
