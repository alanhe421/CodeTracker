import {Component} from "@angular/core";
import {AlertController, NavController, ModalController} from "ionic-angular";
import {ProjectPage} from "../project/project";
import {WelcomePage} from "../welcome/welcome";
import {ApiService} from "../../providers/api.service";
import {AboutPage} from "../about/about";
import {LeaderboardsPage} from "../leaderboards/leaderboards";
import {DashboardPage} from "../dashboard/dashboard";
import {AuthService} from "../../providers/auth.service";
import {ProfilePage} from "../profile/profile";
import {UseragentsPage} from "../useragents/useragents";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    rootPage: any = DashboardPage;
    pages: Array<{title: string, component: any, icon: string}>;
    aboutPage = AboutPage;
    userInfo: any;

    constructor(public navCtrl: NavController, private apiService: ApiService,
                private authService: AuthService,
                public modalCtrl: ModalController, private alertCtrl: AlertController) {
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
            },
            {
                title: 'UserAgents', component: UseragentsPage, icon: 'star'
            }
        ];
    }

    openPage(page: any) {
        this.navCtrl.push(page);
    }

    //退出
    logout() {
        let confirm = this.alertCtrl.create({
            title: '确定注销?',
            buttons: [
                {
                    text: '取消',
                    handler: () => {
                        console.log('Disagree clicked');
                    }
                },
                {
                    text: '确定',
                    handler: () => {
                        this.navCtrl.setRoot(WelcomePage);
                        localStorage.removeItem('Authorization');
                        this.apiService.createAuthorizationHeader();
                    }
                }
            ]
        });
        confirm.present();
    }

    presentModal() {
        let modal = this.modalCtrl.create(ProfilePage);
        modal.present();
    }

}
