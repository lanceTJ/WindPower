<template>
  <!--begin::Menu-->
  <div
    class="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-600 menu-state-bg-light-primary fw-semobold py-4 fs-6 w-275px"
    data-kt-menu="true"
  >
    <!--begin::Menu item-->
    <div class="menu-item px-3">
      <div class="menu-content d-flex align-items-center px-3">
        <!--begin::Avatar-->
        <div
          class="symbol symbol-50px me-5"
          :style="`background-image: url(media/avatars/blank.png)`"
        >
          <img :src="userinfomation['avatar']" />
        </div>
        <!--end::Avatar-->

        <!--begin::Username-->
        <div class="d-flex flex-column">
          <div class="fw-bold d-flex align-items-center fs-5">
            {{ userinfomation["username"] }}
          </div>
          <div class="fw-semobold text-muted text-hover-primary fs-7">
            {{ userinfomation["email"] }}
          </div>
        </div>
        <!--end::Username-->
      </div>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu separator-->
    <div class="separator my-2"></div>
    <!--end::Menu separator-->

    <!--begin::Menu item-->
    <div class="menu-item px-5">
      <router-link to="/crafted/account/mydatasets" class="menu-link px-5">
        <span class="menu-text">{{ translate("myDataSets") }}</span>
        <span class="menu-badge">
          <span class="badge badge-light-success badge-circle fw-bold fs-7"
            >{{ userFiles["num"] }}
          </span>
        </span>
      </router-link>
    </div>
    <!--begin::Menu separator-->
    <div class="separator my-2"></div>
    <!--end::Menu separator-->

    <!--begin::Menu item-->
    <div
      class="menu-item px-5"
      data-kt-menu-trigger="hover"
      data-kt-menu-placement="left-start"
      data-kt-menu-flip="center, top"
    >
      <div class="menu-link px-5">
        <span class="menu-title position-relative">
          {{ translate("language") }}
          <span
            class="fs-8 rounded bg-light px-3 py-2 position-absolute translate-middle-y top-50 end-0"
          >
            {{ translate(currentLangugeLocale.name) }}
            <img
              class="w-15px h-15px rounded-1 ms-2"
              :src="currentLangugeLocale.flag"
              alt="metronic"
            />
          </span>
        </span>
      </div>

      <!--begin::Menu sub-->
      <div class="menu-sub menu-sub-dropdown w-175px py-4">
        <!--begin::Menu item-->
        <div class="menu-item px-3">
          <a
            @click="setLang('zh')"
            href="#"
            class="menu-link d-flex px-5"
            :class="{ active: currentLanguage('zh') }"
          >
            <span class="symbol symbol-20px me-4">
              <img
                class="rounded-1"
                src="media/flags/china.svg"
                alt="metronic"
              />
            </span>
            {{ translate("Chinese") }}
          </a>
        </div>
        <!--end::Menu item-->
        <!--begin::Menu item-->
        <div class="menu-item px-3">
          <a
            @click="setLang('en')"
            href="#"
            class="menu-link d-flex px-5"
            :class="{ active: currentLanguage('en') }"
          >
            <span class="symbol symbol-20px me-4">
              <img
                class="rounded-1"
                src="media/flags/united-states.svg"
                alt="metronic"
              />
            </span>
            {{ translate("English") }}
          </a>
        </div>
      </div>
      <!--end::Menu sub-->
    </div>
    <!--end::Menu item-->

    <!--begin::Menu separator-->
    <div class="separator my-2"></div>
    <!--end::Menu separator-->

    <!--begin::Menu item-->
    <div class="menu-item px-5 my-1">
      <router-link to="/crafted/account/settings" class="menu-link px-5">
        {{ translate("accountSettings") }}
      </router-link>
    </div>
    <!--end::Menu item-->

    <!--begin::Menu separator-->
    <div class="separator my-2"></div>
    <!--end::Menu separator-->
    <!--begin::Menu item-->
    <div class="menu-item px-5">
      <a @click="signOut()" class="menu-link px-5">
        {{ translate("logout") }}
      </a>
    </div>
    <!--end::Menu item-->
  </div>
  <!--end::Menu-->
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Actions } from "@/store/enums/StoreEnums";

export default defineComponent({
  name: "kt-user-menu",
  components: {},
  setup() {
    const router = useRouter();
    const i18n = useI18n();
    const { t, te } = useI18n();
    const store = useStore();

    const translate = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    const userinfomation = computed(() => {
      return store.getters.Userinfo;
    });
    const userFiles = computed(() => {
      return store.getters.UserFiles;
    });

    i18n.locale.value = localStorage.getItem("lang")
      ? (localStorage.getItem("lang") as string)
      : "zh";

    const countries = {
      zh: {
        flag: "media/flags/china.svg",
        name: "Chinese",
      },
      en: {
        flag: "media/flags/united-states.svg",
        name: "English",
      },
    };

    const signOut = () => {
      store
        .dispatch(Actions.LOGOUT)
        .then(() => router.push({ name: "sign-in" }));
    };
    const setLang = (lang) => {
      localStorage.setItem("lang", lang);
      i18n.locale.value = lang;
    };
    const currentLanguage = (lang) => {
      return i18n.locale.value === lang;
    };

    const currentLangugeLocale = computed(() => {
      return countries[i18n.locale.value];
    });

    return {
      signOut,
      setLang,
      currentLanguage,
      currentLangugeLocale,
      countries,
      translate,
      userinfomation,
      userFiles,
    };
  },
});
</script>
