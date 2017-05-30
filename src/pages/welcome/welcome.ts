import {Component} from "@angular/core";
import {Loading, LoadingController, NavController} from "ionic-angular";
import {ApiService} from "../../providers/api.service";
import {AuthService} from "../../providers/auth.service";
import {HomePage} from "../home/home";
import {LocalSettingService} from "../../providers/localsetting.service";
/*
 Generated class for the Welcome page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 首次登陆，输入API key
 */
@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.html'
})
export class WelcomePage {

    apiKey: string = '761c5595-1fae-4f74-abdc-f822170d8793';
    loading: Loading;

    constructor(public navCtrl: NavController,
                private apiService: ApiService, private authService: AuthService, public loadingCtrl: LoadingController) {
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            showBackdrop: true
            // content: 'Please wait...'
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad WelcomePage');
    }

    saveKey() {
        this.loading.present();
        LocalSettingService.setAPIKey(this.apiKey);
        this.apiService.createAuthorizationHeader();

        this.apiService.getUsers().subscribe(res => {
            this.authService.isLoggedIn = true;
            this.authService.userInfo = res.data;
            this.loading.dismiss();
            LocalSettingService.setUserInfo(this.authService.userInfo);
            this.navCtrl.setRoot(HomePage);
        })
    }

}
