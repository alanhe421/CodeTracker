import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {DashboardPage} from "../dashboard/dashboard";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    rootPage: any = DashboardPage;

    constructor(public navCtrl: NavController) {

    }

    openPage() {
        this.navCtrl.push(DashboardPage);
    }

}
