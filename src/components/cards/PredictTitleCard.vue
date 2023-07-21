<template>
  <!--begin::Card-->
  <div class="card">
    <!--begin::Card body-->
    <div class="card-body p-0">
      <div class="container grid-lg my-5">
        <div class="columns mt-1-5 d-flex flex-row">
          <!-- title -->
          <div class="column col-4 col-md-6">
            <h1 class="text-left">{{ translator(title) }}</h1>
          </div>
          <div class="column col-8 col-md-6 d-flex flex-row">
            <select
              v-model="choosedModule"
              class="form-select column mx-2"
              @input="$emit('changeModule', $event.target.value)"
            >
              <option v-for="(a, index) in modules" :key="index" :value="a">
                {{ a }}
              </option>
            </select>
            <select
              v-model="choosedLevel"
              class="form-select column mx-2"
              @input="$emit('changeLevel', $event.target.value)"
            >
              <option v-for="(a, index) in Attribute" :key="index" :value="a">
                预测粒度{{ a }}
              </option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { defineComponent, ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import FlagValueCard from "@/components/cards/FlagValueCard.vue";
export default defineComponent({
  name: "analyse_title_card",
  props: {
    title: { type: String, required: true },
    level: Number,
    module: String,
  },
  components: {},
  setup(props) {
    const { t, te } = useI18n();
    const choosedLevel = ref(props.level);
    const choosedModule = ref(props.module);
    const translator = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    const Attribute = [1, 2, 3];
    const modules = ["回归预测模型", "时序预测模型"];
    return {
      translator,
      Attribute,
      choosedLevel,
      modules,
      choosedModule,
    };
  },
});
</script>
