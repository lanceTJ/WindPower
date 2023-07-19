<template class="mt-0">
  <div class="overflow-auto">
    <KTModalCard
      title="Analyse"
      description="AnalyseDescription"
      image="media/illustrations/TFUsed/real_time_analytics.svg"
      button-text="StartAnalyse"
      @startAnalyse="startAnalyse"
      v-if="!analyseData.info"
    ></KTModalCard>
    <div v-else>
      <analyse-title-card
        title="Dataset1"
        :FValues="FlagValues"
        cardClasses="h-50"
        view="YD15"
        @change="changeView"
      />
      <ELineCard
        ref="elineCard"
        :labelTitle="lineTitle"
        :title="translator('AnalyseResult')"
        class="mt-5 pt-5 px-0"
        :time="analyseData.time"
        :data="analyseData.info"
      />
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onBeforeMount,
  onMounted,
  ref,
  reactive,
  watch,
} from "vue";
import KTModalCard from "@/components/cards/AnalyseCard.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { getIllustrationsPath } from "@/core/helpers/assets";
import AnalyseTitleCard from "@/components/cards/AnalyseTitleCard.vue";
import ELineCard from "@/components/widgets/charts/ELineCard.vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "analyseView",
  components: {
    KTModalCard,
    AnalyseTitleCard,
    ELineCard,
  },
  // async beforeCreate() {
  //   await useStore().dispatch(Actions.ANALYSE_FILE, "YD15");
  // },
  setup() {
    const FlagValues = ref<
      Array<{ Fname: string; value: number; units: string }>
    >([]);
    const store = useStore();
    // let analyseData = reactive(
    //   useStore().dispatch(Actions.ANALYSE_FILE, "YD15")
    // );
    let analyseData = reactive({
      value: {
        count: Number,
        mean: Number,
        var: Number,
        std: Number,
        min: Number,
        max: Number,
        median: Number,
        skew: Number,
        kurt: Number,
        begin: String,
        end: String,
      },
      time: [],
      info: [],
      dataSet: {},
    });

    const lineTitle = ref();
    const { t, te } = useI18n();
    const translator = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    watch(analyseData, () => {
      console.log("检测到analyseData变化，应该会开始重新渲染。");
    });
    const startAnalyse = async () => {
      // await store.dispatch(Actions.ANALYSE_FILE, "YD15");
      updateAnalyseData(store.getters.AnalyseData);
      updataFvalue(analyseData.value);
      console.log("analyse started!");
    };
    const updateAnalyseData = (NewData) => {
      analyseData.value = NewData.value;
      analyseData.time = NewData.time;
      analyseData.info = NewData.info;
      analyseData.dataSet = NewData.dataSet;
    };
    const updataFvalue = (newFvalues) => {
      FlagValues.value[0].value = newFvalues?.mean;
      FlagValues.value[1].value = newFvalues?.skew;
      FlagValues.value[2].value = newFvalues?.kurt;
      FlagValues.value[3].value = newFvalues?.std;
      console.log("Analyse.vue中的FlagValue是：", FlagValues.value);
    };
    onBeforeMount(() => {
      store.dispatch(Actions.ANALYSE_FILE, "YD15");
      updateAnalyseData(store.getters.AnalyseData);
      lineTitle.value = "YD15";
      console.log("IN BeforeMount ANALYSE VIEW, analysedata: ", analyseData);
    });
    onMounted(() => {
      updateAnalyseData(store.getters.AnalyseData);
      console.log("IN Mounted ANALYSE VIEW, analysedata: ", analyseData);
      changeView("YD15");
      setCurrentPageBreadcrumbs("Analyse", []);
    });
    const changeView = async (view) => {
      view =
        view == "实际功率"
          ? "ROUNDAPOWER0"
          : view == "实际风速"
          ? "ROUNDAWS1"
          : view == "实际功率（预测目标，计量口径二)"
          ? "YD15"
          : view == "预测功率（系统生成）"
          ? "PREPOWER"
          : view == "气压"
          ? "PRESSURE"
          : view == "湿度"
          ? "HUMIDITY"
          : view == "温度"
          ? "TEMPERATURE"
          : view == "风向"
          ? "WINDDIRECTION"
          : view == "预测风速"
          ? "WINDSPEED"
          : view;
      console.log("正在更新所有，正在请求: ", view);
      await store.dispatch(Actions.ANALYSE_FILE, view);
      updateAll(view);
      console.log("------------这是更新之后-------");
    };
    function updateAll(view) {
      console.log("正在更新所有信息");
      updateAnalyseData(store.getters.AnalyseData);
      console.log("已经使用getter：", analyseData);
      lineTitle.value = view;
      updataFvalue(analyseData.value);
      console.log("更新到页面：", view);
      console.log("获得新数据：", analyseData);
    }

    FlagValues.value = [
      {
        Fname: "MEAN",
        value: 0,
        units: "",
      },
      {
        Fname: "SKEW",
        value: 0,
        units: "",
      },
      {
        Fname: "KURT",
        value: 0,
        units: "",
      },
      {
        Fname: "STD",
        value: 0,
        units: "",
      },
    ];

    return {
      getIllustrationsPath,
      FlagValues,
      changeView,
      analyseData,
      translator,
      lineTitle,
      startAnalyse,
    };
  },
});
</script>
