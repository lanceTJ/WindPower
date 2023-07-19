<template>
  <!--begin::Menu wrapper-->
  <!--  <div class="header-menu align-items-stretchflex-shrink-0 flex-shrink-0">-->
  <div class="d-flex align-items-stretch flex-shrink-0">
    <!--begin::Menu-->
    <div class="d-flex align-items-center ms-1 ms-lg-3">
      <div class="symbol symbol-40px">
        <div class="symbol-label fs-2 fw-bold text-success">T</div>
      </div>

      <div class="symbol symbol-40px">
        <div class="symbol-label fs-2 fw-bold bg-danger text-inverse-danger">
          E
        </div>
      </div>

      <div class="symbol symbol-40px">
        <div class="symbol-label fs-2 fw-bold text-danger">N</div>
      </div>

      <div class="symbol symbol-40px">
        <div class="symbol-label fs-2 fw-bold bg-primary text-inverse-primary">
          F
        </div>
      </div>

      <div class="symbol symbol-40px">
        <div class="symbol-label fs-2 fw-bold text-warning">E</div>
      </div>

      <div class="symbol symbol-40px">
        <div class="symbol-label fs-2 fw-bold bg-info text-inverse-info">N</div>
      </div>
      <!--end::Menu-->
    </div>
  </div>
  <!--end::Menu wrapper-->
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import MainMenuConfig from "@/core/config/MainMenuConfig";
import { headerMenuIcons } from "@/core/helpers/config";
import { version } from "@/core/helpers/documentation";

export default defineComponent({
  name: "KTMenu",
  components: {},
  setup() {
    const { t, te } = useI18n();
    const route = useRoute();

    const hasActiveChildren = (match) => {
      return route.path.indexOf(match) !== -1;
    };

    const translate = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };

    return {
      hasActiveChildren,
      headerMenuIcons,
      MainMenuConfig,
      translate,
      version,
    };
  },
});
</script>
