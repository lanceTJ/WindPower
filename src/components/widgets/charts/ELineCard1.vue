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
import { onMounted, watch, onUpdated } from "vue";
import * as echarts from "echarts";
import { useI18n } from "vue-i18n";

export default {
  components: {},
  props: {
    title: String,
    predictData: {},
  },
  setup(props) {
    let mychart = null;

    const { t, te } = useI18n();
    const translator = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };

    const getTime = (newProps) => {
      console.log("newProps: ", newProps);
      if (!newProps) {
        console.log("初始化时间轴失败");
        return 0;
      }
      let cnt;
      for (cnt in newProps.base_time) {
        if (newProps.base_time[cnt] === newProps.pre_time[0]) {
          break;
        }
      }
      console.log("time 点改变了，现在是：", newProps.base_time[cnt], cnt);
      return cnt;
    };
    const getP = (prop) => {
      console.log("prop.base_apower-------------", prop.base_aPower);
      return prop.base_aPower.length === 0
        ? prop.base_time
        : prop.base_time.concat(prop.pre_time);
    };

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
          data: getP(newProps),
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
            name: translator("BaseAPower"),
            type: "line",
            symbol: "none",
            sampling: "lttb",
            itemStyle: {
              color: "rgba(40,83,227,0.58)",
            },
            data: newProps.base_aPower,
          },
          {
            name: translator("BaseYD15"),
            type: "line",
            symbol: "none",
            sampling: "lttb",
            itemStyle: {
              color: "rgba(26,234,30,0.58)",
            },
            data: newProps.base_yd15,
          },
          {
            name: translator("PreAPower"),
            type: "line",
            symbol: "none",
            sampling: "lttb",
            itemStyle: {
              normal: {
                lineStyle: {
                  width: 2,
                  color: "rgba(222,171,122,0.94)",
                  type: "dotted", //'dotted'点型虚线 'solid'实线 'dashed'线性虚线
                },
              },
            },
            data: newProps.base_aPower
              .slice(0, Number(getTime(newProps)) + 1)
              .map(() => null)
              .concat(newProps.pre_aPower),
          },
          {
            name: translator("PreYD15"),
            type: "line",
            symbol: "none",
            sampling: "lttb",
            itemStyle: {
              normal: {
                lineStyle: {
                  color: "rgba(245,39,39,0.58)",
                  width: 2,
                  type: "dashed",
                },
              },
            },
            data: newProps.base_yd15
              .slice(0, Number(getTime(newProps)) + 1)
              .map(() => null)
              .concat(newProps.pre_yd15),
          },
        ],
      });
    };
    onMounted(() => {
      mychart = echarts.init(document.getElementById("chart"));
      renderChart(props.predictData);
    });
    onUpdated(() => {
      console.log("LINECHART检测到参数变化，正在重新渲染新参数：", props);
      renderChart(props.predictData);
    });
    watch(props, (newData) => {
      console.log("LINECHART检测到参数变化，正在重新渲染新参数：", newData);
      renderChart(newData.predictData);
    });
  },
};
</script>
