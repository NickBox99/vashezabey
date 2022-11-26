import { shallowMount } from "@vue/test-utils"
import BaseWrapper from "~/components/BaseWrapper";

describe('Component: BaseWrapper', () => {
  test('mount', () => {
    const options = {
      slots: {
        default: { template: '<div>Test slot</div>' }
      }
    }

    const  wrapper = shallowMount(BaseWrapper, options);

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toContain('Test slot');
  })
});
