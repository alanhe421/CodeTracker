import {Component} from "@angular/core";
import {Loading, LoadingController, NavController} from "ionic-angular";
import {ApiService, CLIENT_ID, REDIRECT_URI} from "../../providers/api.service";
import {AuthService} from "../../providers/auth.service";
import {HomePage} from "../home/home";
import {LocalSettingService} from "../../providers/localsetting.service";
import {InAppBrowser} from "@ionic-native/in-app-browser";

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
                private apiService: ApiService,
                private authService: AuthService,
                public loadingCtrl: LoadingController,
                private iab: InAppBrowser) {
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

    /**
     * wakatime授权
     */
    grantClicked() {
        let url = `https://wakatime.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=email,read_stats`;
        let browser = this.iab.create(url, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
        let listener = browser.on('loadstart').subscribe((event: any) => {

            //Ignore the wakatime authorize screen
            if (event.url.indexOf('oauth/authorize') > -1) {
                return;
            }

            //Check the redirect uri
            if (event.url.indexOf(REDIRECT_URI) > -1) {
                listener.unsubscribe();
                browser.close();
                let token = event.url.split('=')[1].split('&')[0];
                alert(event.url);
                alert(token);
            } else {
                alert("Could not authenticate");
            }
        });
    }

}
