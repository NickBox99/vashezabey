import {createLocalVue, shallowMount} from "@vue/test-utils"
import MenuWrapper from "~/components/MenuWrapper";
import MenuItem from "~/components/MenuItem";

describe('Component: MenuWrapper', () => {
  test('mount', () => {
    const localVue = createLocalVue();
    localVue.component('menu-item', MenuItem);

    const options = {
      localVue
    }

    const wrapper = shallowMount(MenuWrapper, options);

    expect(wrapper).toBeTruthy();
  })
})
