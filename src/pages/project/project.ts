import {Component} from "@angular/core";
import {ApiService} from "../../providers/api.service";
import {Loading, LoadingController, NavController} from "ionic-angular";
import {CommitsPage} from "../commits/commits";

/*
 Generated class for the Project page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-project',
    templateUrl: 'project.html'
})
export class ProjectPage {

    items: Array<any> = [];
    loading: Loading;

    constructor(private apiService: ApiService, public navCtrl: NavController, public loadingCtrl: LoadingController) {
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            showBackdrop: true
            // content: 'Please wait...'
        });
    }

    ionViewDidLoad() {
        this.loading.present();
        this.apiService.getProjects().subscribe(res => {
                console.log(res);
                this.items = res['data'];
                this.loading.dismiss();
            },
            error => {
                this.loading.dismiss();
            }
        );
        console.log('ionViewDidLoad ProjectPage');
    }

    showCommits(projectId: string) {
        this.navCtrl.push(CommitsPage, {projectId: projectId});
    }

}
