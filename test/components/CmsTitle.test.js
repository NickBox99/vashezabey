import {shallowMount} from "@vue/test-utils"
import CmsTitle from "~/components/CmsTitle";

describe('Component: CmsTitle', () => {
  test('mount', () => {
    const wrapper = shallowMount(CmsTitle);

    expect(wrapper).toBeTruthy();
  })
})
