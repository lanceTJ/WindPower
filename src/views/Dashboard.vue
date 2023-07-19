<template>
  <!--begin::Dashboard-->
  <div class="row gy-5 g-xl-4">
    <div class="col-xxl-5">
      <MixedWidget2
        widget-classes="card-xl-stretch mb-xl-8"
        widget-color="danger"
        chart-height="200"
        stroke-color="#cb1e46"
      ></MixedWidget2>
    </div>
    <div class="col-xxl-7">
      <div class="card card-xxl-stretch mb-5 mb-xl-8">
        <!--begin::Card body-->
        <div class="card-body p-0">
          <!--begin::Heading-->
          <div class="card-px text-center py-10 my-10">
            <!--begin::Title-->
            <h2 class="fs-2x fw-bold mb-10">
              {{ translator("WelcomeBack") }}, {{ userinfo["username"] }}
            </h2>
            <!--end::Title-->

            <!--begin::Description-->
            <h3 class="fs-2x fw-bold mb-10">
              <span>{{ translator("IntroText") }}</span>
            </h3>
            <!--end::Description-->
          </div>
          <!--end::Heading-->

          <!--begin::Illustration-->
          <div class="text-center px-5">
            <img
              src="media/illustrations/TFUsed/wind_turbine.png"
              alt=""
              class="mw-100 mh-300px"
            />
          </div>
          <!--end::Illustration-->
        </div>
        <!--end::Card body-->
      </div>
    </div>
  </div>

  <div class="row gy-5 gx-xl-8">
    <div class="col-xxl-4">
      <ListWidget3 widget-classes="card-xxl-stretch mb-xl-3"></ListWidget3>
    </div>
    <div class="col-xxl-8">
      <TableWidget9
        widget-classes="card-xxl-stretch mb-5 mb-xl-8"
      ></TableWidget9>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import TableWidget9 from "@/components/widgets/tables/Widget9.vue";
import TableWidget5 from "@/components/widgets/tables/Widget5.vue";
import ListWidget1 from "@/components/widgets/lists/Widget1.vue";
import ListWidget2 from "@/components/widgets/lists/Widget2.vue";
import ListWidget3 from "@/components/widgets/lists/Widget3.vue";
// import ListWidget5 from "@/components/widgets/lists/Widget5.vue";
import ListWidget6 from "@/components/widgets/lists/Widget6.vue";
import MixedWidget2 from "@/components/widgets/mixed/Widget2.vue";
import MixedWidget5 from "@/components/widgets/mixed/Widget5.vue";
// import MixedWidget7 from "@/components/widgets/mixed/Widget7.vue";
// import MixedWidget10 from "@/components/widgets/mixed/Widget10.vue";
import { useStore } from "vuex";
import { setCurrentPageTitle } from "@/core/helpers/breadcrumb";
import { Actions } from "@/store/enums/StoreEnums";
import Swal from "sweetalert2/dist/sweetalert2.min.js";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "main-dashboard",
  components: {
    TableWidget9,
    ListWidget3,
    // ListWidget5,
    // ListWidget6,
    MixedWidget2,
    // MixedWidget5,
    // MixedWidget7,
    // MixedWidget10,
  },
  setup() {
    const store = useStore();
    const router = useRouter();
    const { t, te } = useI18n();
    // store.dispatch(Mutations.PURGE_USERINFO);
    const translator = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    const initUserinfo = async () => {
      console.log("成功调用GET_USERINFO: ", store.getters.Userinfo);
      console.log("成功调用GET_USERFILES: ", store.getters.UserFiles);
      const authError = store.getters.getError_message;
      const fileError = store.getters.getFileError;
      // const userinfo = store.getters.getError_message();
      // console.log("-----------------gotten userinfo: ", userinfo);

      console.log("authError message: ", authError);
      console.log("fileError message: ", fileError);
      // const error_alert =
      //   authError === "username or password authError" ? "用户名或密码错误" : "网络异常";
      if (
        authError != "success" ||
        (fileError != "success" && fileError != "File uploaded!")
      ) {
        Swal.fire({
          text: "用户信息认证失效",
          icon: "error",
          buttonsStyling: false,
          confirmButtonText: "重新登录",
          customClass: {
            confirmButton: "btn fw-semobold btn-light-danger",
          },
        }).then(function () {
          // Go to page after successfully login
          store.dispatch(Actions.LOGOUT);
          router.push({ name: "sign-in" });
        });
      }
    };
    initUserinfo();
    const userinfo = store.getters.Userinfo;
    onMounted(() => {
      setCurrentPageTitle("Dashboard");
    });
    return {
      translator,
      userinfo,
    };
  },
});
</script>
