<template>
  <!--begin::Card-->
  <div class="card">
    <!--begin::Card body-->
    <div class="card-body p-0">
      <!--begin::Heading-->
      <div class="card-px text-center py-20 my-10">
        <!--begin::Title-->
        <h2 class="fs-2x fw-bold mb-10">{{ translator(title) }}</h2>
        <!--end::Title-->

        <!--begin::Description-->
        <p class="text-gray-400 fs-5 fw-semobold mb-13">
          <span v-html="translator(description)"></span>
        </p>
        <!--end::Description-->

        <!--begin::Action-->
        <button
          type="button"
          class="btn btn-primary btn-hover-rise er fs-6 px-8 py-4"
          ref="AnalyseButton"
          :onclick="click"
          @onclick="$emit('startAnalyse')"
        >
          <span class="indicator-label"> {{ translator(buttonText) }}！ </span>
          <span class="indicator-progress">
            {{ translator("pleaseWait") }}
            <span
              class="spinner-border spinner-border-sm align-middle ms-2"
            ></span>
          </span>
        </button>
        <!--end::Action-->
      </div>
      <!--end::Heading-->

      <!--begin::Illustration-->
      <div class="text-center px-5">
        <img :src="image" alt="" class="mw-100 mh-300px" />
      </div>
      <!--end::Illustration-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "modal-card",
  props: {
    title: String,
    description: String,
    buttonText: String,
    image: String,
  },
  components: {},
  setup() {
    const { t, te } = useI18n();
    const AnalyseButton = ref<HTMLButtonElement | null>(null);
    const translator = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    const click = () => {
      if (AnalyseButton.value) {
        // eslint-disable-next-line
        AnalyseButton.value!.disabled = true;
        // Activate indicator
        AnalyseButton.value.setAttribute("data-kt-indicator", "on");
      }
    };
    return {
      translator,
      click,
      AnalyseButton,
    };
  },
});
</script>
