import {createLocalVue, shallowMount} from "@vue/test-utils"
import CmsTableMovePopup from "~/components/CmsTableMovePopup";
import Element from "element-ui";
import CmsTablePopupButtons from "~/components/CmsTablePopupButtons";

describe('Component: CmsTablePopupButtons', () => {
  test('mount', () => {
    const localVue = createLocalVue();
    localVue.use(Element);
    localVue.component('cms-table-popup-buttons', CmsTablePopupButtons)

    const options = {
      localVue
    }

    const wrapper = shallowMount(CmsTableMovePopup, options);

    expect(wrapper).toBeTruthy();
  })
})
