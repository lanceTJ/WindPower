<template>
  <!--begin::List Widget 5-->
  <div class="card" :class="widgetClasses">
    <!--begin::Header-->
    <div class="card-header align-items-center border-0">
      <h2 class="card-title align-items-start flex-column">
        <span class="fw-bold mb-2 text-dark">{{
          translator("ProcessLogs")
        }}</span>
        <span class="text-muted fw-semobold fs-7">{{
          translator("LogsDescription")
        }}</span>
      </h2>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div v-if="logs[0]" class="card-body pt-5">
      <!--begin::Timeline-->
      <div class="timeline-label">
        <template v-for="item in logs" :key="item">
          <!--begin::Item-->
          <div class="timeline-item">
            <!--begin::Label-->
            <div class="timeline-label fw-bold text-gray-800 fs-6">
              {{ item[0] }}
            </div>
            <!--end::Label-->

            <!--begin::Badge-->
            <div class="timeline-badge">
              <i class="fa fa-genderless text-success fs-1"></i>
            </div>
            <!--end::Badge-->

            <!--begin::Content-->
            <div class="timeline-content d-flex">
              <span class="fw-bold text-gray-800 ps-3">{{ item[1] }}</span>
            </div>
            <!--end::Content-->
          </div>
          <!--end::Item-->
        </template>
        <!--end::Item-->
      </div>
      <!--end::Timeline-->
    </div>
    <!--end: Card Body-->
    <div v-else class="align-items-center border-0">
      <p class="text-gray-400 fs-5 fw-semobold mb-13 text-center">
        <span v-html="translator('Nologs')"></span>
      </p>
      <div class="text-center px-5 text-center">
        <img
          src="media\illustrations\TFUsed\void.svg"
          alt=""
          class="mw-200px mh-200px"
        />
      </div>
    </div>
  </div>
  <!--end: List Widget 5-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import { watch, ref } from "vue";

export default defineComponent({
  name: "logCard",
  props: {
    widgetClasses: String,
    logs: {
      type: Array,
      required: true,
    },
  },
  components: {},
  setup(props) {
    const { t, te } = useI18n();
    const translator = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    const logsData = ref(props.logs);

    watch(
      () => props.logs,
      (newLogs) => {
        logsData.value = newLogs;
        console.log("IN LogCard,logs: ", props.logs);
      }
    );

    return {
      translator,
    };
  },
});
</script>
