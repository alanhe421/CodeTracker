import {Component} from "@angular/core";
import {ApiService} from "../../providers/api.service";
import {NavController} from "ionic-angular";
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

    constructor(private apiService: ApiService, public navCtrl: NavController) {
    }

    ionViewDidLoad() {
        this.apiService.getProjects().subscribe(res => {
            console.log(res);
            this.items = res.data;
        });
        console.log('ionViewDidLoad ProjectPage');
    }

    showCommits(projectId: string) {
        this.navCtrl.push(CommitsPage, {projectId: projectId});
    }

}
