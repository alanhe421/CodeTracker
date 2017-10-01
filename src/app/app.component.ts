import {Component, ViewChild} from "@angular/core";
import {NavController, Platform, ToastController} from "ionic-angular";
import {WelcomePage} from "../pages/welcome/welcome";
import {SplashScreen} from "@ionic-native/splash-screen";
import {StatusBar} from "@ionic-native/status-bar";
import {AuthService} from "../providers/auth.service";
import {ErrorService} from "../providers/error.service";
import {HomePage} from "../pages/home/home";
import {Device} from "@ionic-native/device";

@Component({
    templateUrl: 'app.html'
})
export class AuthApp {
    rootPage: any = WelcomePage;
    @ViewChild('myNav') nav: NavController;

    constructor(platform: Platform, public splashScreen: SplashScreen, public statusBar: StatusBar,
                private authService: AuthService,
                private errorService: ErrorService,
                private device: Device,
                private toastCtrl: ToastController) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleLightContent();
            this.splashScreen.hide();
            if (this.authService.isLoggedIn) {
                this.nav.setRoot(HomePage);
            }
            console.log(this.device);
            this.authService.platform = this.device.platform;
            // Schedule a token refresh on app start up
            // auth.startupTokenRefresh();
            this.errorService.error$.distinctUntilChanged().subscribe((res) => {
                this.authService.isLoggedIn = false;
                this.presentToast();
                this.nav.setRoot(WelcomePage);
            })
        });
    }

    presentToast() {
        let toast = this.toastCtrl.create({
            message: '账户异常,请重新登录',
            duration: 3000,
            position: 'middle'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });
        toast.present();
    }

}
