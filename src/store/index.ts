import { createStore } from "vuex";
import { config } from "vuex-module-decorators";

import AuthModule from "@/store/modules/AuthModule";
import BodyModule from "@/store/modules/BodyModule";
import BreadcrumbsModule from "@/store/modules/BreadcrumbsModule";
import ConfigModule from "@/store/modules/ConfigModule";
import ThemeModeModule from "@/store/modules/ThemeModeModule";
import UserinfoModule from "@/store/modules/UserinfoModule";
import UserFilesModule from "@/store/modules/UserFilesModule";
import ProcessingModule from "@/store/modules/ProsessingModule";
import AnalyseModule from "@/store/modules/AnalyseModule";
import PredictModule from "@/store/modules/PredictModule";

config.rawError = true;

const store = createStore({
  modules: {
    AuthModule,
    BodyModule,
    BreadcrumbsModule,
    ConfigModule,
    ThemeModeModule,
    UserinfoModule,
    UserFilesModule,
    ProcessingModule,
    AnalyseModule,
    PredictModule,
  },
});

export default store;
