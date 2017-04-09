import {Component} from "@angular/core";
import {NavController, LoadingController, Loading} from "ionic-angular";
import {ApiService} from "../../providers/api.service";
import {LeaderdetailPage} from "../leaderdetail/leaderdetail";

/**
 * Generated class for the Leaderboards page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-leaderboards',
    templateUrl: 'leaderboards.html',
})
export class LeaderboardsPage {

    data: Array<any>;
    loading: Loading;

    constructor(public navCtrl: NavController, private apiService: ApiService, public loadingCtrl: LoadingController) {
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            showBackdrop: false
            // content: 'Please wait...'
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Leaderboards');
        this.loading.present();
        this.apiService.getLeaders().subscribe(res => {
            this.data = res.data;
            this.loading.dismiss();
        })
    }

    openDetail(leader: any) {
        this.navCtrl.push(LeaderdetailPage, {leader: leader});
    }

}
