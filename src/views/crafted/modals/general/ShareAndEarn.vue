<template>
  <KTModalsCard
    title="Share & Earn Modal Example"
    description="Click on the below buttons to launch <br/>a share & earn example."
    :image="getIllustrationsPath('9.png')"
    button-text="Share & Earn"
    modal-id="kt_modal_share_earn"
  ></KTModalsCard>

  <upload_file_modal></upload_file_modal>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import KTModalsCard from "@/components/cards/Card.vue";
import upload_file_modal from "@/components/modals/general/ShareAndEarnModal.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { getIllustrationsPath } from "@/core/helpers/assets";

export default defineComponent({
  name: "share-and-earn",
  components: {
    KTModalsCard,
    upload_file_modal,
  },
  setup() {
    onMounted(() => {
      setCurrentPageBreadcrumbs("Share & Earn", ["Modals", "General"]);
    });

    return {
      getIllustrationsPath,
    };
  },
});
</script>
