import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {StatsPage} from "../stats/stats";
import domtoimage from "dom-to-image";
import {SocialSharing} from "@ionic-native/social-sharing";
/*
 Generated class for the Dashboard page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.html'
})
export class DashboardPage {

    tab1: any = StatsPage;
    tab2: any = StatsPage;
    tab3: any = StatsPage;
    tab4: any = StatsPage;

    constructor(public navCtrl: NavController, public navParams: NavParams, private socialSharing: SocialSharing) {


    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DashboardPage');
    }

    share() {
    }

    saveToImage() {
        console.log(domtoimage);
        domtoimage.toJpeg(document.getElementById('content-statistics'), {quality: 0.95})
            .then(function (dataUrl) {
                var link = document.createElement('a');
                link.download = 'screen.jpeg';
                link.href = dataUrl;
                link.click();
            });
    }

    /**
     * 社交分享
     */
    socialShare() {
        let options = {
            message: 'CodeTracker'
        };
        let onSuccess = function (result) {
            console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
            console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
        };

        let onError = function (msg) {
            console.log("Sharing failed with message: " + msg);
        };

        this.socialSharing.shareWithOptions(options).then(onSuccess, onError);

    }
}
