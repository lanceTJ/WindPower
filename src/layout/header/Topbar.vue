<template>
  <!--begin::Toolbar wrapper-->
  <div class="d-flex align-items-stretch flex-shrink-0">
    <!--begin::Theme mode-->
    <div class="d-flex align-items-center ms-1 ms-lg-3">
      <!--begin::Menu toggle-->
      <a
        href="#"
        class="btn btn-icon btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40px"
        data-kt-menu-trigger="{default:'click', lg: 'hover'}"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
      >
        <span
          v-if="themeMode === 'light'"
          class="svg-icon theme-dark-hide svg-icon-2"
        >
          <inline-svg src="media/icons/duotune/general/gen060.svg" />
        </span>
        <span v-else class="svg-icon theme-light-hide svg-icon-2">
          <inline-svg src="media/icons/duotune/general/gen061.svg" />
        </span>
      </a>
      <!--begin::Menu toggle-->
      <KTThemeModeSwitcher></KTThemeModeSwitcher>
    </div>
    <!--end::Theme mode-->

    <!--begin::User-->
    <div
      class="d-flex align-items-center ms-1 ms-lg-3"
      id="kt_header_user_menu_toggle"
    >
      <!--begin::Menu-->
      <div
        class="cursor-pointer symbol symbol-30px symbol-md-40px"
        data-kt-menu-trigger="click"
        data-kt-menu-attach="parent"
        data-kt-menu-placement="bottom-end"
        data-kt-menu-flip="bottom"
      >
        <img :src="userinfo['avatar']" />
      </div>
      <KTUserMenu></KTUserMenu>
      <!--end::Menu-->
    </div>
    <!--end::User -->

    <!--begin::Heaeder menu toggle-->
    <div
      class="d-flex align-items-center d-lg-none ms-2 me-n3"
      title="Show header menu"
    >
      <div
        class="btn btn-icon btn-active-light-primary btn-custom w-30px h-30px w-md-40px h-md-40px"
        id="kt_header_menu_mobile_toggle"
      >
        <span class="svg-icon svg-icon-1">
          <inline-svg src="media/icons/duotune/text/txt001.svg" />
        </span>
      </div>
    </div>
    <!--end::Heaeder menu toggle-->
  </div>
  <!--end::Toolbar wrapper-->
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
// import KTSearch from "@/layout/header/partials/Search.vue";
// import KTNotificationsMenu from "@/layout/header/partials/NotificationsMenu.vue";
// import KTQuickLinksMenu from "@/layout/header/partials/QuickLinksMenu.vue";
import KTUserMenu from "@/layout/header/partials/UserMenu.vue";
import KTThemeModeSwitcher from "@/layout/theme-mode/ThemeModeSwitcher.vue";
import { useStore } from "vuex";

export default defineComponent({
  name: "header-topbar",
  components: {
    // KTSearch,
    // KTNotificationsMenu,
    // KTQuickLinksMenu,
    KTUserMenu,
    KTThemeModeSwitcher,
  },
  setup() {
    const store = useStore();
    const userinfo = computed(() => {
      return store.getters.Userinfo;
    });
    const themeMode = computed(() => {
      return store.getters.getThemeMode;
    });

    return {
      themeMode,
      userinfo,
    };
  },
});
</script>
