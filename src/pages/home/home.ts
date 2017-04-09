import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {DashboardPage} from "../dashboard/dashboard";
import {ProjectPage} from "../project/project";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    rootPage: any = DashboardPage;
    pages: Array<{title: string, component: any, icon: string}>;


    constructor(public navCtrl: NavController) {
        this.pages = [
            {
                title: 'Projects', component: ProjectPage, icon: 'code'
            }
        ];
    }

    openPage(page: any) {
        this.navCtrl.push(page);
    }

}
