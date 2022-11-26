import {createLocalVue, shallowMount} from "@vue/test-utils"
import CmsTableButtons from "~/components/CmsTableButtons";
import Element from "element-ui";

describe('Component: CmsTableButtons', () => {
  test('mount', () => {
    const localVue = createLocalVue();
    localVue.use(Element);

    const options = {
      localVue
    }

    const wrapper = shallowMount(CmsTableButtons, options);

    expect(wrapper).toBeTruthy();
  })
})
