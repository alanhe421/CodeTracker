import {Component} from "@angular/core";
import {Loading, LoadingController, NavController} from "ionic-angular";
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
    page: number = 1;

    constructor(public navCtrl: NavController, private apiService: ApiService, public loadingCtrl: LoadingController) {
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            showBackdrop: true
            // content: 'Please wait...'
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Leaderboards');
        this.loadMore();
    }

    loadMore() {
        this.loading.present();
        this.apiService.getLeaders(null, this.page).subscribe(res => {
                this.data = res.data;
                this.page += 1;
                this.loading.dismiss();
            },
            error => {
                this.loading.dismiss();
            }
        )
    }

    openDetail(leader: any) {
        this.navCtrl.push(LeaderdetailPage, {leader: leader});
    }

}
