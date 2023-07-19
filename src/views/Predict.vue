<template>
  <KTModalCard
    title="Predict"
    description="PredictDescription"
    image="media/illustrations/TFUsed/predictive_analytics.svg"
    button-text="StartPredict"
    @startAnalyse="startAnalyse"
    v-if="!predictData.base_aPower"
  ></KTModalCard>
  <div v-else>
    <analyse-title-card
      title="Dataset1"
      cardClasses="h-50"
      :level="1"
      @change="changeLevel"
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
      changeLevel(1);
      console.log("Predict started!");
    };
    const updatePredictData = (NewData) => {
      predictData.base_aPower = NewData.base_aPower;
      predictData.base_time = NewData.base_time;
      predictData.base_yd15 = NewData.base_yd15;
      predictData.pre_aPower = NewData.pre_aPower;
      predictData.pre_time = NewData.pre_time;
      predictData.pre_yd15 = NewData.pre_yd15;
    };

    onBeforeMount(() => {
      store.dispatch(Actions.PREDICT_FILE, 1);
      updatePredictData(store.getters.AnalyseData);
      console.log("IN BeforeMount ANALYSE VIEW, analysedata: ", predictData);
    });
    onMounted(() => {
      updatePredictData(store.getters.AnalyseData);
      console.log("IN Mounted ANALYSE VIEW, analysedata: ", predictData);
      changeLevel("1");
    });

    const changeLevel = async (level) => {
      await store.dispatch(Actions.PREDICT_FILE, level);
      updateAll(level);
    };

    function updateAll(level) {
      updatePredictData(store.getters.PredictData);
      console.log("更新到粒度：", level);
    }
    return {
      getIllustrationsPath,
      predictData,
      translator,
      startAnalyse,
      changeLevel,
    };
  },
});
</script>
