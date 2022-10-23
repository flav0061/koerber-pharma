import { describe, it, expect } from 'vitest'
import { createVuetify } from "vuetify";


import { mount } from '@vue/test-utils'
import InputSearch from '../InputSearch.vue'

describe('InputSearch', () => {
  const vuetify = createVuetify()

  it('renders properly', () => {
    const wrapper = mount(InputSearch, {
      global: {
        plugins: [vuetify],
      },
    })

    expect(wrapper.text()).toContain('Search')
  })
})
