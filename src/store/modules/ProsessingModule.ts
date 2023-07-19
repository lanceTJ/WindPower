import ApiService from "@/core/services/ApiService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

export interface ProcessData {
  log: [];
}

export interface ProcessError {
  error_message: unknown;
  processData: ProcessData;
}

@Module
export default class ProcessingModule
  extends VuexModule
  implements ProcessError
{
  error_message = {};
  processData = {} as ProcessData;

  /**
   * Get current userinfo object
   * @returns UserFiles
   */
  get ProcessData(): ProcessData {
    console.log("In processData", this.processData);
    return this.processData;
  }

  /**
   * Get authentification errors
   * @returns string
   */
  get getProcessError() {
    console.log("getting process error: ", this.error_message);
    return this.error_message;
  }

  @Mutation
  [Mutations.SET_PROCESS_ERROR](error) {
    if (error) {
      console.log("setting process error: " + error);
      this.error_message = error;
    } else {
      console.log("process error reset");
      this.error_message = {};
    }
  }

  @Mutation
  [Mutations.SET_PROCESS_DATA](processdata) {
    this.processData = processdata;
    console.log("LOG: ", processdata.log);
    let ele;
    for (ele in processdata.log) {
      const item = processdata.log[ele].split(": ");
      console.log(item, ele);
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.processData.log[ele] = item;
    }
  }

  @Mutation
  [Mutations.PURGE_PROCESS_DATA]() {
    this.processData = {} as ProcessData;
    this.error_message = "";
    console.log("Process data destroyed");
  }

  @Action
  [Actions.WASH_FILE](credentials) {
    console.log("WASH FILE ing...");
    return ApiService.post("/process/byLevel/", credentials)
      .then(({ data }) => {
        if (data.error_message != "success") {
          console.log("WASH_FILE error: ", data.error_message);
          this.context.commit(Mutations.SET_PROCESS_ERROR, data.error_message);
        } else {
          console.log("WASH_FILE SUCCESS!");
          this.context.commit(Mutations.SET_PROCESS_DATA, data);
          this.context.commit(Mutations.SET_PROCESS_ERROR, data.error_message);
          this.context.commit(Actions.GET_USER_FILES);
        }
      })
      .catch((error) => {
        console.log("WASH_FILE error: " + error);
      });
  }

  @Action
  [Actions.DOWNLOAD_PROCESSED_FILE](formId) {
    console.log("DOWNLOAD_PROCESSED_FILE...");
    return ApiService.query("/process/download/", {})
      .then(({ data }) => {
        if (!data) {
          console.log("NO DATA.");
        }
        this.context.commit(Mutations.SET_FILE_ERROR, data.error_message);
        console.log("Calling Download window...", data);
        const url = window.URL.createObjectURL(new Blob([data]));
        // 创建一个新的a标签
        const downloadLink = document.createElement("a");
        // 设置链接地址为Blob URL
        downloadLink.href = url;
        // 设置下载的文件名
        downloadLink.download = formId + ".csv";
        // 将链接添加到页面中
        document.body.appendChild(downloadLink);
        // 模拟点击链接
        downloadLink.click();
        // 移除链接
        document.body.removeChild(downloadLink);
        // 释放Blob URL
        window.URL.revokeObjectURL(url);
      })
      .catch(({ response }) => {
        console.log("download error: ", response);
      });
  }
}
