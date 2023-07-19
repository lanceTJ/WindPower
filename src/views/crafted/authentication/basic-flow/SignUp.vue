<template>
  <!--begin::Wrapper-->
  <div class="bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
    <!--begin::Form-->
    <Form
      class="form w-100 fv-plugins-bootstrap5 fv-plugins-framework"
      novalidate="novalidate"
      @submit="onSubmitRegister"
      id="kt_login_signup_form"
      :validation-schema="registration"
    >
      <!--begin::Heading-->
      <div class="mb-10 text-center">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">创建账号</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-semobold fs-4">
          已经有账号了？

          <router-link to="/sign-in" class="link-primary fw-bold">
            点击登录
          </router-link>
        </div>
        <!--end::Link-->
      </div>
      <!--end::Heading-->

      <!--begin::Action-->
      <!--      <button type="button" class="btn btn-light-primary fw-bold w-100 mb-10">-->
      <!--        <img-->
      <!--          alt="Logo"-->
      <!--          src="media/svg/brand-logos/google-icon.svg"-->
      <!--          class="h-20px me-3"-->
      <!--        />-->
      <!--        Sign in with Google-->
      <!--      </button>-->
      <!--end::Action-->

      <!--begin::Separator-->
      <!--      <div class="d-flex align-items-center mb-10">-->
      <!--        <div class="border-bottom border-gray-300 mw-50 w-100"></div>-->
      <!--        <span class="fw-semobold text-gray-400 fs-7 mx-2">OR</span>-->
      <!--        <div class="border-bottom border-gray-300 mw-50 w-100"></div>-->
      <!--      </div>-->
      <!--end::Separator-->

      <!--      &lt;!&ndash;begin::Input group&ndash;&gt;-->
      <!--      <div class="row fv-row mb-7">-->
      <!--        &lt;!&ndash;begin::Col&ndash;&gt;-->
      <!--        <div class="col-xl-6">-->
      <!--          <label class="form-label fw-bold text-dark fs-6">名</label>-->
      <!--          <Field-->
      <!--            class="form-control form-control-lg form-control-solid"-->
      <!--            type="text"-->
      <!--            placeholder=""-->
      <!--            name="first_name"-->
      <!--            autocomplete="off"-->
      <!--          />-->
      <!--          <div class="fv-plugins-message-container">-->
      <!--            <div class="fv-help-block">-->
      <!--              <ErrorMessage name="first_name" />-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--end::Col-->

      <!--begin::Col-->
      <!--        <div class="col-xl-6">-->
      <!--          <label class="form-label fw-bold text-dark fs-6">姓</label>-->
      <!--          <Field-->
      <!--            class="form-control form-control-lg form-control-solid"-->
      <!--            type="text"-->
      <!--            placeholder=""-->
      <!--            name="last_name"-->
      <!--            autocomplete="off"-->
      <!--          />-->
      <!--          <div class="fv-plugins-message-container">-->
      <!--            <div class="fv-help-block">-->
      <!--              <ErrorMessage name="last_name" />-->
      <!--            </div>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--end::Col-->
      <!--      </div>-->
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-7">
        <label class="form-label fw-bold text-dark fs-6">用户名</label>
        <Field
          class="form-control form-control-lg form-control-solid"
          type="username"
          placeholder=""
          name="username"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="username" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="mb-10 fv-row" data-kt-password-meter="true">
        <!--begin::Wrapper-->
        <div class="mb-1">
          <!--begin::Label-->
          <label class="form-label fw-bold text-dark fs-6"> 密码 </label>
          <!--end::Label-->

          <!--begin::Input wrapper-->
          <div class="position-relative mb-3">
            <Field
              class="form-control form-control-lg form-control-solid"
              type="password"
              placeholder=""
              name="password"
              autocomplete="off"
            />
            <div class="fv-plugins-message-container">
              <div class="fv-help-block">
                <ErrorMessage name="password" />
              </div>
            </div>
          </div>
          <!--end::Input wrapper-->
          <!--begin::Meter-->
          <div
            class="d-flex align-items-center mb-3"
            data-kt-password-meter-control="highlight"
          >
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px me-2"
            ></div>
            <div
              class="flex-grow-1 bg-secondary bg-active-success rounded h-5px"
            ></div>
          </div>
          <!--end::Meter-->
        </div>
        <!--end::Wrapper-->
        <!--begin::Hint-->
        <div class="text-muted">
          请至少使用6位字符，包括数字，字母，特殊字符等
        </div>
        <!--end::Hint-->
      </div>
      <!--end::Input group--->

      <!--begin::Input group-->
      <div class="fv-row mb-5">
        <label class="form-label fw-bold text-dark fs-6">确认密码</label>
        <Field
          class="form-control form-control-lg form-control-solid"
          type="password"
          placeholder=""
          name="confirmedPassword"
          autocomplete="off"
        />
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="confirmedPassword" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <!--      <div class="fv-row mb-10">-->
      <!--        <label class="form-check form-check-custom form-check-solid">-->
      <!--          <Field-->
      <!--            class="form-check-input"-->
      <!--            type="checkbox"-->
      <!--            name="toc"-->
      <!--            value="1"-->
      <!--          />-->
      <!--          <span class="form-check-label fw-semobold text-gray-700 fs-6">-->
      <!--            I Agree &-->
      <!--            <a href="#" class="ms-1 link-primary">Terms and conditions</a>.-->
      <!--          </span>-->
      <!--        </label>-->
      <!--      </div>-->
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <button
          id="kt_sign_up_submit"
          ref="submitButton"
          type="submit"
          class="btn btn-lg btn-primary"
        >
          <span class="indicator-label"> 提交 </span>
          <span class="indicator-progress">
            请稍候...
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
  <!--end::Wrapper-->
</template>

<script lang="ts">
import { defineComponent, ref, onMounted, nextTick } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as Yup from "yup";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { Actions } from "@/store/enums/StoreEnums";
import { PasswordMeterComponent } from "@/assets/ts/components";
import Swal from "sweetalert2/dist/sweetalert2.min.js";

export default defineComponent({
  name: "sign-up",
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const submitButton = ref<HTMLButtonElement | null>(null);

    const registration = Yup.object().shape({
      username: Yup.string()
        .min(4, "用户名至少需要4个字符")
        .required("必须输入用户名")
        .label("Password Confirmation"),
      password: Yup.string()
        .min(6, "密码至少需要6个字符")
        .required("必须输入密码")
        .label("password"),
      confirmedPassword: Yup.string()
        .required()
        .oneOf([Yup.ref("password"), null], "两次密码必须相同")
        .required("请再次确认密码")
        .label("Password Confirmation"),
    });

    onMounted(() => {
      nextTick(() => {
        PasswordMeterComponent.bootstrap();
      });
    });

    const onSubmitRegister = async (values) => {
      // Clear existing errors
      store.dispatch(Actions.LOGOUT);

      console.log("values:", values);
      // eslint-disable-next-line
      submitButton.value!.disabled = true;

      // Activate indicator
      submitButton.value?.setAttribute("data-kt-indicator", "on");

      // Send login request
      await store.dispatch(Actions.REGISTER, values);

      // const [errorName] = Object.keys(store.getters.getErrors);
      const error = store.getters.getErrors;
      const error_alert =
        error === "User already exists"
          ? "用户名已存在！"
          : error === "password can not be empty"
          ? "密码不能为空！"
          : "注册失败！";

      if (!error || error == "success") {
        Swal.fire({
          text: "注册成功！",
          icon: "success",
          buttonsStyling: false,
          confirmButtonText: "去登录",
          customClass: {
            confirmButton: "btn fw-semobold btn-light-primary",
          },
        }).then(function () {
          // Go to page after successfully login
          router.push({ name: "sign-in" });
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

      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
      submitButton.value!.disabled = false;
    };

    return {
      registration,
      onSubmitRegister,
      submitButton,
    };
  },
});
</script>
