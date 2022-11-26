import {createLocalVue, shallowMount} from "@vue/test-utils"
import DiscountBonus from "~/components/DiscountBonus";
import Element from "element-ui";
import Vuex from 'vuex'

describe('Component: DiscountBonus', () => {
  test('mount', () => {
    const localVue = createLocalVue();
    localVue.use(Element);
    localVue.use(Vuex);

    const store = new Vuex.Store({
      getters: {
        'settings/get': () => ({ reviewLink: 'TestUrl' })
      }
    });

    const options = {
      localVue,
      store
    }

    const wrapper = shallowMount(DiscountBonus, options);

    expect(wrapper).toBeTruthy();
  })
})
