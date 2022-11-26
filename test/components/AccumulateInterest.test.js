import { shallowMount } from "@vue/test-utils"
import AccumulateInterest from "~/components/AccumulateInterest";


describe('Component: AccumulateInterest', () => {
  test('mount', () => {
    const options = {
      propsData: {
        accumulateInterests: new Array(5).fill(1).map((_, idx) => ({ id: idx, percent: Math.floor(Math.random() * 100), summa: Math.floor(Math.random() * 50000) }))
      }
    };

    const wrapper = shallowMount(AccumulateInterest, options);

    expect(wrapper).toBeTruthy();
    expect(wrapper.html()).toContain(String(options.propsData.accumulateInterests[0].percent));
  })
});
