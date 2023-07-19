import ApiService from "@/core/services/ApiService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import store from "@/store";

export interface UserInfo {
  username: string;
  email: string;
  age: number;
  gender: number;
  birthday: string;
  avatar: string;
}

export interface UserAuthInfo {
  error_message: unknown;
  userinfo: UserInfo;
}

@Module
export default class UserinfoModule extends VuexModule implements UserAuthInfo {
  error_message = {};
  userinfo = {} as UserInfo;

  /**
   * Get current userinfo object
   * @returns UserInfo
   */
  get Userinfo(): UserInfo {
    console.log("In Userinfo", this.userinfo);
    return this.userinfo;
  }

  /**
   * Get authentification errors
   * @returns string
   */
  get getError_message() {
    console.log("getting userinfo error: ", this.error_message);
    return this.error_message;
  }

  @Mutation
  [Mutations.SET_INFOERROR](error) {
    console.log("setting userinfo error: " + error);
    this.error_message = error;
  }

  @Mutation
  [Mutations.SET_USER](user) {
    this.userinfo = user;
  }
  @Mutation
  [Mutations.SET_USERINFO](user) {
    this.userinfo = user;
  }

  // @Mutation
  // [Mutations.SET_PASSWORD](password) {
  //   this.user.password = password;
  // }

  @Mutation
  [Mutations.PURGE_USERINFO]() {
    this.userinfo = {} as UserInfo;
    this.error_message = "";
    console.log("userinfo destroyed");
  }

  @Action
  [Actions.UPDATE_USERINFO](credentials) {
    console.log("UPDATE USERINFO ing...");
    return ApiService.post("/user/updateInfo/", credentials)
      .then(({ data }) => {
        if (data.error_message != "success") {
          console.log("UPDATE USERINFO error: ", data.error_message);
          this.context.commit(Mutations.SET_INFOERROR, data.error_message);
        } else {
          console.log("UPDATE USERINFO SUCCESS!" + data);
          console.log("New Info: ", credentials);
          this.context.commit(Mutations.SET_INFOERROR, data.error_message);
          store.dispatch(Actions.GET_USERINFO);
        }
      })
      .catch((error) => {
        console.log("UPDATE USERINFO error: " + error);
      });
  }
  @Action
  [Actions.GET_USERINFO]() {
    console.log("GET_USERINFO...");
    return ApiService.get("user/info/")
      .then(({ data }) => {
        this.context.commit(Mutations.SET_INFOERROR, data.error_message);
        this.context.commit(Mutations.SET_USERINFO, data);
        console.log("GET_USERINFO Gotten: ", data);
      })
      .catch(({ response }) => {
        console.log("GET_USERINFO error: ", response);
        this.context.commit(
          Mutations.SET_INFOERROR,
          response.data.error_message
        );
      });
  }
}
