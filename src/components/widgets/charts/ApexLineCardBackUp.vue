<template>
  <!--begin::Card-->
  <div class="card">
    <!--begin::Card body-->
    <div class="card-body p-0">
      <div id="wrapper">
        <h2 class="text-center">
          {{ title }}
        </h2>
        <div id="chart-line2">
          <apexchart
            ref="chart2"
            type="line"
            height="600"
            :options="chartOptions"
            :series="series"
          ></apexchart>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, onUpdated, ref } from "vue";
import VueApexCharts from "vue3-apexcharts";
import { useStore } from "vuex";
import * as echarts from "echarts";

export default {
  components: {
    apexchart: VueApexCharts,
  },
  props: {
    title: String,
    datasets: Array,
    labelTitle: String,
  },
  setup(props) {
    const store = useStore();
    const series = ref([
      {
        name: "XYZ MOTORS",
        data: props.datasets,
      },
    ]);

    onMounted(() => {
      const info = store.getters.ANALYSE_FILE;
      console.log("IN Mounted LINECARD, analysedata: ", info);
      console.log("IN Mounted LINECARD, dataset: ", props.datasets);
    });
    onUpdated(() => {
      console.log("IN Updated LINECARD, dataset: ", props.datasets);
    });

    const chartOptions = ref({
      animation: { enabled: false },
      chart: {
        type: "area",
        stacked: false,
        height: 350,
        zoom: {
          type: "x",
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: "zoom",
        },
      },
      dataLabels: {
        enabled: false,
      },
      markers: {
        size: 0,
      },
      title: {
        text: "Stock Price Movement",
        align: "left",
      },
      fill: {
        type: "solid", // 将type属性设置为solid
        colors: ["#009ef7"], // 设置线条的颜色
      },
      yaxis: {
        labels: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          },
        },
        title: {
          text: props.labelTitle,
        },
      },
      xaxis: {
        type: "datetime",
      },
      tooltip: {
        shared: false,
        y: {
          formatter: function (val) {
            return (val / 1000000).toFixed(0);
          },
        },
      },
    });

    return {
      series,
      chartOptions,
    };
  },
};
</script>
