<template>
  <!--begin::List Widget 3-->
  <div class="card" :class="widgetClasses">
    <!--begin::Header-->
    <div class="card-header border-0">
      <h3 class="card-title fw-bold text-dark">{{ translator("Todo") }}</h3>

      <div class="card-toolbar">
        <!--begin::Menu-->
        <button
          type="button"
          class="btn btn-sm btn-icon btn-color-primary btn-active-light-primary btn-hover-rotate-start"
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
    </div>
    <!--end::Header-->

    <!--begin::Body-->
    <div class="card-body pt-2">
      <template v-for="(item, index) in list" :key="index">
        <!--begin::Item-->
        <div
          :class="{ 'mb-8': list.length - 1 !== index }"
          class="d-flex align-items-center"
        >
          <!--begin::Bullet-->
          <span
            class="bullet bullet-vertical h-40px"
            :class="`bg-${item.color}`"
          ></span>
          <!--end::Bullet-->

          <!--begin::Checkbox-->
          <div class="form-check form-check-custom form-check-solid mx-5">
            <input class="form-check-input" type="checkbox" value="" />
          </div>
          <!--end::Checkbox-->

          <!--begin::Description-->
          <div class="flex-grow-1">
            <a href="#" class="text-gray-800 text-hover-primary fw-bold fs-6">{{
              item.title
            }}</a>

            <span class="text-muted fw-semobold d-block">{{ item.text }}</span>
          </div>
          <!--end::Description-->

          <span class="badge fs-8 fw-bold" :class="`badge-light-${item.color}`"
            >New</span
          >
        </div>
        <!--end:Item-->
      </template>
    </div>
    <!--end::Body-->
  </div>
  <!--end:List Widget 3-->
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import Dropdown2 from "@/components/dropdown/Dropdown2.vue";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "kt-widget-3",
  components: {
    Dropdown2,
  },
  props: {
    widgetClasses: String,
  },
  setup() {
    const { t, te } = useI18n();
    const translator = (text) => {
      if (te(text)) {
        return t(text);
      } else {
        return text;
      }
    };
    const list = ref([
      {
        color: "success",
        title: "添加数据集",
        text: "2天",
      },
      {
        color: "primary",
        title: "进行预测模块设计",
        text: "3天",
      },
      {
        color: "warning",
        title: "进行用户测试",
        text: "5天",
      },
      {
        color: "primary",
        title: "可视化设计",
        text: "3天",
      },
      {
        color: "danger",
        title: "研讨数据预测整合",
        text: "12天",
      },
      {
        color: "success",
        title: "研讨数据清洗需求",
        text: "3天",
      },
    ]);

    return {
      list,
      translator,
    };
  },
});
</script>
