import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {StatsPage} from "../stats/stats";
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
}
