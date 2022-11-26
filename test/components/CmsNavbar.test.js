import {createLocalVue, shallowMount} from "@vue/test-utils"
import CmsTableMovePopup from "~/components/CmsTableMovePopup";
import Element from "element-ui";
import CmsNavbar from "~/components/CmsNavbar";

describe('Component: CmsNavbar', () => {
  test('mount', () => {
    const localVue = createLocalVue();
    localVue.use(Element);
    localVue.component('cms-table-popup-buttons', CmsNavbar)

    const options = {
      localVue
    }

    const wrapper = shallowMount(CmsTableMovePopup, options);

    expect(wrapper).toBeTruthy();
  })
})
