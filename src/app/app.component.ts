import {Component} from "@angular/core";
import {Platform} from "ionic-angular";
import {WelcomePage} from "../pages/welcome/welcome";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";


@Component({
    templateUrl: 'app.html'
})
export class AuthApp {
    rootPage = WelcomePage;

    constructor(platform: Platform, public splashScreen: SplashScreen, public statusBar: StatusBar) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            // Schedule a token refresh on app start up
            // auth.startupTokenRefresh();
        });
    }
}
