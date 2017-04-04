import {Component} from "@angular/core";
import {Platform} from "ionic-angular";
import {StatusBar, Splashscreen} from "ionic-native";
import {WelcomePage} from "../pages/welcome/welcome";


@Component({
    templateUrl: 'app.html'
})
export class AuthApp {
    rootPage = WelcomePage;

    constructor(platform: Platform) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            StatusBar.styleDefault();
            Splashscreen.hide();
            // Schedule a token refresh on app start up
            // auth.startupTokenRefresh();
        });
    }
}
