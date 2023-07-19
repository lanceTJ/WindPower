enum Actions {
  // action types
  DELITE_FILE = "deleteFile",
  PREDICT_FILE = "predictFile",
  DOWNLOAD_ANALYSED_DATA = "downloadAnalysedData",
  ANALYSE_FILE = "analyseFile",
  ADD_BODY_CLASSNAME = "addBodyClassName",
  REMOVE_BODY_CLASSNAME = "removeBodyClassName",
  ADD_BODY_ATTRIBUTE = "addBodyAttribute",
  REMOVE_BODY_ATTRIBUTE = "removeBodyAttribute",
  ADD_CLASSNAME = "addClassName",
  VERIFY_AUTH = "verifyAuth",
  LOGIN = "login",
  LOGOUT = "logout",
  REGISTER = "register",
  GET_USERINFO = "getUserinfo",
  UPDATE_USER = "updateUser",
  FORGOT_PASSWORD = "forgotPassword",
  SET_BREADCRUMB_ACTION = "setBreadcrumbAction",
  SET_THEME_MODE_ACTION = "setThemeModeAction",
  UPDATE_USERINFO = "updateUserInfo",
  UPLOAD_FILE = "updateFile",
  GET_USER_FILES = "getUserFiles",
  DOWNLOAD_FILE = "downloadFile",
  WASH_FILE = "washFile",
  DOWNLOAD_PROCESSED_FILE = "downloadProcessedFile",
}

enum Mutations {
  // mutation types
  SET_PREDICT_DATA = "setPredictData",
  SET_PREDICT_ERROR = "setPredictError",
  PURGE_ANALYSE_DATA = "purgeAnalyseData",
  SET_ANALYSE_FILE = "setAnalyseFile",
  SET_ANALYSE_DATA = "setAnalyseData",
  SET_ANALYSE_ERROR = "setAnalyseError",
  SET_PROCESS_ERROR = "setProcessError",
  PURGE_PROCESS_DATA = "purgeProcessData",
  SET_PROCESS_DATA = "setProcessData",
  SET_CLASSNAME_BY_POSITION = "appendBreadcrumb",
  PURGE_AUTH = "logOut",
  SET_AUTH = "setAuth",
  SET_USER = "setUser",
  SET_FILE_ERROR = "setFileError",
  SET_USER_FILES = "setUserFiles",
  PURGE_USER_FILES = "purgeUserFiles",
  SET_USERINFO = "setUserinfo",
  PURGE_USERINFO = "purgeUserInfo",
  SET_PASSWORD = "setPassword",
  SET_ERROR = "setError",
  SET_INFOERROR = "setinfoerror",
  SET_BREADCRUMB_MUTATION = "setBreadcrumbMutation",
  SET_LAYOUT_CONFIG = "setLayoutConfig",
  RESET_LAYOUT_CONFIG = "resetLayoutConfig",
  OVERRIDE_LAYOUT_CONFIG = "overrideLayoutConfig",
  OVERRIDE_PAGE_LAYOUT_CONFIG = "overridePageLayoutConfig",
  SET_THEME_MODE_MUTATION = "setThemeModeMutation",
}

export { Actions, Mutations };