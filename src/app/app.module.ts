import {ErrorHandler, NgModule} from "@angular/core";
import {IonicApp, IonicErrorHandler, IonicModule} from "ionic-angular";
import {AuthApp} from "./app.component";
import {AboutPage} from "../pages/about/about";
import {ContactPage} from "../pages/contact/contact";
import {HomePage} from "../pages/home/home";
// import {Storage} from "@ionic/storage";
import {WelcomePage} from "../pages/welcome/welcome";
import {ProjectPage} from "../pages/project/project";
import {ApiService} from "../providers/api.service";
import {CommitsPage} from "../pages/commits/commits";
import {DashboardPage} from "../pages/dashboard/dashboard";
import {StatsPage} from "../pages/stats/stats";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {ProfilePage} from "../pages/profile/profile";
import {AppVersion} from "@ionic-native/app-version";
import {LeaderboardsPage} from "../pages/leaderboards/leaderboards";
import {LeaderdetailPage} from "../pages/leaderdetail/leaderdetail";
import {AuthService} from "../providers/auth.service";
import {UseragentsPage} from "../pages/useragents/useragents";
import {ErrorService} from "../providers/error.service";
import {InAppBrowser} from "@ionic-native/in-app-browser";
import {SocialSharing} from "@ionic-native/social-sharing";
import {File} from "@ionic-native/file";
import {Screenshot} from "@ionic-native/screenshot";
import {FileTransfer} from "@ionic-native/file-transfer";

// let storage: Storage = new Storage();

// export function getAuthHttp(http) {
//     return new AuthHttp(new AuthConfig({
//         globalHeaders: [{'Accept': 'application/json'}],
//         tokenGetter: (() => storage.get('id_token'))
//     }), http);
// }

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
        StatsPage,
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
        StatsPage,
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
        ApiService, AuthService, ErrorService, SplashScreen, StatusBar,
        AppVersion,
        InAppBrowser,
        SocialSharing,
        File,
        FileTransfer,
        Screenshot]
})
export class AppModule {
}
