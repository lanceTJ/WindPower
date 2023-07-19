<template>
  <!--begin::Menu 2-->
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold w-200px"
    data-kt-menu="true"
  >
    <!--begin::Menu item-->
    <div class="menu-item px-3">
      <div class="menu-content fs-6 text-dark fw-bold px-3 py-4">
        {{ translator("QuickActions") }}
      </div>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu separator-->
    <div class="separator mb-3 opacity-75"></div>
    <!--end::Menu separator-->

    <!--begin::Menu item-->
    <div class="menu-item px-3">
      <a
        id="kt_analyse"
        @click="analyse"
        ref="editButton"
        class="menu-link px-3"
      >
        <span class="svg-icon svg-icon-1 mx-3">
          <inline-svg src="media/icons/duotune/graphs/gra003.svg" />
        </span>
        {{ translator("Analyse") }}
      </a>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu item-->
    <div class="menu-item px-3">
      <a
        id="kt_predict"
        @click="predict"
        ref="predictButton"
        class="menu-link px-3"
      >
        <span class="svg-icon svg-icon-1 mx-3">
          <inline-svg src="media/icons/duotune/general/gen012.svg" />
        </span>
        {{ translator("Predict") }}
      </a>
    </div>
    <div class="menu-item px-3">
      <a id="kt_wash" @click="wash" ref="washButton" class="menu-link px-3">
        <span class="svg-icon svg-icon-1 mx-3">
          <inline-svg src="media/icons/duotune/general/gen011.svg" />
        </span>
        {{ translator("DataWasher") }}
      </a>
    </div>
    <!--end::Menu item-->
  </div>
  <!--end::Menu 2-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useI18n } from "vue-i18n";
import router from "@/router";

export default defineComponent({
  name: "dropdown-2",
  components: {},
  setup() {
    const { t, te } = useI18n();
    const translator = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    const wash = () => {
      router.push({ name: "wash" });
    };
    const predict = () => {
      router.push({ name: "predict" });
    };
    const analyse = () => {
      router.push({ name: "analyse" });
    };
    return {
      wash,
      predict,
      analyse,
      translator,
    };
  },
});
</script>
