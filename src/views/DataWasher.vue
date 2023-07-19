<template>
  <KTModalCard
    title="DataWasher"
    description="WasherDescription"
    image="media/illustrations/TFUsed/clean_up.svg"
    button-text="SelectYourDataSet"
    modal-id="kt_modal_create_account"
  ></KTModalCard>
  <!--  <KTUpgradePlanModal></KTUpgradePlanModal>-->
  <KTCreateAccountModal :currentStepPlace="0"></KTCreateAccountModal>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import KTModalCard from "@/components/cards/Card.vue";
import KTUpgradePlanModal from "@/components/modals/general/UpgradePlanModal.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { getIllustrationsPath } from "@/core/helpers/assets";
import KTCreateAccountModal from "@/components/modals/wizards/CreateAccountModal.vue";
export default defineComponent({
  name: "upgrade-plan",
  components: {
    KTModalCard,
    // KTUpgradePlanModal,
    KTCreateAccountModal,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("DataWasher", []);
    });

    return {
      getIllustrationsPath,
    };
  },
});
</script>
