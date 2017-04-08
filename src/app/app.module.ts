import {NgModule, ErrorHandler} from "@angular/core";
import {IonicApp, IonicModule, IonicErrorHandler} from "ionic-angular";
import {AuthApp} from "./app.component";
import {AboutPage} from "../pages/about/about";
import {ContactPage} from "../pages/contact/contact";
import {HomePage} from "../pages/home/home";
import {TabsPage} from "../pages/tabs/tabs";
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
        TabsPage,
        ProjectPage,
        CommitsPage,
        DashboardPage,
        StatsPage,
        ProfilePage
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
        TabsPage,
        ProjectPage,
        CommitsPage,
        DashboardPage,
        StatsPage,
        ProfilePage
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler}, ApiService, SplashScreen, StatusBar]
})
export class AppModule {
}
