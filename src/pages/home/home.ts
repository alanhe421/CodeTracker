import {Component, ViewChild} from "@angular/core";
import {AlertController, NavController, ModalController, Nav} from "ionic-angular";
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
    @ViewChild(Nav) nav: Nav;
    rootPage: any = DashboardPage;
    // pages: Array<{title: string, component: any, icon: string}>;

    dashPage: any = DashboardPage;
    projectsPage: any = ProjectPage;
    leaderBoardsPage: any = LeaderboardsPage;
    userAgentsPage: any = UseragentsPage;
    aboutPage: any = AboutPage;
    userInfo: any;

    constructor(public navCtrl: NavController, private apiService: ApiService,
                private authService: AuthService,
                public modalCtrl: ModalController, private alertCtrl: AlertController) {
        this.userInfo = this.authService.userInfo;

        // this.pages = [
        //     {
        //         title: 'Dashboard', component: DashboardPage, icon: 'code'
        //     },
        //     {
        //         title: 'Projects', component: ProjectPage, icon: 'code'
        //     },
        //     {
        //         title: 'Leaderboards', component: LeaderboardsPage, icon: 'star'
        //     },
        //     {
        //         title: 'UserAgents', component: UseragentsPage, icon: 'star'
        //     }
        // ];
    }

    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    openPage(page: any) {
        // this.navCtrl.push(page);
        this.nav.setRoot(page);
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
