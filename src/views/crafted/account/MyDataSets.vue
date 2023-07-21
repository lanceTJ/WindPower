<template>
  <!--begin::Toolbar-->
  <div class="d-flex flex-wrap flex-stack my-5">
    <!--begin::Heading-->
    <h2 class="fs-2 fw-semobold my-2">
      {{ translator("myDataSets") }}
      <span class="fs-6 text-gray-400 ms-1"
        >{{ translator("TheseAreYourDatasets") }}！</span
      >
    </h2>
    <!--end::Heading-->

    <!--begin::Controls-->
    <div class="d-flex flex-wrap my-1">
      <!--begin::Select wrapper-->
      <a
        type="button"
        class="btn btn-primary btn-hover-rise er fs-6 px-8 py-4"
        href="#/adddata/"
      >
        <span class="svg-icon svg-icon-1">
          <inline-svg src="media/icons/duotune/files/fil009.svg" />
        </span>
        {{ translator("AddDatasetsButton") }}
      </a>
      <!--end::Select wrapper-->
    </div>
    <!--end::Controls-->
  </div>
  <!--end::Toolbar-->

  <!--begin::Row-->
  <div class="row g-6 g-xl-9">
    <!--begin::Col-->
    <div v-for="file in files" :key="file" class="col-md-6 col-xl-4">
      <KTCard
        :formId="file.formId"
        :beginDate="file.beginDate"
        :endDate="file.endDate"
        :beginTime="file.beginTime"
        :endTime="file.endTime"
        :title="file.title"
        :icon="file.icon"
        :description="file.description"
      ></KTCard>
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted } from "vue";
import KTCard from "@/components/cards/DataSetCard.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";

export default defineComponent({
  name: "profile-projects",
  components: {
    KTCard,
  },
  setup() {
    const { t, te } = useI18n();
    const store = useStore();
    const files = computed(() => {
      return store.getters.UserFiles.info;
    });
    // const files = computed(() => {
    //   return filesinfo.value.info;
    // });
    console.log("filesinfo: ", files);
    const translator = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    onMounted(() => {
      setCurrentPageBreadcrumbs("Projects", ["Pages", "Profile"]);
    });

    return {
      translator,
      files,
    };
  },
});
</script>
