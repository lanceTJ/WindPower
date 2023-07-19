<template>
  <!--begin::Card-->
  <div class="card">
    <!--begin::Card body-->
    <div class="card-body p-0">
      <div id="wrapper">
        <div id="chart" ref="option" type="line" class="h-700px w-100" />
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, watch, onUpdated, computed } from "vue";
import * as echarts from "echarts";
import { useI18n } from "vue-i18n";

export default {
  components: {},
  props: {
    title: String,
    labelTitle: String,
    data: Array,
    time: Array,
  },
  setup(props) {
    const { t, te } = useI18n();
    const translator = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    let mychart = null;
    const renderChart = (newProps) => {
      mychart.setOption({
        tooltip: {
          trigger: "axis",
          position: function (pt) {
            return [pt[0], "10%"];
          },
        },
        title: {
          left: "center",
          text: newProps.title,
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: newProps.time,
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "10%"],
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 10,
          },
          {
            start: 0,
            end: 10,
          },
        ],
        series: [
          {
            name: newProps.labelTitle,
            type: "line",
            symbol: "none",
            sampling: "lttb",
            itemStyle: {
              color: "rgba(43,208,253,0.58)",
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(20,224,187)",
                },
                {
                  offset: 1,
                  color: "rgba(43,208,253,0.58)",
                },
              ]),
            },
            data: newProps.data,
          },
        ],
      });
    };
    onMounted(() => {
      console.log("IN Mounted LINECARD, data: ", props.data);
      console.log("IN Mounted LINECARD, time: ", props.time);
      mychart = echarts.init(document.getElementById("chart"));
      renderChart(props);
    });
    onUpdated(() => {
      renderChart(props);
    });
    watch(props, (newData) => {
      renderChart(newData);
      console.log("LINE CHART CHANGED TO INFO: ", newData.data);
    });
  },
};
</script>
