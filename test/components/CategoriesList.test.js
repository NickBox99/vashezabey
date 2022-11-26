import { shallowMount, RouterLinkStub } from "@vue/test-utils"
import CategoriesList from "~/components/CategoriesList"

describe('Component: CategoriesList', () => {
  test('mount', () => {
    const wrapper = shallowMount(CategoriesList, {
      stubs: {
        NuxtLink: RouterLinkStub,
      }
    });

    expect(wrapper).toBeTruthy();
  })
})
