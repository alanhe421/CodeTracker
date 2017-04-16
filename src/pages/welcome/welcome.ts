import {Component} from "@angular/core";
import {NavController, LoadingController, Loading} from "ionic-angular";
import {Base64} from "js-base64";
import {ApiService} from "../../providers/api.service";
import {AuthService} from "../../providers/auth.service";
import {HomePage} from "../home/home";
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

    apiKey: string = '';
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
        localStorage.setItem('Authorization', Base64.encode(this.apiKey));
        this.apiService.createAuthorizationHeader();

        this.apiService.getUsers().subscribe(res => {
            this.authService.isLoggedIn = true;
            this.authService.userInfo = res.data;
            this.loading.dismiss();
            this.navCtrl.setRoot(HomePage);
        })
    }

}
