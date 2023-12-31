<template>
  <div class="chart">
    <h3 v-if="title">{{ title }}</h3>
    <p v-if="description" class="text-gray text-center">{{ description }}</p>
    <canvas :id="id"></canvas>
  </div>
</template>

<script>
/* eslint no-undef: 0 */
export default {
  props: {
    title: String,
    description: String,
    labels: Array,
    datasets: Array,
  },
  data() {
    return {
      id: Math.random().toString(36).substring(7),
      chart: null,
    };
  },
  mounted() {
    if (this.title != "" && this.labels && this.datasets) {
      this.draw();
    }
  },
  computed: {
    currentData() {
      let datasets = [];
      for (let i = 0; i < this.datasets.length; i++) {
        const dataset = this.datasets[i];
        datasets.push({
          label: dataset.label,
          data: dataset.data,
          borderColor: dataset.color,
          borderWidth: 2,
          lineTension: 0.15,
          pointRadius: 0,
          backgroundColor: dataset.bcolor,
        });
      }
      return datasets;
    },
  },
  methods: {
    draw() {
      this.chart = new Chart(this.id, {
        type: "line",
        data: {
          datasets: this.currentData,
          labels: this.labels,
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
    },
  },
  watch: {
    // update chart if data changes
    datasets() {
      this.chart.data.labels = this.labels;
      if (this.chart.data.datasets.length >= this.currentData.length) {
        this.chart.data.datasets.forEach((d, i) => {
          if (i in this.currentData) {
            d.data = this.currentData[i].data;
          } else {
            this.chart.data.datasets.pop();
          }
        });
      } else {
        this.currentData.forEach((d, i) => {
          if (i in this.chart.data.datasets) {
            this.chart.data.datasets[i].data = d.data;
          } else {
            this.chart.data.datasets.push(d);
          }
        });
      }
      this.chart.update();
    },
  },
};
</script>
