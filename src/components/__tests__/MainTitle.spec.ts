import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import MainTitle from '../MainTitle.vue'

describe('MainTitle', () => {
  it('renders properly', () => {
    const wrapper = mount(MainTitle)
    expect(wrapper.exists()).toBe(true)
  })
})
