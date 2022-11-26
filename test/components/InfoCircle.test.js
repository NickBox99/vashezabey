import {shallowMount} from "@vue/test-utils"
import InfoCircle from "~/components/InfoCircle";

describe('Component: InfoCircle', () => {
  test('mount', () => {
    const options = {
      slots: {
        default: '123'
      }
    }

    const wrapper = shallowMount(InfoCircle, options);

    expect(wrapper).toBeTruthy();
  })
})
