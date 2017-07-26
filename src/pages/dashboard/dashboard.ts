import {Component, ElementRef, ViewChild} from "@angular/core";
import {Loading, LoadingController} from "ionic-angular";
import {StatsPage} from "../stats/stats";
import {SocialSharing} from "@ionic-native/social-sharing";
import {iOptions} from "./iOptions";
import * as html2canvas from "html2canvas";
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
    @ViewChild('myscreenshot') myscreenshot: ElementRef;//截图

    constructor(private socialSharing: SocialSharing,
                public loadingCtrl: LoadingController) {
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            showBackdrop: true,
            content: '图片生成中'
        });
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad DashboardPage');
        console.log(this.fileDir);
    }

    //创建图片
    createImg(canvas) {
        let dataURL = canvas.toDataURL("image/png");// getting base64 string
        let triggerDownload = this.myscreenshot.nativeElement.href = dataURL;
        // triggerDownload.click();
        // triggerDownload.remove();
    }

    /**
     * 社交分享
     */
    socialShare() {
        // options.files = ['www/assets/img/sample.png'];
        let options: iOptions = {
            message: 'CodeTracker',
            files: ['myscreenshot.png']
        };
        let onSuccess = function (result) {
            console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
            console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
        };
        let onError = function (msg) {
            console.log("Sharing failed with message: " + msg);
        };

        html2canvas(document.body, {useCORS: true}).then(canvas => {
            this.createImg(canvas);
            // this.socialSharing.shareWithOptions(options).then(onSuccess, onError);
        }).catch(function onRejected(error) {
            console.log(error);
        });
    }


    test() {
        // this.loading.present();
        this.socialShare();
    }


}
