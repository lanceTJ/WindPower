<template>
  <!--begin::Card-->
  <div
    disabled="true"
    class="card border border-2 border-gray-300 border-hover"
  >
    <!--begin::Card header-->
    <div class="card-header border-0 pt-9">
      <!--begin::Card Title-->
      <div class="card-title m-0">
        <!--begin::Avatar-->
        <div class="symbol symbol-50px w-50px bg-light">
          <img :src="getIcon" alt="image" class="p-3" />
        </div>
        <!--end::Avatar-->
      </div>
      <!--end::Car Title-->
      <div class="card-toolbar">
        <!--begin::Menu-->
        <button
          type="button"
          class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary btn-hover-scale"
          data-kt-menu-trigger="click"
          data-kt-menu-placement="bottom-end"
          data-kt-menu-flip="top-end"
        >
          <span class="svg-icon svg-icon-2">
            <inline-svg src="media/icons/duotune/general/gen024.svg" />
          </span>
        </button>
        <Dropdown2></Dropdown2>
        <!--end::Menu-->
      </div>
      <!--end::Card toolbar-->
    </div>
    <!--end:: Card header-->

    <!--begin:: Card body-->
    <div class="card-body p-9">
      <!--begin::Name-->
      <div class="fs-3 fw-bold text-dark">
        {{ getTitle }}
      </div>
      <!--end::Name-->

      <!--begin::Description-->
      <p class="text-gray-400 fw-semobold fs-5 mt-1 mb-7">
        {{ getDescription }}
      </p>
      <!--end::Description-->

      <!--begin::Info-->
      <div class="my-2">
        <h3 class="fs-6 text-gray-800 fw-bold">
          {{ translator("CoverTime") }}
        </h3>
      </div>
      <div class="d-flex flex-wrap mb-5 my-3">
        <!--begin::BeginDate-->
        <div
          class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-7 mb-3"
        >
          <div class="fs-6 text-gray-800 fw-bold">{{ getBeginDate }}</div>
          <div class="fs-6 text-gray-800 fw-bold">{{ getBeginTime }}</div>
        </div>
        <!--end::BeginDate-->

        <!--begin::EndDate-->
        <div
          class="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 mb-3"
        >
          <div class="fs-6 text-gray-800 fw-bold">{{ getEndDate }}</div>
          <div class="fs-6 text-gray-800 fw-bold">{{ getEndTime }}</div>
        </div>
        <!--end::EndDate-->
      </div>
      <div class="separator my-5"></div>
      <!--end::Info-->

      <!--begin::Progress-->
      <!--end::Progress-->
      <div class="d-flex">
        <a
          id="kt_download"
          @click="download"
          ref="downloadButton"
          class="btn btn-light-primary btn-hover-scale me-2"
        >
          <span class="svg-icon svg-icon-1">
            <inline-svg src="media/icons/duotune/arrows/arr004.svg" />
          </span>
          {{ translator("Download") }}
        </a>
        <a
          id="delete"
          @click="Delete"
          ref="deleteButton"
          class="btn btn-primary btn-hover-scale me-2"
        >
          <span class="svg-icon svg-icon-1">
            <inline-svg src="media/icons/duotune/coding/cod001.svg" />
          </span>
          {{ translator("Delete") }}
        </a>
      </div>
    </div>
    <!--end:: Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useI18n } from "vue-i18n";
import Dropdown2 from "@/components/dropdown/Dropdown2.vue";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import router from "@/router";
import Swal from "sweetalert2/dist/sweetalert2.min.js";

export default defineComponent({
  name: "KTCard",
  components: { Dropdown2 },
  props: {
    status: String,

    icon: String,

    title: String,

    description: String,

    beginDate: String,

    beginTime: String,

    endDate: String,

    endTime: String,

    formId: Number,
  },
  setup(props) {
    const store = useStore();
    const { t, te } = useI18n();
    const translator = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    const download = async () => {
      await store.dispatch(Actions.DOWNLOAD_FILE, props);
      console.log("downloading: ", props.formId);
    };
    const edit = () => {
      console.log("editing: ", props.formId);
    };
    const analyse = () => {
      console.log("analysing: ", props.formId);
    };
    const predict = () => {
      console.log("predicting: ", props.formId);
    };
    const getDescription = computed(() => {
      return props.description
        ? props.description
        : "CRM App application to HR efficiency";
    });

    const getBeginDate = computed(() => {
      return props.beginDate ? props.beginDate : "Feb 21, 2021";
    });

    const getIcon = computed(() => {
      const defaultIcon = "media/icons/number/" + props.formId + ".svg";
      return props.icon ? props.icon : defaultIcon;
    });

    const getEndDate = computed(() => {
      return props.endDate ? props.endDate : "2002-10-9";
    });

    const getBeginTime = computed(() => {
      return props.beginTime ? props.beginTime : "23:00";
    });

    const getEndTime = computed(() => {
      return props.endTime ? props.endTime : "23:00";
    });

    const getStatus = computed(() => {
      return props.status ? props.status : "1";
    });

    const getTitle = computed(() => {
      return props.title ? props.title : "Demo2";
    });
    const Delete = async () => {
      console.log("deleteFile: ");
      await store.dispatch(Actions.DELITE_FILE, props);
      const error = store.getters.getFileError;
      const alert =
        error === "The user does not exist or is not logged in"
          ? "用户信息验证失败，请重新登录"
          : error === "No form exists"
          ? "已删除，请刷新页面"
          : "网络错误";
      if (error === "success") {
        Swal.fire({
          text: "删除成功!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "继续",
          customClass: {
            confirmButton: "btn fw-semobold btn-light-primary",
          },
        }).then(function () {
          // Go to page after successfully login
          router.push({ name: "dashboard" });
        });
      } else {
        Swal.fire({
          text: alert,
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "重试",
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        }).then(function () {
          // if (submitButton.value) {
          //   submitButton.value!.disabled = false;
          //   submitButton.value?.removeAttribute("data-kt-indicator");
          // }
        });
      }
    };

    return {
      getTitle,
      getBeginTime,
      getEndTime,
      edit,
      translator,
      analyse,
      predict,
      download,
      getDescription,
      getBeginDate,
      Delete,
      getEndDate,
      getStatus,
      getIcon,
    };
  },
});
</script>
