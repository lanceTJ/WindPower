<template>
  <!--begin::details View-->
  <div class="card mb-5 mb-xl-10" id="kt_profile_details_view">
    <!--begin::Card header-->
    <div class="card-header cursor-pointer">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3>{{ translate("ProfileDetails") }}</h3>
      </div>
      <!--end::Card title-->

      <!--begin::Action-->
      <router-link
        to="/crafted/account/settings"
        class="btn btn-primary align-self-center"
        >{{ translate("EditProfile") }}</router-link
      >
      <!--end::Action-->
    </div>
    <!--begin::Card header-->

    <!--begin::Card body-->
    <div class="card-body p-9">
      <!--begin::Row-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">{{
          translate("Username")
        }}</label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 text-dark">
            {{ userinfomation["username"] }}
          </span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Row-->

      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">
          {{ translate("Age") }}
        </label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 fv-row">
          <span class="fw-bold fs-6 me-2">{{ userinfomation["age"] }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">
          {{ translate("Email") }}
        </label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8 d-flex align-items-center">
          <span class="fw-bold fs-6 me-2">{{ userinfomation["email"] }}</span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">
          {{ translate("Birthday") }}
        </label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 me-2">
            {{ userinfomation["birthday"] }}
          </span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="row mb-7">
        <!--begin::Label-->
        <label class="col-lg-4 fw-semobold text-muted">
          {{ translate("Gender") }}
        </label>
        <!--end::Label-->

        <!--begin::Col-->
        <div class="col-lg-8">
          <span class="fw-bold fs-6 me-2">
            {{ translate(userinfomation["gender"]) }}
          </span>
        </div>
        <!--end::Col-->
      </div>
      <!--end::Input group-->

      <!--      &lt;!&ndash;begin::Input group&ndash;&gt;-->
      <!--      <div class="row mb-7">-->
      <!--        &lt;!&ndash;begin::Label&ndash;&gt;-->
      <!--        <label class="col-lg-4 fw-semobold text-muted">Communication</label>-->
      <!--        &lt;!&ndash;end::Label&ndash;&gt;-->

      <!--        &lt;!&ndash;begin::Col&ndash;&gt;-->
      <!--        <div class="col-lg-8">-->
      <!--          <span class="fw-bold fs-6 text-dark">Email, Phone</span>-->
      <!--        </div>-->
      <!--        &lt;!&ndash;end::Col&ndash;&gt;-->
      <!--      </div>-->
      <!--end::Input group-->

      <!--begin::Input group-->
      <!--      <div class="row mb-10">-->
      <!--        &lt;!&ndash;begin::Label&ndash;&gt;-->
      <!--        <label class="col-lg-4 fw-semobold text-muted">Allow Changes</label>-->
      <!--        &lt;!&ndash;begin::Label&ndash;&gt;-->

      <!--        &lt;!&ndash;begin::Label&ndash;&gt;-->
      <!--        <div class="col-lg-8">-->
      <!--          <span class="fw-semobold fs-6">Yes</span>-->
      <!--        </div>-->
      <!--        &lt;!&ndash;begin::Label&ndash;&gt;-->
      <!--      </div>-->
      <!--end::Input group-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::details View-->
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";

export default defineComponent({
  name: "account-overview",
  components: {},
  setup() {
    const { t, te } = useI18n();
    const store = useStore();
    let userinfomation = store.getters.Userinfo;
    userinfomation["gender"] =
      userinfomation["gender"] === 1 ? "Male" : "Female";

    const translate = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    onMounted(() => {
      setCurrentPageBreadcrumbs("Overview", ["Account"]);
    });
    return {
      translate,
      userinfomation,
    };
  },
});
</script>
