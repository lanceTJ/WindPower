<template>
  <KTModalsCard
    title="AddDatasetTitle"
    description="AddDatasetsDescription"
    image="media/illustrations/TFUsed/server_push.png"
    button-text="AddDatasetsButton"
    modal-id="kt_modal_add_datasets"
  ></KTModalsCard>

  <upload_file_modal></upload_file_modal>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue";
import KTModalsCard from "@/components/cards/Card.vue";
import upload_file_modal from "@/components/modals/general/UploadFile.vue";
import { setCurrentPageBreadcrumbs } from "@/core/helpers/breadcrumb";
import { getIllustrationsPath } from "@/core/helpers/assets";
import { useI18n } from "vue-i18n";

export default defineComponent({
  name: "share-and-earn",
  components: {
    KTModalsCard,
    upload_file_modal,
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
    onMounted(() => {
      setCurrentPageBreadcrumbs("AddData", []);
    });

    return {
      getIllustrationsPath,
      translator,
    };
  },
});
</script>
