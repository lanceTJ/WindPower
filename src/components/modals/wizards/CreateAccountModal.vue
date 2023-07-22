<template>
  <!--begin::Modal - Create account-->
  <div
    class="modal fade"
    id="kt_modal_create_account"
    ref="createAccountModalRef"
    tabindex="-1"
    aria-hidden="true"
  >
    <!--begin::Modal dialog-->
    <div class="modal-dialog mw-1000px">
      <!--begin::Modal content-->
      <div class="modal-content">
        <!--begin::Modal header-->
        <div class="modal-header">
          <!--begin::Title-->
          <h2>{{ translator("DataWasher") }}</h2>
          <!--end::Title-->

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
        <!--end::Modal header-->

        <!--begin::Modal body-->
        <div class="modal-body scroll-y m-5">
          <!--begin::Stepper-->
          <div
            ref="createAccountRef"
            class="stepper stepper-links d-flex flex-column"
            id="kt_create_account_stepper"
          >
            <!--begin::Nav-->
            <div class="stepper-nav py-5">
              <!--begin::Step 1-->
              <div class="stepper-item current" data-kt-stepper-element="nav">
                <h3 class="stepper-title">{{ translator("ChooseDataset") }}</h3>
              </div>
              <!--end::Step 1-->

              <!--begin::Step 2-->
              <div class="stepper-item" data-kt-stepper-element="nav">
                <h3 class="stepper-title">{{ translator("LevelSet") }}</h3>
              </div>
              <!--end::Step 2-->

              <!--begin::Step 3-->
              <div class="stepper-item" data-kt-stepper-element="nav">
                <h3 class="stepper-title">{{ translator("ResultCheck") }}</h3>
              </div>
              <!--end::Step 3-->
            </div>
            <!--end::Nav-->

            <!--begin::Form-->
            <form
              class="mx-auto mw-600px w-100 py-10"
              novalidate="novalidate"
              id="kt_create_account_form"
              @submit="handleStep"
            >
              <!--begin::Step 1-->
              <div class="current" data-kt-stepper-element="content">
                <!--begin::Wrapper-->
                <div class="w-100">
                  <!--begin::Heading-->
                  <div class="mh-50px pb-10 pb-lg-15">
                    <!--begin::Title-->
                    <h2 class="fw-bold d-flex align-items-center text-dark">
                      {{ translator("ChooseDataset") }}
                    </h2>
                    <!--end::Title-->
                  </div>
                  <!--end::Heading-->

                  <!--begin::Input group-->
                  <div class="mh-400px scroll-y fv-row">
                    <!--begin::Row-->
                    <template v-for="item in userfiles" :key="item">
                      <!--begin::Col-->
                      <div class="col">
                        <!--begin::Option-->
                        <input
                          type="radio"
                          class="btn-check"
                          @click="selectForm(item.formId)"
                          name="formId"
                          :value="item.formId"
                          checked="checked"
                          :id="'kt_' + item.formId"
                          v-model="formData.formId"
                        />
                        <label
                          class="btn btn-outline btn-outline-dashed btn-outline-default p-7 d-flex align-items-center mb-1"
                          :for="'kt_' + item.formId"
                        >
                          <span class="svg-icon svg-icon-3x me-5">
                            <inline-svg :src="item.icon" />
                          </span>

                          <!--begin::Info-->
                          <span class="d-block fw-semobold text-start">
                            <span class="text-dark fw-bold d-block fs-4 mb-2">
                              {{ item.title }}
                            </span>
                            <span class="text-gray-400 fw-semobold fs-6">{{
                              item.description
                            }}</span>
                          </span>
                          <!--end::Info-->
                        </label>
                        <!--end::Option-->
                      </div>
                      <!--end::Col-->
                    </template>
                    <!--end::Row-->
                  </div>
                  <!--end::Input group-->
                </div>
                <!--end::Wrapper-->
              </div>
              <!--end::Step 1-->

              <!--begin::Step 2-->
              <div data-kt-stepper-element="content">
                <div class="row mt-3">
                  <!--begin::Col-->
                  <div class="col-lg-6 mb-10 mb-lg-0">
                    <!--begin::Tabs-->
                    <div class="nav mh-600px scroll-y">
                      <div class="col-11 mx-3">
                        <template v-for="(level, index) in levels" :key="index">
                          <!--begin::Tab link-->
                          <div
                            @click="
                              selected = level.title;
                              selectLevel(index);
                            "
                            class="nav-link btn btn-outline mx-0 my-0 btn-outline-dashed btn-color-dark d-flex flex-stack text-start p-5 mb-6"
                            :class="[
                              index !== levels.length - 1 && 'mb-6',
                              level.default && 'active',
                              !level.custom && 'btn-active btn-active-primary',
                            ]"
                            data-bs-toggle="tab"
                            :data-bs-target="`#kt_upgrade_level_${index}`"
                          >
                            <!--end::Description-->
                            <div class="d-flex align-items-center me-2">
                              <!--begin::Radio-->
                              <div
                                class="form-check form-check-custom form-check-solid form-check-success me-6"
                              >
                                <input
                                  class="form-check-input"
                                  type="radio"
                                  name="level"
                                  :value="level.title"
                                  :checked="selected === level.title"
                                />
                              </div>
                              <!--end::Radio-->

                              <!--begin::Info-->
                              <div class="flex-grow-1">
                                <h2
                                  class="d-flex align-items-center fs-2 fw-bold flex-wrap"
                                >
                                  {{ level.title }}

                                  <span
                                    v-if="level.label"
                                    class="badge badge-light-success ms-2 fs-7"
                                    >{{ translator(level.label) }}</span
                                  >
                                </h2>
                                <div class="fw-semobold opacity-50">
                                  {{ level.subTitle }}
                                </div>
                              </div>
                              <!--end::Info-->
                            </div>
                            <!--end::Description-->
                          </div>
                          <!--end::Tab link-->
                        </template>
                      </div>
                    </div>
                    <!--end::Tabs-->
                  </div>
                  <!--end::Col-->

                  <!--begin::Col-->
                  <div class="col-lg-6">
                    <!--begin::Tab content-->
                    <div class="tab-content rounded h-100 bg-light p-10">
                      <template v-for="(level, index) in levels" :key="index">
                        <!--begin::Tab Pane-->
                        <div
                          v-if="!level.custom"
                          :class="[level.default && 'show active']"
                          class="tab-pane fade"
                          :id="`kt_upgrade_level_${index}`"
                        >
                          <!--begin::Heading-->
                          <div class="pb-5">
                            <h2 class="fw-bold text-dark">
                              {{ translator("SupportedOperations") }}:
                            </h2>

                            <div class="text-gray-400 fw-semobold">
                              {{ level.description }}
                            </div>
                          </div>
                          <!--end::Heading-->

                          <!--begin::Body-->
                          <div class="pt-1">
                            <template
                              v-for="(feature, i) in level.features"
                              :key="i"
                            >
                              <!--begin::Item-->
                              <div
                                :class="[i !== level.features - 1 && 'mb-7']"
                                class="d-flex align-items-center"
                              >
                                <template v-if="feature.supported">
                                  <span
                                    class="fw-semobold fs-5 text-gray-700 flex-grow-1"
                                  >
                                    {{ feature.title }}
                                  </span>

                                  <span
                                    class="svg-icon svg-icon-1 svg-icon-success"
                                  >
                                    <inline-svg
                                      src="media/icons/duotune/general/gen043.svg"
                                    />
                                  </span>
                                </template>
                                <template v-else>
                                  <span
                                    class="fw-semobold fs-5 text-gray-400 flex-grow-1"
                                  >
                                    {{ feature.title }}
                                  </span>
                                  <span class="svg-icon svg-icon-1">
                                    <inline-svg
                                      src="media/icons/duotune/general/gen040.svg"
                                    />
                                  </span>
                                </template>
                              </div>
                              <!--end::Item-->
                            </template>
                          </div>
                          <!--end::Body-->
                        </div>
                        <!--end::Tab Pane-->
                      </template>
                    </div>
                    <!--end::Tab content-->
                  </div>
                  <!--end::Col-->
                </div>

                <!--end::Wrapper-->
              </div>
              <!--end::Step 2-->

              <!--begin::Step 3-->
              <div data-kt-stepper-element="content">
                <log-card
                  widget-classes="pt-0 d-flex justify-content-center col-lg-12"
                  :logs="processLogs"
                ></log-card>

                <!--end::Wrapper-->
              </div>
              <!--end::Step 3-->
              <!--begin::Actions-->
              <div class="d-flex flex-stack pt-15">
                <!--begin::Wrapper-->
                <div class="me-2">
                  <button
                    type="button"
                    class="btn btn-lg btn-light-primary me-3 btn-hover-rotate-start"
                    data-kt-stepper-action="previous"
                    v-if="currentStepIndex != totalSteps - 1"
                    @click="previousStep()"
                  >
                    <span class="svg-icon svg-icon-3 me-1">
                      <inline-svg src="media/icons/duotune/arrows/arr063.svg" />
                    </span>
                    {{ translator("Back") }}
                  </button>
                </div>
                <div class="me-2">
                  <button
                    type="button"
                    ref="downloadButton"
                    class="btn btn-lg btn-light-primary me-3 btn-hover-scale"
                    data-kt-stepper-action="previous"
                    v-if="currentStepIndex === totalSteps - 1"
                    @click="download()"
                  >
                    <span class="indicator-label svg-icon svg-icon-3 me-1">
                      <inline-svg src="media/icons/duotune/arrows/arr091.svg" />
                      {{ translator("DownloadProcessedFile") }}
                    </span>
                    <span class="indicator-progress">
                      {{ translator("pleaseWait") }}
                      <span
                        class="spinner-border spinner-border-sm align-middle ms-2"
                      ></span>
                    </span>
                  </button>
                </div>
                <div class="me-2">
                  <button
                    type="button"
                    class="btn btn-lg btn-light-primary me-3 btn-hover-scale"
                    data-kt-stepper-action="previous"
                    v-if="currentStepIndex === totalSteps - 1"
                    @click="analyse()"
                  >
                    <span class="svg-icon svg-icon-3 me-1">
                      <inline-svg src="media/icons/duotune/arrows/arr094.svg" />
                    </span>
                    {{ translator("Analyse") }}
                  </button>
                </div>
                <!--end::Wrapper-->

                <!--begin::Wrapper-->
                <div>
                  <button
                    type="submit"
                    ref="submitButton"
                    class="btn btn-lg btn-primary btn-hover-rise"
                    v-if="currentStepIndex === totalSteps - 2"
                    :onclick="formSubmit"
                    id="submit"
                  >
                    <span class="indicator-label">
                      {{ translator("Submit") }}
                    </span>
                    <span class="indicator-progress">
                      {{ translator("pleaseWait") }}
                      <span
                        class="spinner-border spinner-border-sm align-middle ms-2"
                      ></span>
                    </span>
                  </button>

                  <button
                    type="submit"
                    class="btn btn-lg btn-primary btn-hover-rotate-end"
                    v-if="currentStepIndex === totalSteps - 1"
                    @click="
                      closeModule();
                      previousStep();
                      previousStep();
                    "
                  >
                    {{ translator("close") }}
                    <span class="svg-icon svg-icon-3 ms-1 me-0">
                      <inline-svg src="media/icons/duotune/arrows/arr011.svg" />
                    </span>
                  </button>

                  <button
                    type="submit"
                    class="btn btn-lg btn-primary btn-hover-rotate-end"
                    v-if="
                      currentStepIndex != totalSteps - 1 &&
                      currentStepIndex != totalSteps - 2
                    "
                  >
                    {{ translator("Continue") }}
                    <span class="svg-icon svg-icon-3 ms-1 me-0">
                      <inline-svg src="media/icons/duotune/arrows/arr064.svg" />
                    </span>
                  </button>
                </div>
                <!--end::Wrapper-->
              </div>
              <!--end::Actions-->
            </form>
            <!--end::Form-->
          </div>
          <!--end::Stepper-->
        </div>
        <!--end::Modal body-->
      </div>
      <!--end::Modal content-->
    </div>
    <!--end::Modal dialog-->
  </div>
  <!--end::Modal - Create project-->
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref } from "vue";
import { hideModal } from "@/core/helpers/dom";
import { StepperComponent } from "@/assets/ts/components/_StepperComponent";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { useForm } from "vee-validate";
import * as Yup from "yup";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { useRouter } from "vue-router";
import logCard from "@/components/cards/LogCard.vue";
import { watch } from "vue/dist/vue";

interface Step1 {
  formId: number;
}

interface Step2 {
  level: number;
}

interface KTCreateApp extends Step1, Step2 {}

export default defineComponent({
  name: "create-account-modal",
  props: {
    currentStepPlace: Number,
    choosedFormId: Number,
  },
  components: {
    logCard,
  },
  setup(props) {
    const processLogs = ref([]);
    const _stepperObj = ref<StepperComponent | null>(null);
    const createAccountRef = ref<HTMLElement | null>(null);
    const createAccountModalRef = ref<HTMLElement | null>(null);
    const currentStepIndex = ref(
      props.currentStepPlace ? props.currentStepPlace : 0
    );
    const submitButton = ref<HTMLButtonElement | null>(null);
    // const submitButton = ref(null);
    const store = useStore();
    const userfiles = store.getters.UserFiles.info;
    const router = useRouter();
    const downloadButton = ref<HTMLButtonElement | null>(null);
    console.log("CURRENTSTEP:", currentStepIndex.value);
    const { t, te } = useI18n();
    const translator = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };

    const formData = ref<KTCreateApp>({
      formId: props.choosedFormId ? props.choosedFormId : 0,
      level: 0,
    });

    onMounted(() => {
      _stepperObj.value = StepperComponent.createInsance(
        createAccountRef.value as HTMLElement
      );
    });

    const createAppSchema = [Yup.object({}), Yup.object({})];
    // extracts the individual step schema
    const currentSchema = computed(() => {
      return createAppSchema[currentStepIndex.value];
    });

    const totalSteps = computed(() => {
      if (!_stepperObj.value) {
        return;
      }

      return _stepperObj.value.totatStepsNumber;
    });

    const { resetForm, handleSubmit } = useForm<Step1 | Step2>({
      // const { resetForm, handleSubmit } = useForm<Step1 | Step2 | Step3 | Step4>({
      validationSchema: currentSchema,
    });

    const previousStep = () => {
      if (!_stepperObj.value) {
        return;
      }

      currentStepIndex.value--;
      console.log("CURRENTSTEP:", currentStepIndex.value);

      _stepperObj.value.goPrev();
    };

    const handleStep = handleSubmit((values) => {
      for (const item in values) {
        // eslint-disable-next-line no-prototype-builtins
        if (values.hasOwnProperty(item)) {
          if (values[item]) {
            formData.value[item] = values[item];
          }
        }
      }
      console.log("currentStepIndex.value ", currentStepIndex.value);
      if (currentStepIndex.value === 1) {
        console.log("Submitting, not go on");
        return;
      }
      if (currentStepIndex.value > 1) {
        console.log("MAX PAGE OUT, not go on");
        return;
      }
      if (currentStepIndex.value === 0) {
        currentStepIndex.value++;
        console.log("CURRENTSTEP:", currentStepIndex.value);

        if (!_stepperObj.value) {
          return;
        }
        _stepperObj.value.goNext();
      }
    });

    const formSubmit = async () => {
      console.log("_stepperObj: ", _stepperObj);
      console.log("--------------", submitButton, "-----------------");
      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value!.disabled = true;
        // Activate indicator
        submitButton.value?.setAttribute("data-kt-indicator", "on");
      }
      if (!formData.value.formId) {
        Swal.fire({
          text: "请先选择文件",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "好的",
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        }).then(function () {
          if (submitButton.value) {
            submitButton.value!.disabled = false;
            submitButton.value?.removeAttribute("data-kt-indicator");
          }
        });
        return;
      }
      await store.dispatch(Actions.WASH_FILE, formData.value);
      const logs = store.getters.ProcessData;
      const error = store.getters.getProcessError;
      const alert =
        error === "The user does not exist or is not logged in"
          ? "用户信息验证失败，请重新登录"
          : error === "parameters are incomplete or format is wrong"
          ? "请选择清洗文件"
          : error === "no such form in database"
          ? "请选择清洗文件"
          : "未知错误";
      console.log("GETING PROCESS ERROR: ", error);
      console.log("GETING PROCESS DATA: ", logs);
      if (error == "success") {
        processLogs.value = store.getters.ProcessData.log;
        console.log("PROCESSLOGS VALUE: ", processLogs.value);
        console.log("PROCESSLOGS: ", processLogs);
        Swal.fire({
          text: "清洗成功!",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "继续",
          customClass: {
            confirmButton: "btn fw-semobold btn-light-primary",
          },
        }).then(function () {
          // Go to page after successfully login
          store.dispatch(Actions.ANALYSE_FILE, "YD15");
          currentStepIndex.value++;
          if (!_stepperObj.value) {
            return;
          }
          _stepperObj.value.goNext();
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
          if (submitButton.value) {
            submitButton.value!.disabled = false;
            submitButton.value?.removeAttribute("data-kt-indicator");
          }
        });
      }
    };

    resetForm({
      values: {
        ...formData.value,
      },
    });
    const levels = [
      {
        title: "Level 0",
        label: "original",
        subTitle: "不进行处理",
        description: "只对上传的原文件进行分析",
        default: false,
        custom: false,
        features: [
          {
            title: "时间去重排序",
            supported: false,
          },
          {
            title: "PREPOWER处理",
            supported: false,
          },
          {
            title: "ROUND(A.POWER,0)处理",
            supported: false,
          },
          {
            title: "YD15处理",
            supported: false,
          },
          {
            title: "其他列空值处理",
            supported: false,
          },
          {
            title: "ROUND(A.WS,1)处理",
            supported: false,
          },
          {
            title: "连续重复值处理",
            supported: false,
          },
          {
            title: "孤立森林离群值处理",
            supported: false,
          },
        ],
      },
      {
        title: "Level 1",
        label: "recommend",
        subTitle: "时间排序与去重",
        description: "根据时间列进行排序并去除时间重复行",
        default: true,
        custom: false,
        features: [
          {
            title: "时间去重排序",
            supported: true,
          },
          {
            title: "PREPOWER处理",
            supported: false,
          },
          {
            title: "ROUND(A.POWER,0)处理",
            supported: false,
          },
          {
            title: "YD15处理",
            supported: false,
          },
          {
            title: "其他列空值处理",
            supported: false,
          },
          {
            title: "ROUND(A.WS,1)处理",
            supported: false,
          },
          {
            title: "连续重复值处理",
            supported: false,
          },
          {
            title: "孤立森林离群值处理",
            supported: false,
          },
        ],
      },
      {
        title: "Level 2",
        label: "recommend",
        subTitle: "PREPOWER处理",
        description: "采用邻近值替换对PREPOWER的空值进行填充",
        default: false,
        custom: false,
        features: [
          {
            title: "时间去重排序",
            supported: true,
          },
          {
            title: "PREPOWER处理",
            supported: true,
          },
          {
            title: "ROUND(A.POWER,0)处理",
            supported: false,
          },
          {
            title: "YD15处理",
            supported: false,
          },
          {
            title: "其他列空值处理",
            supported: false,
          },
          {
            title: "ROUND(A.WS,1)处理",
            supported: false,
          },
          {
            title: "连续重复值处理",
            supported: false,
          },
          {
            title: "孤立森林离群值处理",
            supported: false,
          },
        ],
      },
      {
        title: "Level 3",
        label: "recommend",
        subTitle: "ROUND(A.POWER,0)处理",
        description:
          "ROUND(A.POWER,0)的空值将由PREPOWER替换；若其值<-1000但>=-5000,则替换为0，若其值<-5000，则替换为“PREPOWER”列的值",
        default: false,
        custom: false,
        features: [
          {
            title: "时间去重排序",
            supported: true,
          },
          {
            title: "PREPOWER处理",
            supported: true,
          },
          {
            title: "ROUND(A.POWER,0)处理",
            supported: true,
          },
          {
            title: "YD15处理",
            supported: false,
          },
          {
            title: "其他列空值处理",
            supported: false,
          },
          {
            title: "ROUND(A.WS,1)处理",
            supported: false,
          },
          {
            title: "连续重复值处理",
            supported: false,
          },
          {
            title: "孤立森林离群值处理",
            supported: false,
          },
        ],
      },
      {
        title: "Level 4",
        label: "recommend",
        subTitle: "YD15处理",
        description: "YD15的空值将替换为ROUND(A.POWER,0)ROUND(A.POWER,0)列的值",
        default: false,
        custom: false,
        features: [
          {
            title: "时间去重排序",
            supported: true,
          },
          {
            title: "PREPOWER处理",
            supported: true,
          },
          {
            title: "ROUND(A.POWER,0)处理",
            supported: true,
          },
          {
            title: "YD15处理",
            supported: true,
          },
          {
            title: "其他列空值处理",
            supported: false,
          },
          {
            title: "ROUND(A.WS,1)处理",
            supported: false,
          },
          {
            title: "连续重复值处理",
            supported: false,
          },
          {
            title: "孤立森林离群值处理",
            supported: false,
          },
        ],
      },
      {
        title: "Level 5",
        label: "recommend",
        subTitle: "其他列的空值处理",
        description: "WINDSPEED大于25的置为空值；其他空值采用邻近值替换填充",
        default: false,
        custom: false,
        features: [
          {
            title: "时间去重排序",
            supported: true,
          },
          {
            title: "PREPOWER处理",
            supported: true,
          },
          {
            title: "ROUND(A.POWER,0)处理",
            supported: true,
          },
          {
            title: "YD15处理",
            supported: true,
          },
          {
            title: "其他列空值处理",
            supported: true,
          },
          {
            title: "ROUND(A.WS,1)处理",
            supported: false,
          },
          {
            title: "连续重复值处理",
            supported: false,
          },
          {
            title: "孤立森林离群值处理",
            supported: false,
          },
        ],
      },
      {
        title: "Level 6",
        label: "recommend",
        subTitle: "ROUND(A.WS,1)处理",
        description: "ROUND(A.WS,1)空值与小于0的值将替换为WINDSPEED",
        default: false,
        custom: false,
        features: [
          {
            title: "时间去重排序",
            supported: true,
          },
          {
            title: "PREPOWER处理",
            supported: true,
          },
          {
            title: "ROUND(A.POWER,0)处理",
            supported: true,
          },
          {
            title: "YD15处理",
            supported: true,
          },
          {
            title: "其他列空值处理",
            supported: true,
          },
          {
            title: "ROUND(A.WS,1)处理",
            supported: true,
          },
          {
            title: "连续重复值处理",
            supported: false,
          },
          {
            title: "孤立森林离群值处理",
            supported: false,
          },
        ],
      },
      {
        title: "Level 7",
        label: "optional",
        subTitle: "对大量重复值进行处理",
        description:
          "对YD15和ROUND(A.POWER,0)的大量连续重复值进行处理，包括删除或替换",
        default: false,
        custom: false,
        features: [
          {
            title: "时间去重排序",
            supported: true,
          },
          {
            title: "PREPOWER处理",
            supported: true,
          },
          {
            title: "ROUND(A.POWER,0)处理",
            supported: true,
          },
          {
            title: "YD15处理",
            supported: true,
          },
          {
            title: "其他列空值处理",
            supported: true,
          },
          {
            title: "ROUND(A.WS,1)处理",
            supported: true,
          },
          {
            title: "连续重复值处理",
            supported: true,
          },
          {
            title: "孤立森林离群值处理",
            supported: false,
          },
        ],
      },
      {
        title: "Level 8",
        label: "massive",
        subTitle: "孤立森林模型处理离群值",
        description:
          "使用IsolationForest类创建一个孤立森林模型，根据模型力度进行离群值的修正",
        default: false,
        custom: false,
        features: [
          {
            title: "时间去重排序",
            supported: true,
          },
          {
            title: "PREPOWER处理",
            supported: true,
          },
          {
            title: "ROUND(A.POWER,0)处理",
            supported: true,
          },
          {
            title: "YD15处理",
            supported: true,
          },
          {
            title: "其他列空值处理",
            supported: true,
          },
          {
            title: "ROUND(A.WS,1)处理",
            supported: true,
          },
          {
            title: "连续重复值处理",
            supported: true,
          },
          {
            title: "孤立森林离群值处理",
            supported: true,
          },
        ],
      },
    ];

    let selected = ref("Level 1");

    const selectLevel = (choosedLevel) => {
      formData.value.level = choosedLevel;
      selected = ref(levels[formData.value.level].title);
      console.log("SELECTED: ", selected);
      console.log("FORMDATA: ", levels[formData.value.level].title);
    };
    selectLevel(1);

    const selectForm = (FormId) => {
      formData.value.formId = FormId;
      console.log("SELECT FORM: ", FormId);
      console.log("userfiles: ", userfiles);
      let item;
      for (item in userfiles) {
        if (userfiles[item].formId == FormId) {
          break;
        }
      }
      console.log(userfiles, item);
      store.dispatch(Mutations.SET_ANALYSE_FILE, userfiles[item]);
    };
    const download = async () => {
      console.log("正在下载");
      if (downloadButton.value) {
        console.log("downloadButton: ", downloadButton);
        // eslint-disable-next-line
        downloadButton.value!.disabled = true;
        // Activate indicator
        downloadButton.value.setAttribute("data-kt-indicator", "on");
      }
      await store.dispatch(
        Actions.DOWNLOAD_PROCESSED_FILE,
        formData.value.formId
      );
      if (downloadButton.value) {
        // eslint-disable-next-line
        downloadButton.value!.disabled = false;
        // Activate indicator
        downloadButton.value.removeAttribute("data-kt-indicator");
      }
    };

    const analyse = () => {
      console.log("ANALYSING");
      router.push("analyse");
    };

    const closeModule = () => {
      console.log("CloseModule");
      hideModal(createAccountModalRef.value);
      // reset All
      currentStepIndex.value = 0;
      formData.value.formId = 0;
      formData.value.level = 0;
      store.dispatch(Mutations.PURGE_PROCESS_DATA);
    };

    return {
      closeModule,
      analyse,
      download,
      userfiles,
      selected,
      selectForm,
      selectLevel,
      levels,
      translator,
      createAccountRef,
      totalSteps,
      previousStep,
      handleStep,
      submitButton,
      formSubmit,
      currentStepIndex,
      formData,
      createAccountModalRef,
      processLogs,
      downloadButton,
    };
  },
});
</script>
