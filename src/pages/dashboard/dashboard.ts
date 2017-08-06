import {Component} from "@angular/core";
import {Loading, LoadingController} from "ionic-angular";
import {StatsPage} from "../stats/stats";
import {SocialSharing} from "@ionic-native/social-sharing";
import {iOptions} from "./iOptions";
import {File} from "@ionic-native/file";
import {FileTransfer, FileTransferObject} from "@ionic-native/file-transfer";
import * as domtoimage from "dom-to-image";
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
    // @ViewChild('myscreenshot') myscreenshot: ElementRef;//截图

    constructor(private socialSharing: SocialSharing,
                private transfer: FileTransfer,
                private file: File,
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

    /**
     * 社交分享
     */
    shareClicked() {
        let filename = this.file.dataDirectory + 'myscreenshot.jpeg';
        let options: iOptions = {
            message: 'CodeTracker',
            subject: 'CodeTracker',
            files: [filename],
            chooserTitle: 'CodeTracker'
        };

        // function filter(node) {
        //     return (node.tagName !== 'i');
        // }
        // this.socialShare(options);

        this.loading.present();
        domtoimage.toJpeg(document.getElementById('content-statistics'))
            .then(function (dataURL) {
                this.downloadFile(dataURL, filename).then((entry) => {
                    console.log('download complete: ' + entry.toURL());
                    this.loading.dismiss();
                    this.socialShare(options);
                }, (error) => {
                    // handle error
                    console.log(error);
                });
            });
    }

    //文件下载
    downloadFile(dataURL: string, filename: string) {
        let fileTransfer: FileTransferObject = this.transfer.create();
        return fileTransfer.download(dataURL, filename)
    }

    //社交分享
    socialShare(options: iOptions) {
        let onSuccess = function (result) {
            console.log("Share completed? " + result.completed); // On Android apps mostly return false even while it's true
            console.log("Shared to app: " + result.app); // On Android result.app is currently empty. On iOS it's empty when sharing is cancelled (result.completed=false)
        };
        let onError = function (msg) {
            console.log("Sharing failed with message: " + msg);
        };
        this.socialSharing.shareWithOptions(options).then(onSuccess, onError);
    }
}
