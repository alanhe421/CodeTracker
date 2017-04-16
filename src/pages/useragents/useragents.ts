import {Component} from "@angular/core";
import {ApiService} from "../../providers/api.service";
import {Loading, LoadingController} from "ionic-angular";

/**
 * Generated class for the Useragents page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-useragents',
    templateUrl: 'useragents.html',
})
export class UseragentsPage {
    loading: Loading;
    items: Array<any> = [];

    constructor(private apiService: ApiService, public loadingCtrl: LoadingController) {
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            showBackdrop: true
            // content: 'Please wait...'
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Useragents');
        this.loading.present();
        this.apiService.getUserAgents().subscribe(res => {
            this.items = res.data;
            this.loading.dismiss();
        })
    }

}
