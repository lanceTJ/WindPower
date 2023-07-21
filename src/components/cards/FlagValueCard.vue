<template>
  <!--begin::Card-->
  <div class="card h-100" :class="cardClasses">
    <!--begin::Card header-->
    <div class="card-header flex-nowrap border-0 pt-0 m-0">
      <!--begin::Card title-->
      <div class="card-title m-0">
        <!--begin::Title-->
        <div class="fs-4 fw-semobold text-hover-grey text-primary text-600 m-0">
          {{ title }}
        </div>
        <!--end::Title-->
      </div>
      <!--end::Card title-->
    </div>
    <!--end::Card header-->

    <!--begin::Card body-->
    <div class="card-body d-flex flex-column px-9 py-0">
      <!--begin::Heading-->
      <div class="fs-2tx fw-bold mb-3">
        {{ content }}
      </div>
      <!--end::Heading-->
    </div>
    <!--end::Card body-->
  </div>
  <!--end::Card-->
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "flag_value_card",
  components: {},
  props: {
    cardClasses: String,

    title: String,

    content: String,
  },
});
</script>
