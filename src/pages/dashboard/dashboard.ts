import {Component} from "@angular/core";
import {Loading, LoadingController} from "ionic-angular";
import {StatsPage} from "../stats/stats";
import {SocialSharing} from "@ionic-native/social-sharing";
import {iOptions} from "./iOptions";
import {File} from "@ionic-native/file";
import html2canvas from "html2canvas";
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
    loading: Loading;
    fileDir: string;
    fileName: string;

    constructor(private socialSharing: SocialSharing, public loadingCtrl: LoadingController, private file: File) {
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            showBackdrop: true,
            content: '图片生成中'
        });
        this.fileDir = this.file.applicationDirectory;
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DashboardPage');
        console.log(this.fileDir);
    }

    //生成图片
    createImage() {
        // this.fileName = `${stamp}.png`;
        // this.file.createFile(this.fileDir, this.fileName, true).then((FileEntry) => {
        //     console.log(FileEntry);
        //document.getElementById('content-statistics')
        // this.file.writeExistingFile(this.file.dataDirectory, this.fileName, blob).then(() => {
        //     console.log('图片生成OK');
        // });
    }

    /**
     * 社交分享
     */
    socialShare() {
        let options: iOptions = {
            message: 'CodeTracker',
        };
        let onSuccess = function (result) {
            console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
            console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
        };
        let onError = function (msg) {
            console.log("Sharing failed with message: " + msg);
        };
        options.files = ['www/assets/img/sample.png'];
        this.socialSharing.shareWithOptions(options).then(onSuccess, onError);

        // html2canvas(document.body, {useCORS: true}).then(function (canvas) {
        //     try {
        //         let b64Data = canvas.toDataURL("image/png");
        //         console.log(b64Data);
        //         console.log('图片生成OK');
        //         // options.files = ['www/assets/img/sample.jpg'];
        //         this.socialSharing.shareWithOptions(options).then(onSuccess, onError);
        //     } catch (err) {
        //         console.log(err)
        //     }
        // }).catch(function onRejected(error) {
        //     console.log(error);
        // });
    }

    test() {
        // this.loading.present();
        this.socialShare();
    }
}
