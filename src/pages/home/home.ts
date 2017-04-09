import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {ProjectPage} from "../project/project";
import {WelcomePage} from "../welcome/welcome";
import {ApiService} from "../../providers/api.service";
import {AboutPage} from "../about/about";
import {LeaderboardsPage} from "../leaderboards/leaderboards";
import {DashboardPage} from "../dashboard/dashboard";
import {AuthService} from "../../providers/auth.service";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    rootPage: any = DashboardPage;
    pages: Array<{title: string, component: any, icon: string}>;
    aboutPage = AboutPage;
    userInfo: any;

    constructor(public navCtrl: NavController, private apiService: ApiService, private authService: AuthService) {
        this.userInfo = this.authService.userInfo;

        this.pages = [
            {
                title: 'Dashboard', component: DashboardPage, icon: 'code'
            },
            {
                title: 'Projects', component: ProjectPage, icon: 'code'
            },
            {
                title: 'Leaderboards', component: LeaderboardsPage, icon: 'star'
            }
        ];
    }

    openPage(page: any) {
        this.navCtrl.push(page);
    }

    //退出
    logout() {
        this.navCtrl.setRoot(WelcomePage);
        localStorage.removeItem('Authorization');
        this.apiService.createAuthorizationHeader();
    }

}
