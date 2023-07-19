<template>
  <!--begin::Modal - Share & Earn-->
  <div
    class="modal fade"
    id="kt_modal_add_datasets"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog modal-dialog-centered mw-800px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header pb-0 border-0 justify-content-end">
          <!--begin::Close-->
          <div
            class="btn btn-sm btn-icon btn-active-color-primary"
            data-bs-dismiss="modal"
          >
            <span class="svg-icon svg-icon-1">
              <inline-svg src="media/icons/duotune/arrows/arr061.svg" />
            </span>
          </div>
          <!--end::Close-->
        </div>
        <!--begin::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body scroll-y pt-0 pb-15">
          <!--begin::Wrapper-->
          <div class="mw-lg-600px mx-auto">
            <!--begin::Heading-->
            <div class="mb-13 text-center">
              <!--begin::Title-->
              <h1 class="mb-3">{{ translator("AddDatasetTitle") }}</h1>
              <!--end::Title-->

              <!--begin::Description-->
              <div class="text-gray-400 fw-semobold fs-5">
                {{ translator("AddDatasetsDescription") }}
              </div>
              <!--end::Description-->
            </div>
            <!--end::Heading-->

            <!--begin::Input group-->
            <div class="mb-10">
              <!--begin::Title-->
              <h4 class="fs-5 fw-semobold text-gray-800">
                {{ translator("UploadFileRules") }}.
              </h4>
              <!--end::Title-->
              <div class="d-flex">
                <i class="btn btn-icon btn-twitter w-100">
                  <input
                    type="file"
                    id="testFile"
                    @change="loadFile"
                    class="form-control form-control-lg file-loading"
                    lang="zh"
                  />
                </i>
              </div>
              <!--end::Title-->
            </div>
            <!--end::Input group-->

            <!--begin::Actions-->
            <div class="d-flex">
              <button
                class="btn btn-icon btn-twitter w-100"
                :onclick="uploadFile"
                ref="uploadButton"
                type="upload"
                id="kt-upload"
                tabindex="3"
              >
                <span class="indicator-label">
                  {{ translator("Upload") }}！
                </span>
                <span class="indicator-progress">
                  {{ translator("pleaseWait") }}
                  <span
                    class="spinner-border spinner-border-sm align-middle ms-2"
                  ></span>
                </span>
              </button>
            </div>
            <!--begin::Actions-->
            <!--            <div class="text-center">-->
            <!--              &lt;!&ndash;begin::Submit button&ndash;&gt;-->
            <!--              <button-->
            <!--                tabindex="3"-->
            <!--                type="upload"-->
            <!--                @change="loadFile"-->
            <!--                ref="uploadButton"-->
            <!--                id="kt-upload"-->
            <!--                class="btn btn-lg btn-primary w-100 mb-5"-->
            <!--              ></button>-->
            <!--            </div>-->
            <!--end::Actions-->
            <!--end::Actions-->
          </div>
          <!--end::Wrapper-->
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::Modal - Share & Earn-->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { useRouter } from "vue-router";

export default defineComponent({
  name: "upload_file_modal",
  components: {},
  setup() {
    const { t, te } = useI18n();
    const store = useStore();
    const router = useRouter();
    const uploadButton = ref<HTMLButtonElement | null>(null);
    let target;

    const loadFile = () => {
      target = event?.target as HTMLInputElement;
      console.log("loading... ", target);
    };
    const uploadFile = async () => {
      if (uploadButton.value) {
        // eslint-disable-next-line
        uploadButton.value!.disabled = true;
        // Activate indicator
        uploadButton.value.setAttribute("data-kt-indicator", "on");
      }
      if (!target) {
        Swal.fire({
          text: "请先选择文件",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "好的",
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        }).then(function () {
          if (uploadButton.value) {
            uploadButton.value!.disabled = false;
            uploadButton.value?.removeAttribute("data-kt-indicator");
          }
        });
        return;
      }
      const file = target.files ? target.files[0] : null;
      console.log("uploading...");
      if (!file) {
        return;
      }
      console.log("FORMDATA: ", file);
      store.dispatch(Mutations.SET_FILE_ERROR, "");
      await store.dispatch(Actions.UPLOAD_FILE, { file: file });
      const error = store.getters.getFileError;
      console.log("File upload error message: ", error);

      if (error == "File uploaded!") {
        Swal.fire({
          text: "上传成功!",
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
          text: "上传失败",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "重试",
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        }).then(function () {
          if (uploadButton.value) {
            uploadButton.value!.disabled = false;
            uploadButton.value?.removeAttribute("data-kt-indicator");
          }
        });
      }
    };

    const translator = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    return {
      translator,
      uploadFile,
      loadFile,
      uploadButton,
    };
  },
});
</script>
