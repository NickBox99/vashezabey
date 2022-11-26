import { createLocalVue, shallowMount } from "@vue/test-utils";
import CmsContent from "~/components/CmsContent";
import ElementUI from "element-ui";
import CmsTableButtons from "~/components/CmsTableButtons";
import CmsTablePopupButtons from "~/components/CmsTablePopupButtons";
import CmsTableMovePopup from "~/components/CmsTableMovePopup";

describe('Component: CmsContent', () => {
  test('mount', () => {
    const localVue = createLocalVue();
    localVue.use(ElementUI);
    localVue.component('cms-table-buttons', CmsTableButtons);
    localVue.component('cms-table-popup-buttons', CmsTablePopupButtons);
    localVue.component('cms-table-move-popup', CmsTableMovePopup);

    const options = {
      localVue,
      propsData: {
        data: [{ id: 1 }],
        searchQuery: ['id'],
        modelEditPopup: { id: 1 },
        add: () => true,
        edit: () => true,
        remove: () => true,
        move: () => true
      }
    };

    const wrapper = shallowMount(CmsContent, options);

    expect(wrapper).toBeTruthy();
  })
})
