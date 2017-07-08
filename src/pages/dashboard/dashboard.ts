import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {StatsPage} from "../stats/stats";
import domtoimage from "dom-to-image";
declare var Wechat: any;
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

    constructor(public navCtrl: NavController, public navParams: NavParams) {


    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DashboardPage');
    }

    share() {
        Wechat.share({
            text: "This is just a plain string",
            scene: Wechat.Scene.TIMELINE   // share to Timeline
        }, function () {
            alert("Success");
        }, function (reason) {
            alert("Failed: " + reason);
        });
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
}
