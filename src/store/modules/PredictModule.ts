import ApiService from "@/core/services/ApiService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Action, Module, Mutation, VuexModule } from "vuex-module-decorators";

export interface PredictData {
  file: string;
  base_aPower: Array<number | null>;
  base_yd15: Array<number | null>;
  base_time: Array<any>;
  pre_aPower: Array<number | null>;
  pre_yd15: Array<number | null>;
  pre_time: Array<any>;
}

export interface PredictError {
  error_message: unknown;
  predictData: PredictData;
}

@Module
export default class PredictingModule
  extends VuexModule
  implements PredictError
{
  error_message = {};
  predictData = {} as PredictData;

  /**
   * Get current userinfo object
   * @returns UserFiles
   */
  get PredictData(): PredictData {
    console.log("In predictData", this.predictData);
    return this.predictData;
  }

  /**
   * Get authentification errors
   * @returns string
   */
  get getPredictError() {
    console.log("getting predict error: ", this.error_message);
    return this.error_message;
  }

  // @Mutation
  // [Mutations.SET_PREDICT_FILE](file) {
  //   this.PredictData.file = file;
  //   console.log("接下来选择的文件是：", file);
  // }
  @Mutation
  [Mutations.SET_PREDICT_ERROR](error) {
    if (error) {
      console.log("setting predict error: " + error);
      this.error_message = error;
    } else {
      console.log("predict error reset");
      this.error_message = {};
    }
  }

  @Mutation
  [Mutations.SET_PREDICT_DATA](predictData) {
    this.predictData = predictData;
    // // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // // @ts-ignore
    console.log("All Predict Data: ", this.predictData);
    let item;
    for (item in this.predictData.base_aPower) {
      if (this.predictData.base_aPower[item] == -1061109567) {
        this.predictData.base_aPower[item] = null;
      }
    }
    for (item in this.predictData.base_yd15) {
      if (this.predictData.base_yd15[item] == -1061109567) {
        this.predictData.base_yd15[item] = null;
      }
    }
  }

  @Action
  [Actions.PREDICT_FILE](credentials) {
    console.log("PREDICT FILE: ", credentials);
    return ApiService.post("/predict/", credentials)
      .then(({ data }) => {
        if (data.error_message != "success") {
          console.log("Predict error: ", data.error_message);
          this.context.commit(Mutations.SET_FILE_ERROR, data.error_message);
        } else {
          console.log("Predict SUCCESS!", data);
          this.context.commit(Mutations.SET_FILE_ERROR, data.error_message);
          this.context.commit(Mutations.SET_PREDICT_DATA, data);
          this.context.commit(Actions.GET_USER_FILES);
        }
        return data;
      })
      .catch((error) => {
        console.log("UPLOAD_FILE error: " + error);
      });
  }
}
