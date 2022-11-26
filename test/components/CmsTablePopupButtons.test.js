import {createLocalVue, shallowMount} from "@vue/test-utils"
import CmsTablePopupButtons from "~/components/CmsTablePopupButtons";
import Element from "element-ui";

describe('Component: CmsTablePopupButtons', () => {
  test('mount', () => {
    const localVue = createLocalVue();
    localVue.use(Element);

    const options = {
      localVue
    }

    const wrapper = shallowMount(CmsTablePopupButtons, options);

    expect(wrapper).toBeTruthy();
  })
})
