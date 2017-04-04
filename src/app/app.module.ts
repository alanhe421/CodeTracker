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
// import {AuthService} from "../providers/auth.service";
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
        ProjectPage
    ],
    imports: [
        IonicModule.forRoot(AuthApp)],
    bootstrap: [IonicApp],
    entryComponents: [
        AuthApp,
        WelcomePage,
        AboutPage,
        ContactPage,
        HomePage,
        TabsPage,
        ProjectPage
    ],
    providers: [
        {provide: ErrorHandler, useClass: IonicErrorHandler}, ApiService]
})
export class AppModule {
}
