import {createLocalVue, shallowMount} from "@vue/test-utils"
import CmsTableMovePopup from "~/components/CmsTableMovePopup";
import Element from "element-ui";
import CmsSidebar from "~/components/CmsSidebar";

describe('Component: CmsSidebar', () => {
  test('mount', () => {
    const localVue = createLocalVue();
    localVue.use(Element);
    localVue.component('cms-table-popup-buttons', CmsSidebar)

    const options = {
      localVue
    }

    const wrapper = shallowMount(CmsTableMovePopup, options);

    expect(wrapper).toBeTruthy();
  })
})
