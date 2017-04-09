import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
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
        LeaderdetailPage
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
        LeaderdetailPage
    ],
    providers: [
        {
            provide: ErrorHandler,
            useClass: IonicErrorHandler
        }, ApiService, AuthService, SplashScreen, StatusBar, AppVersion]
})
export class AppModule {
}
