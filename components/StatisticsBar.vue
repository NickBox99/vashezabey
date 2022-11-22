<template>
  <div class="statistics">
    <div class="statistics__header">
      <div class="statistics__title">{{ title }}</div>

      <el-date-picker
        v-model="dates"
        type="daterange"
        format="dd.MM.yyyy"
        range-separator=""
        value-format="timestamp"
        start-placeholder="Начальная дата"
        end-placeholder="Конечная дата">
      </el-date-picker>

    </div>

    <chart-bar :chart-options="chartOptions"
               :chart-data="chartData"
               :styles="{ height: '600px' }"/>

  </div>
</template>

<script lang="ts">
import Vue, { PropType } from "vue";
import { Statistics } from "~/types";

export default Vue.extend({
  name: "StatisticsBar",
  props: {
    title: {
      type: String,
      default: ''
    },
    elements: {
      type: Array as PropType<Statistics.IElement[]>,
      required: true
    }
  },
  data() {
    const prevDate = new Date();
    prevDate.setMonth(prevDate.getMonth() - 1);

    return {
      dates: [prevDate.getTime(), Date.now()],

      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    }
  },
  computed: {
    chartData() {
      const [ firstDate, secondDate ] = this.dates as number[];

      const data: { [key: number]: number } = {};

      this.elements.filter(({ dateTime }) => firstDate <= dateTime && dateTime <= secondDate)
        .forEach(({ label, value }) => {
          if (label in data) {
            data[label] += value;
          }
          else {
            data[label] = value;
          }
        });

      return {
        labels: Object.keys(data),
        datasets: [{
          data: Object.keys(data).map(key => data[key]),
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)'
          ],
          borderColor: [
            'rgba(255,99,132,1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)'
          ],
          borderWidth: 1
        }]
      }
    }
  }
})
</script>

<style scoped lang="scss">
.statistics {
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  &__title {
    font-size: 20px;
  }
}
</style>
