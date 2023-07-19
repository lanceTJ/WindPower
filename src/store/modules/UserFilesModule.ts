import ApiService from "@/core/services/ApiService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";

export interface UserFiles {
  num: number;
  info: [
    {
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
    }
  ];
}

export interface UserFileError {
  error_message: unknown;
  userfiles: UserFiles;
}

@Module
export default class UserFilesModule
  extends VuexModule
  implements UserFileError
{
  error_message = {};
  userfiles = {} as UserFiles;

  /**
   * Get current userinfo object
   * @returns UserFiles
   */
  get UserFiles(): UserFiles {
    console.log("In Userinfo", this.userfiles);
    return this.userfiles;
  }

  /**
   * Get authentification errors
   * @returns string
   */
  get getFileError() {
    console.log("getting userinfo error: ", this.error_message);
    return this.error_message;
  }

  @Mutation
  [Mutations.SET_FILE_ERROR](error) {
    if (error) {
      console.log("setting user file error: " + error);
      this.error_message = error;
    } else {
      console.log("User file error reset");
      this.error_message = {};
    }
  }

  @Mutation
  [Mutations.SET_USER_FILES](userfiles) {
    this.userfiles = userfiles;
    let file;
    let cnt = 0;
    for (file in userfiles.info) {
      if (!file.icon) {
        this.userfiles.info[cnt].icon =
          "media/icons/number/" + (cnt + 1) + ".svg";
      }
      if (!file.description) {
        this.userfiles.info[cnt].description = "这是用户自己给出的备注";
      }
      cnt += 1;
    }
  }

  @Mutation
  [Mutations.PURGE_USER_FILES]() {
    this.userfiles = {} as UserFiles;
    this.error_message = "";
    console.log("user files destroyed");
  }

  @Action
  [Actions.UPLOAD_FILE](credentials) {
    console.log("UPLOAD FILE ing...");
    return ApiService.post("/data/upload/", credentials)
      .then(({ data }) => {
        if (data.error_message != "success") {
          console.log("UPLOAD_FILE error: ", data.error_message);
          this.context.commit(Mutations.SET_FILE_ERROR, data.error_message);
        } else {
          console.log("UPLOAD_FILE SUCCESS!");
          this.context.commit(Mutations.SET_FILE_ERROR, data.error_message);
          this.context
            .dispatch(Actions.GET_USER_FILES)
            .then((r) => console.log("调用成功：", r));
        }
      })
      .catch((error) => {
        console.log("UPLOAD_FILE error: " + error);
      });
  }
  @Action
  [Actions.DELITE_FILE](credentials) {
    console.log("UPLOAD FILE ing...");
    return ApiService.post("/data/delete/", credentials)
      .then(({ data }) => {
        if (data.error_message != "success") {
          console.log("DELITE_FILE error: ", data.error_message);
          this.context.commit(Mutations.SET_FILE_ERROR, data.error_message);
        } else {
          console.log("DELITE_FILE SUCCESS!");
          this.context.commit(Mutations.SET_FILE_ERROR, data.error_message);
          console.log("正在重新从服务器获取最新用户文件信息");
          this.context
            .dispatch(Actions.GET_USER_FILES)
            .then((r) => console.log("调用成功：", r));
        }
      })
      .catch((error) => {
        console.log("DELITE_FILE error: " + error);
      });
  }

  @Action
  [Actions.GET_USER_FILES]() {
    console.log("____________________--------------GET_USERFILES info...");
    return ApiService.get("data/showlist/")
      .then(({ data }) => {
        this.context.commit(Mutations.SET_FILE_ERROR, data.error_message);
        this.context.commit(Mutations.SET_USER_FILES, data);
        console.log("GET_USER_FILES info Gotten: ", data);
      })
      .catch(({ response }) => {
        console.log("GET_USER_FILES error: ", response);
      });
  }
  @Action
  [Actions.DOWNLOAD_FILE](fileinfo) {
    console.log("Downloading File...");
    return ApiService.query("data/download/", {
      params: {
        formId: fileinfo.formId,
      },
    })
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
        downloadLink.download = fileinfo.title;
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
