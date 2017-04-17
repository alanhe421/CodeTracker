import {Component} from "@angular/core";
import {Platform} from "ionic-angular";
import {WelcomePage} from "../pages/welcome/welcome";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {AuthService} from "../providers/auth.service";
import {HomePage} from "../pages/home/home";
import {Page} from "ionic-angular/umd/navigation/nav-util";


@Component({
    templateUrl: 'app.html'
})
export class AuthApp {
    rootPage: Page = WelcomePage;

    constructor(platform: Platform, public splashScreen: SplashScreen, public statusBar: StatusBar, private authService: AuthService) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleLightContent();
            this.splashScreen.hide();
            if (this.authService.isLoggedIn) {
                this.rootPage = HomePage;
            }
            // Schedule a token refresh on app start up
            // auth.startupTokenRefresh();
        });
    }
}
