<template>
  <KTModalCard
    title="Predict"
    description="PredictDescription"
    image="media/illustrations/TFUsed/predictive_analytics.svg"
    button-text="StartPredict"
    @startAnalyse="startAnalyse"
    v-if="!predictData.base_yd15"
  ></KTModalCard>
  <div v-else>
    <analyse-title-card
      title="ChoosePredictParam"
      cardClasses="h-50"
      :level="1"
      :module="Module[1]"
      @changeLevel="changeLevel"
      @changeModule="changeModule"
    />
    <ELineCard
      ref="elineCard"
      :title="translator('PredictResult')"
      class="mt-5 pt-5 px-0"
      :predictData="predictData"
    />
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  onMounted,
  reactive,
  onBeforeMount,
  watch,
  ref,
} from "vue";
import KTModalCard from "@/components/cards/AnalyseCard.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { getIllustrationsPath } from "@/core/helpers/assets";
import AnalyseTitleCard from "@/components/cards/PredictTitleCard.vue";
import ELineCard from "@/components/widgets/charts/ELineCard1.vue";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { useI18n } from "vue-i18n";
import analyse from "@/views/Analyse.vue";
export default defineComponent({
  name: "predictView",
  computed: {
    analyse() {
      return analyse;
    },
  },
  components: {
    ELineCard,
    AnalyseTitleCard,
    KTModalCard,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Predict", []);
    });
    const store = useStore();
    const predictData = reactive({
      base_aPower: [],
      base_yd15: [],
      base_time: [],
      pre_aPower: [],
      pre_yd15: [],
      pre_time: [],
    });
    const Module = ["模型0", "时序预测模型", "回归预测模型"];
    const choosedLevel = ref<number>(1);
    const choosedModule = ref<number>(1);

    const { t, te } = useI18n();
    const translator = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    watch(predictData, () => {
      console.log("检测到predictData变化，应该会开始重新渲染。");
    });

    const startAnalyse = async () => {
      updatePredictData(store.getters.AnalyseData);
      console.log("Predict started!");
    };
    const updatePredictData = (NewData) => {
      console.log("正在更新预测数据");
      predictData.base_aPower = NewData.base_aPower;
      predictData.base_time = NewData.base_time;
      predictData.base_yd15 = NewData.base_yd15;
      predictData.pre_aPower = NewData.pre_aPower;
      predictData.pre_time = NewData.pre_time;
      predictData.pre_yd15 = NewData.pre_yd15;
    };

    onBeforeMount(() => {
      startPredict();
      console.log("IN BeforeMount predict VIEW, predictdata: ", predictData);
    });
    onMounted(() => {
      console.log("IN Mounted predict VIEW, predictdata: ", predictData);
    });

    const changeLevel = (level) => {
      console.log("Level Changed to: ", level);
      choosedLevel.value = level;
      startPredict();
    };

    const changeModule = (module) => {
      console.log("Module Changed to: ", module);
      choosedModule.value = module === Module[1] ? 1 : 2;
      startPredict();
    };
    const startPredict = async () => {
      console.log("正在发送预测请求", choosedLevel.value, choosedModule.value);
      await store.dispatch(Actions.PREDICT_FILE, {
        level: choosedLevel.value,
        category: choosedModule.value,
      });
      updateAll();
    };

    function updateAll() {
      updatePredictData(store.getters.PredictData);
      console.log(
        "更新到模型：",
        choosedModule.value,
        "更新到粒度：",
        choosedLevel.value
      );
      console.log("choosedModule：", choosedModule);
    }
    return {
      getIllustrationsPath,
      predictData,
      translator,
      startAnalyse,
      changeModule,
      Module,
      changeLevel,
    };
  },
});
</script>
