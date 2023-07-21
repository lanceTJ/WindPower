<template>
  <!--begin::Basic info-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_profile_details"
      aria-expanded="true"
      aria-controls="kt_account_profile_details"
    >
      <!--begin::Card title-->
      <div class="card-title m-0">
        <h3 class="fw-bold m-0">{{ translator("ProfileDetails") }}</h3>
      </div>
      <!--end::Card title-->
    </div>
    <!--begin::Card header-->

    <!--begin::Content-->
    <div id="kt_account_profile_details" class="collapse show">
      <!--begin::Form-->
      <Form
        id="kt_account_profile_details_form"
        class="form"
        novalidate="novalidate"
        @submit="saveChanges1()"
        :validation-schema="userinfoValidator"
      >
        <!--begin::Card body-->
        <div class="card-body border-top p-9">
          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              {{ translator("Avatar") }}
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Image input-->
              <div
                class="image-input image-input-outline"
                data-kt-image-input="true"
                style="background-image: url(media/avatars/blank.png)"
              >
                <!--begin::Preview existing avatar-->
                <div
                  class="image-input-wrapper w-125px h-125px"
                  v-if="!useUrl"
                  :style="`background-image: url(${userinfoDetails.avatar})`"
                ></div>
                <div
                  class="image-input-wrapper w-125px h-125px"
                  v-else
                  :style="`background-image: url(${avatarUrl})`"
                ></div>
                <!--end::Preview existing avatar-->

                <!--begin::Label-->
                <label
                  class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="change"
                  data-bs-toggle="tooltip"
                  title="Change avatar"
                >
                  <i class="bi bi-pencil-fill fs-7">
                    <input
                      type="file"
                      id="testFile"
                      accept="image/x-png,image/jpeg,image/jpg"
                      @change="updateAvatar"
                    />
                  </i>

                  <!--begin::Inputs-->
                  <input type="file" name="avatar" accept=".png, .jpg, .jpeg" />
                  <input type="hidden" name="avatar_remove" />
                  <!--end::Inputs-->
                </label>
                <!--end::Label-->

                <!--begin::Remove-->
                <span
                  class="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                  data-kt-image-input-action="remove"
                  data-bs-toggle="tooltip"
                  @click="removeImage()"
                  title="Remove avatar"
                >
                  <i class="bi bi-x fs-2"></i>
                </span>
                <!--end::Remove-->
              </div>
              <!--end::Image input-->

              <!--begin::Hint-->
              <div class="form-text">
                {{ translator("AllowedFileTypes") }}: png, jpg, jpeg.
              </div>
              <!--end::Hint-->
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6">{{
              translator("Username")
            }}</label>
            <!--end::Label-->

            <!--begin::Col-->
            <!--            <div class="col-lg-8 fv-row">-->
            <!--begin::Row-->
            <!--              <div class="row">-->
            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="username"
                class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                :placeholder="translator('Username')"
                disabled="True"
                v-model="userinfoDetails.username"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="fname" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6">
              {{ translator("Age") }}
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="text"
                name="Age"
                class="form-control form-control-lg form-control-solid"
                :placeholder="translator('Age')"
                v-model="userinfoDetails.age"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="company" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span class="required">{{ translator("Email") }}</span>

              <i
                class="fas fa-exclamation-circle ms-1 fs-7"
                data-bs-toggle="tooltip"
                title="Email must be active"
              ></i>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                type="email"
                name="email"
                class="form-control form-control-lg form-control-solid"
                :placeholder="translator('Email')"
                v-model="userinfoDetails.email"
              />
              <div class="fv-plugins-message-container">
                <div class="fv-help-block">
                  <ErrorMessage name="email" />
                </div>
              </div>
            </div>
            <!--end::Col-->
          </div>
          <!--end::Input group-->

          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label required fw-semobold fs-6">
              {{ translator("Birthday") }}
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8">
              <!--begin::Row-->
              <div class="row">
                <!--begin::Col-->
                <div class="col-lg-4 fv-row">
                  <Field
                    type="year"
                    name="year"
                    class="form-control form-control-lg form-control-solid mb-3 mb-lg-0"
                    :placeholder="translator('year')"
                    v-model="userinfoDetails.birthday.year"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="year" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-lg-4 fv-row">
                  <Field
                    type="mon"
                    name="mon"
                    class="form-control form-control-lg form-control-solid"
                    :placeholder="translator('month')"
                    v-model="userinfoDetails.birthday.month"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="month" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->

                <!--begin::Col-->
                <div class="col-lg-4 fv-row">
                  <Field
                    type="day"
                    name="day"
                    class="form-control form-control-lg form-control-solid"
                    :placeholder="translator('day')"
                    v-model="userinfoDetails.birthday.day"
                  />
                  <div class="fv-plugins-message-container">
                    <div class="fv-help-block">
                      <ErrorMessage name="day" />
                    </div>
                  </div>
                </div>
                <!--end::Col-->
              </div>
              <!--end::Row-->
            </div>
            <!--end::Col-->
          </div>
          <!--begin::Input group-->

          <!--begin::Input group-->
          <div class="row mb-6">
            <!--begin::Label-->
            <label class="col-lg-4 col-form-label fw-semobold fs-6">
              <span class="required">{{ translator("Gender") }}</span>
              <i
                class="fas fa-exclamation-circle ms-1 fs-7"
                data-bs-toggle="tooltip"
                :title="translator('Gender')"
              ></i>
            </label>
            <!--end::Label-->

            <!--begin::Col-->
            <div class="col-lg-8 fv-row">
              <Field
                as="select"
                name="Gender"
                class="form-select form-select-solid form-select-lg fw-semobold"
                v-model="userinfoDetails.gender"
              >
                <option value="1">{{ translator("Male") }}</option>
                <option value="0">{{ translator("Female") }}</option>
              </Field>
            </div>
          </div>
        </div>
        <!--end::Card body-->

        <!--begin::Actions-->
        <div class="card-footer d-flex justify-content-end py-6 px-9">
          <button
            type="reset"
            class="btn btn-light btn-active-light-primary btn-hover-rotate-start me-2"
          >
            {{ translator("Discard") }}
          </button>

          <button
            type="submit"
            id="kt_account_profile_details_submit"
            ref="submitButton1"
            class="btn btn-primary btn-hover-rise"
          >
            <span class="indicator-label">
              {{ translator("updateChanges") }}
            </span>
            <span class="indicator-progress">
              {{ translator("pleaseWait") }}...
              <span
                class="spinner-border spinner-border-sm align-middle ms-2"
              ></span>
            </span>
          </button>
        </div>
        <!--end::Actions-->
      </Form>
      <!--end::Form-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Basic info-->

  <!--begin::Sign-in Method-->
  <div class="card mb-5 mb-xl-10">
    <!--begin::Card header-->
    <div
      class="card-header border-0 cursor-pointer"
      role="button"
      data-bs-toggle="collapse"
      data-bs-target="#kt_account_signin_method"
    >
      <div class="card-title m-0">
        <h3 class="fw-bolder m-0">{{ translator("SigninMethod") }}</h3>
      </div>
    </div>
    <!--end::Card header-->

    <!--begin::Content-->
    <div id="kt_account_signin_method" class="collapse show">
      <!--begin::Card body-->
      <div class="card-body border-top p-9">
        <!--begin::Email Address-->
        <div class="d-flex flex-wrap align-items-center mb-8">
          <div id="kt_signin_email" :class="{ 'd-none': emailFormDisplay }">
            <div class="fs-4 fw-bolder mb-1">{{ translator("Username") }}</div>
            <div class="fs-6 fw-semobold text-gray-600">
              {{ userinfomation["username"] }}
            </div>
          </div>

          <div
            id="kt_signin_email_edit"
            :class="{ 'd-none': !emailFormDisplay }"
            class="flex-row-fluid"
          >
            <!--begin::Form-->
            <!--end::Form-->
          </div>
          <div
            id="kt_signin_email_button"
            :class="{ 'd-none': emailFormDisplay }"
            class="ms-auto"
          >
            <button
              class="btn btn-light fw-bolder px-6"
              disabled="true"
              @click="emailFormDisplay = !emailFormDisplay"
            >
              {{ translator("Fixed") }}
            </button>
          </div>
        </div>
        <!--end::Email Address-->

        <!--begin::Password-->
        <div class="d-flex flex-wrap align-items-center mb-8">
          <div
            id="kt_signin_password"
            :class="{ 'd-none': passwordFormDisplay }"
          >
            <div class="fs-4 fw-bolder mb-1">{{ translator("Password") }}</div>
            <div class="fs-6 fw-semobold text-gray-600">************</div>
          </div>
          <div
            id="kt_signin_password_edit"
            class="flex-row-fluid"
            :class="{ 'd-none': !passwordFormDisplay }"
          >
            <div class="fs-6 fw-semobold text-gray-600 mb-4">
              {{
                translator("PasswordMustBeAtLeast6CharacterAndContainSymbols")
              }}
            </div>

            <!--begin::Form-->
            <Form
              id="kt_signin_change_password"
              class="form"
              novalidate="novalidate"
              @submit="updatePassword()"
              :validation-schema="changePassword"
            >
              <div class="row mb-6">
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label
                      for="currentpassword"
                      class="form-label fs-6 fw-bold mb-3"
                      >{{ translator("CurrentPassword") }}</label
                    >
                    <Field
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="currentpassword"
                      id="currentpassword"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="currentpassword" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label
                      for="newPasswd"
                      class="form-label fs-6 fw-bold mb-3"
                      >{{ translator("NewPassword") }}</label
                    >
                    <Field
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="newPasswd"
                      id="newPasswd"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="newpassword" />
                      </div>
                    </div>
                  </div>
                </div>
                <div class="col-lg-4">
                  <div class="fv-row mb-0">
                    <label
                      for="confirmpassword"
                      class="form-label fs-6 fw-bold mb-3"
                      >{{ translator("ConfirmNewPassword") }}</label
                    >
                    <Field
                      type="password"
                      class="form-control form-control-lg form-control-solid fw-semobold fs-6"
                      name="confirmpassword"
                      id="confirmpassword"
                    />
                    <div class="fv-plugins-message-container">
                      <div class="fv-help-block">
                        <ErrorMessage name="confirmpassword" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex">
                <button
                  id="kt_password_submit"
                  type="submit"
                  ref="updatePasswordButton"
                  class="btn btn-primary me-2 px-6 btn-hover-rise"
                >
                  <span class="indicator-label">
                    {{ translator("updateChanges") }}
                  </span>
                  <span class="indicator-progress">
                    {{ translator("pleaseWait") }}...
                    <span
                      class="spinner-border spinner-border-sm align-middle ms-2"
                    ></span>
                  </span>
                </button>
                <button
                  id="kt_password_cancel"
                  type="button"
                  @click="passwordFormDisplay = !passwordFormDisplay"
                  class="btn btn-color-gray-400 btn-active-light-primary btn-hover-rotate-start px-6"
                >
                  {{ translator("Cancel") }}
                </button>
              </div>
            </Form>
            <!--end::Form-->
          </div>
          <div
            id="kt_signin_password_button"
            class="ms-auto"
            :class="{ 'd-none': passwordFormDisplay }"
          >
            <button
              @click="passwordFormDisplay = !passwordFormDisplay"
              class="btn btn-light fw-bolder btn-hover-scale"
            >
              {{ translator("ResetPassword") }}
            </button>
          </div>
        </div>
        <!--end::Password-->
      </div>
      <!--end::Card body-->
    </div>
    <!--end::Content-->
  </div>
  <!--end::Sign-in Method-->
</template>

<script lang="ts">
import { defineComponent, onMounted, reactive, ref } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import Swal from "sweetalert2/dist/sweetalert2.js";
import * as Yup from "yup";
import { useI18n } from "vue-i18n";
import { useStore } from "vuex";
import { Actions } from "@/store/enums/StoreEnums";
import { useRouter } from "vue-router";

interface UserinfoDetails {
  avatar: any;
  username: any;
  age: any;
  email: any;
  birthday: {
    year: number;
    month: number;
    day: number;
  };
  gender: any;
}

export default defineComponent({
  name: "account-settings",
  components: {
    ErrorMessage,
    Field,
    Form,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const useUrl = ref(false);
    const avatarUrl = ref("");
    const userinfomation = store.getters.Userinfo;
    const submitButton1 = ref<HTMLElement | null>(null);
    const submitButton2 = ref<HTMLElement | null>(null);
    const submitButton3 = ref<HTMLElement | null>(null);
    const submitButton4 = ref<HTMLElement | null>(null);
    const submitButton5 = ref<HTMLElement | null>(null);
    const updateEmailButton = ref<HTMLElement | null>(null);
    const updatePasswordButton = ref<HTMLElement | null>(null);
    const emailFormDisplay = ref(false);
    const passwordFormDisplay = ref(false);

    const saveChanges1 = () => {
      if (submitButton1.value) {
        // Activate indicator
        submitButton1.value.setAttribute("data-kt-indicator", "on");
        userinfoDetails.value.gender =
          userinfoDetails.value.gender == "1" ? 1 : 0;

        const modifiedinfo = {
          gender: userinfoDetails.value.gender,
          age: userinfoDetails.value.age,
          birthday:
            userinfoDetails.value.birthday.year +
            "-" +
            userinfoDetails.value.birthday.month +
            "-" +
            userinfoDetails.value.birthday.day,
          avatar: userinfoDetails.value.avatar,
          username: userinfoDetails.value.username,
          email: userinfoDetails.value.email,
        };

        setTimeout(async () => {
          submitButton1.value?.removeAttribute("data-kt-indicator");
          console.log("submiting: ", modifiedinfo);
          await store.dispatch(Actions.UPDATE_USERINFO, modifiedinfo);
          const error = store.getters.getError_message;
          const error_alert =
            error === "The user does not exist or is not logged in"
              ? "用户登录信息验证失败"
              : error === "Inputs contain illegal data"
              ? "数据不合法"
              : "网络异常";
          if (!error || error == "success") {
            Swal.fire({
              text: "更改成功!",
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
              text: error_alert,
              icon: "error",
              buttonsStyling: false,
              confirmButtonText: "重试",
              customClass: {
                confirmButton: "btn fw-semobold btn-light-danger",
              },
            });
          }
        }, 2000);
      }
    };
    const updatePassword = () => {
      if (updatePasswordButton.value) {
        // Activate indicator
        updatePasswordButton.value.setAttribute("data-kt-indicator", "on");

        setTimeout(() => {
          updatePasswordButton.value?.removeAttribute("data-kt-indicator");
          Swal.fire({
            text: "修改成功!",
            icon: "success",
            confirmButtonText: "Ok",
            buttonsStyling: false,
            customClass: {
              confirmButton: "btn btn-light-primary",
            },
          }).then(() => {
            passwordFormDisplay.value = false;
            // router.push({ name: "sign-in" });
          });
        }, 2000);
      }
    };

    const removeImage = () => {
      userinfoDetails.value.avatar = "media/avatars/blank.png";
    };

    onMounted(() => {
      setCurrentPageBreadcrumbs("Settings", ["Account"]);
    });
    const { t, te } = useI18n();

    const translator = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };

    const userinfoValidator = Yup.object().shape({
      username: Yup.string()
        .required("此项为必填项")
        .min(4, "格式错误")
        .label("username"),
      email: Yup.string().label("email"),
      year: Yup.string().min(4, "格式错误").max(4, "格式错误").label("year"),
      month: Yup.string().label("month"),
      day: Yup.string().label("day"),
      age: Yup.string().label("age"),
    });
    const userbirthday = userinfomation["birthday"]
      ? userinfomation["birthday"].split("-")
      : "1900-01-01".split("-");
    const usergender = userinfomation["gender"] == 1 ? "1" : "0";
    const userinfoDetails = ref<UserinfoDetails>({
      avatar: userinfomation["avatar"],
      username: userinfomation["username"],
      age: userinfomation["age"],
      email: userinfomation["email"],
      birthday: {
        year: userbirthday[0],
        month: userbirthday[1],
        day: userbirthday[2],
      },
      gender: usergender,
    });
    const changePassword = Yup.object().shape({
      currentpassword: Yup.string()
        .required(translator("ThisIsARequiredField"))
        .label("Current password"),
      newPasswd: Yup.string()
        .min(6, translator("PasswordMustBeAtLeast6CharacterAndContainSymbols"))
        .required(translator("ThisIsARequiredField"))
        .label("Password"),
      confirmpassword: Yup.string()
        .min(6, translator("PasswordMustBeAtLeast6CharacterAndContainSymbols"))
        .required(translator("ThisIsARequiredField"))
        .oneOf([Yup.ref("newPasswd"), null], translator("PasswordsMustMatch"))
        .label("Password Confirmation"),
    });

    const updateAvatar = async (event: Event) => {
      const target = event.target as HTMLInputElement;
      const file = target.files ? target.files[0] : null;
      console.log("AVATARCHANGED");
      let formData = new FormData();
      if (!file) {
        return;
      }
      formData.append("file", file);
      userinfoDetails.value.avatar = file;
      useUrl.value = true;
      avatarUrl.value = window.URL.createObjectURL(file);
      console.log("在updateAvatar这个函数中，formData现在是：", formData);
      console.log("在updateAvatar这个函数中，file现在是：", file);
    };

    return {
      submitButton1,
      submitButton2,
      submitButton3,
      submitButton4,
      submitButton5,
      saveChanges1,
      emailFormDisplay,
      passwordFormDisplay,
      removeImage,
      changePassword,
      updateEmailButton,
      updatePasswordButton,
      updatePassword,
      userinfomation,
      translator,
      userinfoValidator,
      userinfoDetails,
      userbirthday,
      updateAvatar,
      useUrl,
      avatarUrl,
    };
  },
});
</script>
