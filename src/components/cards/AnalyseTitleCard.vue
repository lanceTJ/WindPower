<template>
  <!--begin::Card-->
  <div class="card">
    <!--begin::Card body-->
    <div class="card-body p-0">
      <div class="container grid-lg my-5">
        <div class="columns mt-1-5 d-flex flex-row">
          <!-- title -->
          <div class="column col-6 col-md-8">
            <h1 class="text-left">{{ title }}</h1>
          </div>
          <div class="column col-6 col-md-4 d-flex flex-row">
            <h3 class="column col-3 px-3">{{ translator("ChooseParam") }}</h3>
            <select
              v-model="choosedView"
              class="form-select column"
              @input="$emit('change', $event.target.value)"
            >
              <option v-for="(a, index) in Attribute" :key="index" :value="a">
                {{ translator(a) }}
              </option>
            </select>
          </div>
        </div>
        <div
          class="columns mt-1 d-flex flex-column flex-md-row"
          style="display: flex; flex-wrap: wrap"
        >
          <!-- featured figures -->
          <FlagValueCard
            v-for="{ Fname, value, units } in FValues"
            :key="Fname"
            class="flex-column text-center border border-dark mx-3"
            style="flex: 1"
            :title="Fname"
            :content="value"
          >
            <div class="text-gray">{{ translator(Fname) }}</div>
            <div class="figure">{{ value }}</div>
            <div class="text-gray">{{ units }}</div>
          </FlagValueCard>
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
    FValues: { type: Array, required: true },
    view: String,
  },
  components: {
    FlagValueCard,
  },
  setup(props) {
    const { t, te } = useI18n();
    const choosedView = ref(props.view);
    const translator = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    console.log("PROPS.FVALUEs", props.FValues);
    watch(props.FValues, (newData) => {
      console.log("Flag Values Changed TO INFO: ", newData);
    });
    const Attribute = [
      "WINDSPEED",
      "PREPOWER",
      "WINDDIRECTION",
      "TEMPERATURE",
      "HUMIDITY",
      "PRESSURE",
      "ROUNDAWS1",
      "ROUNDAPOWER0",
      "YD15",
    ];
    return {
      translator,
      Attribute,
      choosedView,
    };
  },
});
</script>
