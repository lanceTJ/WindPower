<template>
  <!--begin::Tables Widget 9-->
  <div class="card" :class="widgetClasses">
    <!--begin::Header-->
    <div class="card-header border-0 pt-5">
      <h3 class="card-title align-items-start flex-column">
        <span class="card-label fw-bold fs-3 mb-1">
          {{ translator("myDataSets") }}
        </span>

        <span class="text-muted mt-1 fw-semobold fs-7">
          {{ translator("QuickView") }}
        </span>
      </h3>

      <div
        class="card-toolbar"
        data-bs-toggle="tooltip"
        data-bs-placement="top"
        data-bs-trigger="hover"
        :title="translator('AddDatasetsButton')"
      >
        <a
          type="button"
          class="btn btn-sm btn-light-primary btn-hover-scale"
          data-bs-toggle="modal"
          data-bs-target="#kt_modal_add_datasets"
        >
          <span class="svg-icon svg-icon-3">
            <inline-svg src="media/icons/duotune/arrows/arr075.svg" />
          </span>
          {{ translator("AddDatasetsButton") }}
        </a>
      </div>
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body py-3">
      <!--begin::Table container-->
      <div class="table-responsive">
        <!--begin::Table-->
        <div class="verflow-y: auto mh-400px">
          <table
            class="table table-condensed table-row-dashed table-row-gray-300 align-middle gs-0 gy-4"
          >
            <!--begin::Table head-->
            <thead>
              <tr class="fw-bold text-muted">
                <th class="w-25px">
                  <div
                    class="form-check form-check-sm form-check-custom form-check-solid"
                  >
                    <input
                      class="form-check-input"
                      type="checkbox"
                      @change="
                        checkedRows =
                          checkedRows.length === 6 ? [] : [0, 1, 2, 3, 4, 5]
                      "
                    />
                  </div>
                </th>
                <th class="min-w-150px">{{ translator("DataSet") }}</th>
                <th class="min-w-140px">{{ translator("InitialTime") }}</th>
                <th class="min-w-120px">{{ translator("EndTime") }}</th>
                <th class="min-w-100px text-end">
                  {{ translator("QuickActions") }}
                </th>
                <th class="last"></th>
              </tr>
            </thead>
            <!--end::Table head-->

            <!--begin::Table body-->
            <tbody>
              <template v-for="item in list" :key="item">
                <tr>
                  <td>
                    <div
                      class="form-check form-check-sm form-check-custom form-check-solid"
                    >
                      <input
                        class="form-check-input widget-9-check"
                        type="checkbox"
                        v-model="checkedRows"
                      />
                    </div>
                  </td>

                  <td>
                    <div class="d-flex align-items-center">
                      <div class="symbol symbol-45px me-5">
                        <img :src="item.icon" />
                      </div>
                      <div class="d-flex justify-content-start flex-column">
                        <a
                          href="#"
                          class="text-dark fw-bold text-hover-primary fs-6"
                          >{{ item.title }}</a
                        >

                        <span
                          class="text-muted fw-semobold text-muted d-block fs-7"
                          >{{ item.description }}</span
                        >
                      </div>
                    </div>
                  </td>

                  <td>
                    <a
                      class="text-dark fw-bold text-hover-primary d-block fs-6"
                      >{{ item.beginDate }}</a
                    >
                    <span
                      class="text-muted fw-semobold text-muted d-block fs-7"
                      >{{ item.beginTime }}</span
                    >
                  </td>

                  <td>
                    <a
                      class="text-dark fw-bold text-hover-primary d-block fs-6"
                      >{{ item.endDate }}</a
                    >
                    <span
                      class="text-muted fw-semobold text-muted d-block fs-7"
                      >{{ item.endTime }}</span
                    >
                  </td>

                  <td class="text-end">
                    <button
                      @click="download(item)"
                      class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    >
                      <span class="svg-icon svg-icon-3">
                        <inline-svg
                          src="media/icons/duotune/arrows/arr004.svg"
                        />
                      </span>
                    </button>
                    <a
                      href="#"
                      class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    >
                      <span class="svg-icon svg-icon-3">
                        <inline-svg src="media/icons/duotune/art/art005.svg" />
                      </span>
                    </a>

                    <button
                      @click="deleteFile(item)"
                      class="btn btn-icon btn-bg-light btn-active-color-primary btn-sm"
                    >
                      <span class="svg-icon svg-icon-3">
                        <inline-svg
                          src="media/icons/duotune/general/gen027.svg"
                        />
                      </span>
                    </button>
                  </td>
                </tr>
              </template>
            </tbody>
            <!--end::Table body-->
          </table>
        </div>
        <!--end::Table-->
      </div>
      <!--end::Table container-->
    </div>
    <!--begin::Body-->
  </div>
  <upload_file_modal></upload_file_modal>

  <!--end::Tables Widget 9-->
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import upload_file_modal from "@/components/modals/general/UploadFile.vue";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import router from "@/router";

export default defineComponent({
  name: "kt-widget-9",
  components: {
    upload_file_modal,
  },
  props: {
    widgetClasses: String,
  },
  setup() {
    const store = useStore();
    const checkedRows = ref([]);
    const { t, te } = useI18n();
    const translator = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };

    const list = computed(() => {
      return store.getters.UserFiles.info;
    });

    const getDescription = computed(() => {
      return list.value.description
        ? list.value.description
        : "CRM App application to HR efficiency";
    });

    const getBeginDate = computed(() => {
      return list.value.beginDate ? list.value.beginDate : "Feb 21, 2021";
    });

    const getEndDate = computed(() => {
      return list.value.endDate ? list.value.endDate : "2002-10-9";
    });

    const getBeginTime = computed(() => {
      return list.value.beginTime ? list.value.beginTime : "23:00";
    });

    const getEndTime = computed(() => {
      return list.value.endTime ? list.value.endTime : "23:00";
    });

    const getStatus = computed(() => {
      return list.value.status ? list.value.status : "1";
    });

    const getTitle = computed(() => {
      return list.value.title ? list.value.title : "Demo2";
    });
    const download = (item) => {
      console.log("downloading: ", item);
      store.dispatch(Actions.DOWNLOAD_FILE, item);
    };
    const deleteFile = async (item) => {
      console.log("deleteFile: ", item);
      await store.dispatch(Actions.DELITE_FILE, item);
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
      deleteFile,
      getTitle,
      getBeginTime,
      getEndTime,
      translator,
      getDescription,
      download,
      getBeginDate,
      getEndDate,
      getStatus,
      list,
      checkedRows,
    };
  },
});
</script>
