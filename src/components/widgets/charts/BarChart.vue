<template>
  <div class="chart">
    <h3 v-if="title">{{ title }}</h3>
    <p v-if="description" class="text-gray text-center">{{ description }}</p>
    <canvas :id="id"></canvas>
  </div>
</template>

<script>
import { computed, ref, watchEffect } from "vue";
import { Chart } from "chart.js";

export default {
  props: {
    title: String,
    description: String,
    labels: Array,
    datasets: Array,
  },
  setup(props) {
    const id = ref(Math.random().toString(36).substring(7));
    let chart = null;

    watchEffect(() => {
      if (props.title !== "" && props.labels && props.datasets) {
        drawChart();
      }
    });

    const currentData = computed(() => {
      const datasets = [];
      for (let i = 0; i < props.datasets.length; i++) {
        const dataset = props.datasets[i];
        datasets.push({
          label: dataset.label,
          data: dataset.data,
          backgroundColor: dataset.bcolor,
          borderWidth: { top: 2 },
          borderColor: dataset.color,
          barPercentage: 1,
          categoryPercentage: 0.6,
        });
      }
      return datasets;
    });

    const drawChart = () => {
      chart = new Chart(id.value, {
        type: "bar",
        data: {
          datasets: currentData.value,
          labels: props.labels,
        },
        options: {
          scales: {
            xAxes: [
              {
                stacked: false,
                gridLines: {
                  display: false,
                },
                ticks: {
                  maxRotation: 0,
                  autoSkipPadding: 10,
                },
              },
            ],
            yAxes: [
              {
                display: false,
                stacked: false,
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        },
      });
    };

    watchEffect(() => {
      chart.data.labels = props.labels;
      if (chart.data.datasets.length >= currentData.value.length) {
        chart.data.datasets.forEach((d, i) => {
          if (i in currentData.value) {
            d.data = currentData.value[i].data;
          } else {
            chart.data.datasets.pop();
          }
        });
      } else {
        currentData.value.forEach((d, i) => {
          if (i in chart.data.datasets) {
            chart.data.datasets[i].data = d.data;
          } else {
            chart.data.datasets.push(d);
          }
        });
      }
      chart.update();
    });

    return {
      id,
    };
  },
};
</script>
