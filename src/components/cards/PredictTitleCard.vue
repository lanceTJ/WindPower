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
              v-model="choosedLevel"
              class="form-select column"
              @input="$emit('change', $event.target.value)"
            >
              <option v-for="(a, index) in Attribute" :key="index" :value="a">
                {{ a }}
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
  },
  components: {},
  setup(props) {
    const { t, te } = useI18n();
    const choosedLevel = ref(props.level);
    const translator = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    const Attribute = [1, 2, 3];
    return {
      translator,
      Attribute,
      choosedLevel,
    };
  },
});
</script>
