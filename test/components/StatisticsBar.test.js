import {createLocalVue, shallowMount} from "@vue/test-utils"
import StatisticsBar from "~/components/StatisticsBar";
import Element from "element-ui";
import {Bar} from "vue-chartjs";

jest.mock('vue-chartjs', () => ({
  Bar: () => null
}));

describe('Component: StatisticsBar', () => {
  test('mount', () => {
    const localVue = createLocalVue();
    localVue.use(Element);
    localVue.component('chart-bar', Bar)

    const options = {
      propsData: {
        elements: [
          {
            label: 'Test',
            value: 123,
            dataTime: 1669318850344
          }
        ]
      },
      localVue
    }

    const wrapper = shallowMount(StatisticsBar, options);

    expect(wrapper).toBeTruthy();
  })
})
