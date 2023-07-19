import { configure } from "vee-validate";
// import { localize } from "@vee-validate/i18n";
// import en from "@vee-validate/i18n/dist/locale/en.json";
// import zhCn from "@vee-validate/i18n/dist/locale/zh_CN.json";
export function initVeeValidate() {
  // Updating default vee-validate configuration
  configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: true,
    // generateMessage: localize({
    //   en,
    //   zhCn,
    // }),
  });
}
