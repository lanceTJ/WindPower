import ApiService from "@/core/services/ApiService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

export interface AnalyseData {
  dataSet: NonNullable<unknown>;
  info: Array<number | null>;
  file: {
    status: string;

    icon: string;

    title: string;

    description: string;

    beginDate: string;

    beginTime: string;

    endDate: string;

    endTime: string;

    formId: number;
    name: string;
    upload_time: string;
  };
}

export interface AnalyseError {
  error_message: unknown;
  analyseData: AnalyseData;
}

@Module
export default class AnalyseingModule
  extends VuexModule
  implements AnalyseError
{
  error_message = {};
  analyseData = {} as AnalyseData;

  /**
   * Get current userinfo object
   * @returns UserFiles
   */
  get AnalyseData(): AnalyseData {
    console.log("In analyseData", this.analyseData);
    return this.analyseData;
  }

  /**
   * Get authentification errors
   * @returns string
   */
  get getAnalyseError() {
    console.log("getting analyse error: ", this.error_message);
    return this.error_message;
  }

  @Mutation
  [Mutations.SET_ANALYSE_FILE](file) {
    this.AnalyseData.file = file;
    console.log("接下来选择的文件是：", file);
  }
  @Mutation
  [Mutations.SET_ANALYSE_ERROR](error) {
    if (error) {
      console.log("setting analyse error: " + error);
      this.error_message = error;
    } else {
      console.log("analyse error reset");
      this.error_message = {};
    }
  }

  @Mutation
  [Mutations.SET_ANALYSE_DATA](analyseData) {
    this.analyseData = analyseData;
    this.analyseData.dataSet = analyseData.time.map((x, index) => {
      return { x, y: analyseData.info[index] };
    });
    let item;
    for (item in this.analyseData.info) {
      if (this.analyseData.info[item] == -1061109567) {
        this.analyseData.info[item] = null;
      }
    }
    // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // // @ts-ignore
    // console.log("Got DataSet: ", this.analyseData.dataSet.slice(0, 10));
    // console.log("All Data: ", this.analyseData);
  }

  @Mutation
  [Mutations.PURGE_ANALYSE_DATA]() {
    this.analyseData = {} as AnalyseData;
    this.error_message = "";
    console.log("Analyse data destroyed");
  }

  @Action
  [Actions.ANALYSE_FILE](credentials) {
    if (
      credentials == "WINDSPEED" ||
      credentials == "YD15" ||
      credentials == "PREPOWER" ||
      credentials == "WINDDIRECTION" ||
      credentials == "TEMPERATURE" ||
      credentials == "HUMIDITY" ||
      credentials == "PRESSURE" ||
      credentials == "ROUNDAWS1" ||
      credentials == "ROUNDAPOWER0"
    ) {
      if (credentials == "ROUNDAWS1") {
        credentials = "ROUND(A.WS,1)";
      }
      if (credentials == "ROUNDAPOWER0") {
        credentials = "ROUND(A.POWER,O)";
      }
      console.log("ANALYSE FILE: ", credentials);
      return ApiService.query("/data/display/", {
        params: {
          key: credentials,
        },
      })
        .then(({ data }) => {
          console.log("请求ANALYSE返回了Data: ", data);
          if (!data.error_message) {
            data = JSON.parse(data);
          }
          if (data.error_message != "success" && data.code != "200") {
            console.log("ANALYSE_FILE error: ", data.error_message);
            this.context.commit(
              Mutations.SET_ANALYSE_ERROR,
              data.error_message
            );
          } else {
            console.log("ANALYSE_FILE SUCCESS!");
            this.context.commit(Mutations.SET_ANALYSE_DATA, data);
            this.context.commit(
              Mutations.SET_ANALYSE_ERROR,
              data.error_message
            );
          }
          return data;
        })
        .catch((error) => {
          console.log("ANALYSE_FILE error:" + error);
        });
    } else {
      console.log("Analyse 参数不合法:", credentials);
    }
  }

  @Action
  [Actions.DOWNLOAD_ANALYSED_DATA](fileinfo) {
    console.log("DOWNLOAD_ANALYSEED_FILE...");
    return ApiService.query("analyse/download/", {})
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
        downloadLink.download = fileinfo.title + ".csv";
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
