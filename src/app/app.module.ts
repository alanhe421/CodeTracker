import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {AuthApp} from "./app.component";
import {AboutPage} from "../pages/about/about";
import {ContactPage} from "../pages/contact/contact";
import {HomePage} from "../pages/home/home";
import {WelcomePage} from "../pages/welcome/welcome";
import {ProjectPage} from "../pages/project/project";
import {ApiService} from "../providers/api.service";
import {CommitsPage} from "../pages/commits/commits";
import {DashboardPage} from "../pages/dashboard/dashboard";
import {BrowserModule} from "@angular/platform-browser";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {ProfilePage} from "../pages/profile/profile";
import {LeaderboardsPage} from "../pages/leaderboards/leaderboards";
import {LeaderdetailPage} from "../pages/leaderdetail/leaderdetail";
import {AuthService} from "../providers/auth.service";
import {UseragentsPage} from "../pages/useragents/useragents";
import {ErrorService} from "../providers/error.service";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {SocialSharing} from "@ionic-native/social-sharing";
import {File} from "@ionic-native/file";
import {FileTransfer} from "@ionic-native/file-transfer";
import {AppProvider} from "./app.provider";
import {HttpModule} from "@angular/http";

let appProviders = AppProvider.getProviders();

@NgModule({
    declarations: [
        AuthApp,
        WelcomePage,
        AboutPage,
        ContactPage,
        HomePage,
        ProjectPage,
        CommitsPage,
        DashboardPage,
        ProfilePage,
        LeaderboardsPage,
        LeaderdetailPage,
        UseragentsPage
    ],
    imports: [
        BrowserModule,
        HttpModule,
        IonicModule.forRoot(AuthApp)
    ],
    bootstrap: [IonicApp],
    entryComponents: [
        AuthApp,
        WelcomePage,
        AboutPage,
        ContactPage,
        HomePage,
        ProjectPage,
        CommitsPage,
        DashboardPage,
        ProfilePage,
        LeaderboardsPage,
        LeaderdetailPage,
        UseragentsPage
    ],
    providers: [
        {
            provide: ErrorHandler,
            useClass: IonicErrorHandler
        },
        ApiService,
        AuthService,
        ErrorService,
        SplashScreen,
        StatusBar,
        InAppBrowser,
        SocialSharing,
        File,
        FileTransfer]
        .concat(appProviders)
})
export class AppModule {
}
