import ApiService from "@/core/services/ApiService";
import { Actions, Mutations } from "@/store/enums/StoreEnums";
import { Module, Action, Mutation, VuexModule } from "vuex-module-decorators";
import JwtService from "@/core/services/JwtService";
import store from "@/store";

export interface User {
  userId: string;
  sessionKey: string;
}

export interface UserAuthInfo {
  error_message: unknown;
  user: User;
  isAuthenticated: boolean;
}

@Module
export default class AuthModule extends VuexModule implements UserAuthInfo {
  error_message = {};
  user = {} as User;
  isAuthenticated = false;

  /**
   * Get current user object
   * @returns User
   */
  get currentUser(): User {
    return this.user;
  }

  /**
   * Verify user authentication
   * @returns boolean
   */
  get isUserAuthenticated(): boolean {
    return this.isAuthenticated;
  }

  /**
   * Get authentification errors
   * @returns array
   */
  get getErrors() {
    return this.error_message;
  }

  @Mutation
  [Mutations.SET_ERROR](error) {
    // console.log("setting error: " + error);
    this.error_message = error;
  }

  @Mutation
  [Mutations.SET_AUTH](user) {
    if (user) {
      this.isAuthenticated = true;
      this.user = user;
      this.error_message = {};
      if (user.sessionKey) {
        // console.log("calling saveToken: ", user.sessionKey);
        JwtService.saveToken(user.sessionKey);
      }
    }
  }

  @Mutation
  [Mutations.SET_USER](user) {
    this.user = user;
  }

  @Mutation
  [Mutations.PURGE_AUTH]() {
    this.isAuthenticated = false;
    this.user = {} as User;
    this.error_message = [];
    JwtService.destroyToken();
  }

  @Action
  [Actions.LOGIN](credentials) {
    // console.log("Calling AuthModule.login");
    return ApiService.post("/user/login/", credentials)
      .then(async ({ data }) => {
        if (data.error_message != "success") {
          // console.log("committing the error message: ", data.error_message);
          this.context.commit(Mutations.SET_ERROR, data.error_message);
        } else {
          // console.log("having get data: " + data.error_message);
          this.context.commit(Mutations.SET_AUTH, data);
          this.context.commit(Mutations.SET_ERROR, data.error_message);
          store.dispatch(Actions.GET_USERINFO);
          store.dispatch(Actions.GET_USER_FILES);
        }
      })
      .catch((error) => {
        // console.log("login error: " + error);
        this.context.commit(Mutations.SET_ERROR, error.error_message);
      });
  }

  @Action
  async [Actions.LOGOUT]() {
    this.context.commit(Mutations.PURGE_AUTH);
    this.context.commit(Mutations.PURGE_USER_FILES);
    this.context.commit(Mutations.PURGE_USERINFO);
    // console.log("Posting Logout request...");
    await ApiService.get("user/logout/")
      .then(({ data }) => {
        this.context.commit(Mutations.SET_ERROR, data.error_message);
        // console.log("Logout successfully!");
      })
      .catch(({ response }) => {
        // console.log("Logout error: ", response);
      });
  }

  @Action
  [Actions.REGISTER](credentials) {
    console.log("INFO: ", credentials);
    return ApiService.post("user/register/", credentials)
      .then(({ data }) => {
        console.log("success", data);
        this.context.commit(Mutations.SET_ERROR, data.error_message);
      })
      .catch(({ response }) => {
        console.log("False: ", response);
      });
  }
  @Action
  [Actions.VERIFY_AUTH]() {
    ApiService.setHeader();
    // console.log("Verifying: ");
    ApiService.post("user/verify/", { sessionKey: JwtService.getToken() })
      .then(({ data }) => {
        if (data != undefined) {
          // console.log("Got verify result", data);
          this.context.commit(Mutations.SET_AUTH, data);
        }
      })
      .catch(({ response }) => {
        // console.log("Verify error: ", response);
        if (!response) {
          this.context.commit(Mutations.SET_ERROR, "Network error");
        }
        this.context.commit(Mutations.PURGE_AUTH);
      });
  }
}
