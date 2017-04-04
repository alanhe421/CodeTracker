import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {ProjectPage} from "../project/project";

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage {
    rootPage: any = ProjectPage;

    constructor(public navCtrl: NavController) {

    }

    openPage() {
        this.navCtrl.push(ProjectPage);
    }

}
