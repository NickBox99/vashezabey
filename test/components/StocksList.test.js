import {createLocalVue, shallowMount} from "@vue/test-utils"
import StocksList from "~/components/StocksList";
import BaseWrapper from "~/components/BaseWrapper";
import StocksListItem from "~/components/StocksListItem";

describe('Component: StocksList', () => {
  test('mount', () => {
    const localVue = createLocalVue();
    localVue.component('base-wrapper', BaseWrapper)
    localVue.component('stocks-list-item', StocksListItem);

    const options = {
      localVue
    }

    const wrapper = shallowMount(StocksList, options);

    expect(wrapper).toBeTruthy();
  })
})
