import {shallowMount} from "@vue/test-utils"
import MenuItem from "~/components/MenuItem";

describe('Component: MenuItem', () => {
  test('mount', () => {
    const wrapper = shallowMount(MenuItem);

    expect(wrapper).toBeTruthy();
  })
})
