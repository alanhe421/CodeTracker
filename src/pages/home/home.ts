import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {DashboardPage} from "../dashboard/dashboard";
import {ProjectPage} from "../project/project";
import {WelcomePage} from "../welcome/welcome";
import {ApiService} from "../../providers/api.service";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    rootPage: any = DashboardPage;
    pages: Array<{title: string, component: any, icon: string}>;


    constructor(public navCtrl: NavController, private apiService: ApiService) {
        this.pages = [
            {
                title: 'Projects', component: ProjectPage, icon: 'code'
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
