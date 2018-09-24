import {Component, OnInit} from "@angular/core";
import {InAppBrowser} from '@ionic-native/in-app-browser/ngx';
import {Router} from "@angular/router";
import {Base64} from "js-base64";
import {ApiService, CLIENT_ID, REDIRECT_URI} from "../services/api.service";
import {AuthService} from "../services/auth.service";
import {LocalSettingService} from "../services/localsetting.service";

@Component({
    selector: 'page-welcome',
    templateUrl: 'welcome.page.html'
})
export class WelcomePage implements OnInit {

    apiKey: string = '';
    accessToken: string;

    constructor(
        private apiService: ApiService,
        private authService: AuthService,
        private iab: InAppBrowser,
        private route: Router
    ) {

    }

    ngOnInit() {
        console.log('ionViewDidLoad WelcomePage');
    }


    saveKey() {
        LocalSettingService.setAuthorization(`Basic ${Base64.encode(this.apiKey)}`);
        this.login();
    }


    grantClicked() {
        let url = `https://wakatime.com/oauth/authorize?client_id=${CLIENT_ID}&response_type=token&redirect_uri=${REDIRECT_URI}&scope=email,read_stats`;
        let browser = this.iab.create(url, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
        let listener = browser.on('loadstart').subscribe((event: any) => {
            if (event.url.indexOf('oauth/authorize') > -1) {
                return;
            }
            if (event.url.indexOf(REDIRECT_URI) > -1) {
                listener.unsubscribe();
                browser.close();
                let token = event.url.split('=')[1].split('&')[0];
                console.log(event.url);
                this.accessToken = token;
                LocalSettingService.setAuthorization(this.accessToken);
                this.login();
            }
        });
    }

    login() {
        this.apiService.getUsers().subscribe((res: any) => {
            this.authService.isLoggedIn = true;
            this.authService.userInfo = res.data;
            LocalSettingService.setUserInfo(this.authService.userInfo);
            this.route.navigateByUrl('home');
        })
    }

    openBlog() {
        let url = `http://1991421.cn`;
        this.iab.create(url, "_blank", "location=no,clearsessioncache=yes,clearcache=yes");
    }
}
