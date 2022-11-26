import Vuex from "vuex";
import {createLocalVue, RouterLinkStub, shallowMount} from "@vue/test-utils"
import TheWelcome from "~/components/TheWelcome";
import Element from "element-ui";

describe('Component: TheWelcome', () => {
  test('mount', () => {
    const localVue = createLocalVue();
    localVue.use(Vuex);
    localVue.use(Element);

    const store = new Vuex.Store({
      getters: {
        'settings/get': () => ({instagram: 'Test'})
      }
    });

    const options = {
      stubs: {
        NuxtLink: RouterLinkStub
      },
      mocks: {
        $route: {
          query: 'test'
        }
      },
      store,
      localVue
    }

    const wrapper = shallowMount(TheWelcome, options);

    expect(wrapper).toBeTruthy();
  })
})
