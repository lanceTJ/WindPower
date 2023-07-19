<template>
  <!--begin::Wrapper-->

  <div
    class="w-lg-200px bg-body rounded p-10 p-lg-15 mx-auto d-flex justify-content-center align-items-center"
  >
    <a>
      <img
        v-if="themeMode == 'light'"
        alt="Logo"
        src="media/logos/TFlogoAndText_dark.svg"
        class="h-60px app-logo-default"
      />
      <img
        v-else
        alt="Logo"
        src="media/logos/TFlogoAndText_light.svg"
        class="h-60px app-logo-default"
      />
    </a>
  </div>
  <div class="w-lg-500px bg-body rounded shadow-sm p-10 p-lg-15 mx-auto">
    <!--begin::Form-->
    <Form
      class="form w-100"
      id="kt_login_signin_form"
      @submit="onSubmitLogin"
      :validation-schema="login"
    >
      <!--begin::Heading-->
      <div class="text-center mb-10">
        <!--begin::Title-->
        <h1 class="text-dark mb-3">登 录</h1>
        <!--end::Title-->

        <!--begin::Link-->
        <div class="text-gray-400 fw-semobold fs-4">
          没有账号？

          <router-link to="/sign-up" class="link-primary fw-bold">
            创建账号
          </router-link>
        </div>
        <!--end::Link-->
      </div>
      <!--begin::Heading-->

      <!--      <div class="mb-10 bg-light-info p-8 rounded">-->
      <!--        <div class="text-info">-->
      <!--          Use account <strong>admin@demo.com</strong> and password-->
      <!--          <strong>demo</strong> to continue.-->
      <!--        </div>-->
      <!--      </div>-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Label-->
        <label class="form-label fs-6 fw-bold text-dark">用户名</label>
        <!--end::Label-->

        <!--begin::Input-->
        <Field
          tabindex="1"
          class="form-control form-control-lg form-control-solid"
          type="text"
          name="username"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="username" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Input group-->
      <div class="fv-row mb-10">
        <!--begin::Wrapper-->
        <div class="d-flex flex-stack mb-2">
          <!--begin::Label-->
          <label class="form-label fw-bold text-dark fs-6 mb-0">密码</label>
          <!--end::Label-->

          <!--begin::Link-->
          <!--          <router-link to="/password-reset" class="link-primary fs-6 fw-bold">-->
          <!--            Forgot Password ?-->
          <!--          </router-link>-->
          <!--end::Link-->
        </div>
        <!--end::Wrapper-->

        <!--begin::Input-->
        <Field
          tabindex="2"
          class="form-control form-control-lg form-control-solid"
          type="password"
          name="password"
          autocomplete="off"
        />
        <!--end::Input-->
        <div class="fv-plugins-message-container">
          <div class="fv-help-block">
            <ErrorMessage name="password" />
          </div>
        </div>
      </div>
      <!--end::Input group-->

      <!--begin::Actions-->
      <div class="text-center">
        <!--begin::Submit button-->
        <button
          tabindex="3"
          type="submit"
          ref="submitButton"
          id="kt_sign_in_submit"
          class="btn btn-lg btn-primary w-100 mb-5"
        >
          <span class="indicator-label"> 登 录 </span>

          <span class="indicator-progress">
            请 稍 候 ……
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
import { defineComponent, onMounted, ref, computed } from "vue";
import { ErrorMessage, Field, Form } from "vee-validate";
import { Actions } from "@/store/enums/StoreEnums";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import * as Yup from "yup";
// import {setCurrentPageTitle} from "@/core/helpers/breadcrumb";

export default defineComponent({
  name: "sign-in",
  components: {
    Field,
    Form,
    ErrorMessage,
  },
  setup() {
    const store = useStore();
    const router = useRouter();

    const submitButton = ref<HTMLButtonElement | null>(null);
    // onMounted(async () => {
    //   await store.dispatch(Actions.LOGOUT);
    // });
    store.dispatch(Actions.LOGOUT);

    //Create form validation object
    const login = Yup.object().shape({
      username: Yup.string().required("请输入用户名").label("Username"),
      password: Yup.string()
        .min(6, "密码至少为6位")
        .required("请输入密码")
        .label("Password"),
    });

    //Form submit function
    const onSubmitLogin = async (values) => {
      // Clear existing errors
      // await store.dispatch(Actions.LOGOUT);
      // console.log(values);

      if (submitButton.value) {
        // eslint-disable-next-line
        submitButton.value!.disabled = true;
        // Activate indicator
        submitButton.value.setAttribute("data-kt-indicator", "on");
      }

      // Send login request
      await store.dispatch(Actions.LOGIN, values);
      // await store.dispatch(Actions.VERIFY_AUTH);
      const error = store.getters.getErrors;
      console.log("error message: ", error);
      const error_alert =
        error === "username or password error"
          ? "用户名或密码错误"
          : "网络异常";
      // const error_alert: string;

      if (error == "success") {
        Swal.fire({
          text: "登录成功!",
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

      //Deactivate indicator
      submitButton.value?.removeAttribute("data-kt-indicator");
      // eslint-disable-next-line
        submitButton.value!.disabled = false;
    };
    const themeMode = computed(() => {
      return store.getters.getThemeMode;
    });
    return {
      onSubmitLogin,
      login,
      submitButton,
      themeMode,
    };
  },
});
</script>
