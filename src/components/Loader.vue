<template>
  <!--begin::Page loader-->
  <template v-if="loaderType === 'spinner-message'">
    <div class="page-loader flex-column">
      <span class="spinner-border text-primary" role="status"></span>
      <span class="text-muted fs-6 fw-semobold mt-5"
        >{{ translate("Loading") }}...</span
      >
    </div>
  </template>
  <template v-else-if="loaderType === 'spinner-logo'">
    <div class="page-loader flex-column">
      <img alt="Logo" class="max-h-75px" :src="logo" />

      <div class="d-flex align-items-center mt-5">
        <span class="spinner-border text-primary" role="status"></span>
        <span class="text-muted fs-6 fw-semobold ms-5"
          >{{ translate("Loading") }}...</span
        >
      </div>
    </div>
  </template>
  <template v-else>
    <div class="page-loader">
      <span class="spinner-border text-primary" role="status">
        <span class="visually-hidden">{{ translate("Loading") }}...</span>
      </span>
    </div>
  </template>
  <!--end::Page Loader-->
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useStore } from "vuex";
import { useI18n } from "vue-i18n";
// import { Actions, Mutations } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "theme-loader",
  props: {
    logo: String,
  },
  setup() {
    const store = useStore();
    const { t, te } = useI18n();

    const translate = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    const loaderType = computed(() => {
      return store.getters.layoutConfig("loader.type");
    });

    return {
      loaderType,
      translate,
    };
  },
});
</script>
