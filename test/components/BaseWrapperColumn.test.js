import { shallowMount } from "@vue/test-utils"
import BaseWrapperColumn from "~/components/BaseWrapperColumn"

describe('Component: BaseWrapperColumn', () => {
  test('mount', () => {
    const options = {
      slots: {
        default: { template: '<div>Test slot</div>' }
      }
    }

    const wrapper = shallowMount(BaseWrapperColumn, options);

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toContain('Test slot');
  })
})
