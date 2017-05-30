import {Component} from "@angular/core";
import {NavController} from "ionic-angular";
import {AppVersion} from "@ionic-native/app-version";

@Component({
    selector: 'page-about',
    templateUrl: 'about.html'
})
export class AboutPage {
    versionNumber: string;

    constructor(public navCtrl: NavController, private appVersion: AppVersion) {

    }

    ionViewDidLoad() {
        this.appVersion.getVersionNumber().then((versionNumber) => {
            this.versionNumber = versionNumber;
        });
    }

    contactMe() {
        document.location.href = `mailto:he@1991421.cn?Subject=codetracker&body=Application version:${this.versionNumber}`;
    }
}
