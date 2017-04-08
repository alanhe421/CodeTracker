import {Component} from "@angular/core";
import {NavParams} from "ionic-angular";
import {ApiService} from "../../providers/api.service";

/*
 Generated class for the Commits page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-commits',
    templateUrl: 'commits.html'
})
export class CommitsPage {
    projectId: string;

    constructor(public navParams: NavParams, private apiService: ApiService) {
        this.projectId = this.navParams.get('projectId');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad CommitsPage');

        this.apiService.getCommits(this.projectId).subscribe(res => {
            console.log(res);
        });
    }

}
