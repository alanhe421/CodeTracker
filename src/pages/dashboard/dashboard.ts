import {Component, ElementRef, ViewChild} from "@angular/core";
import {Loading, LoadingController} from "ionic-angular";
import {SocialSharing} from "@ionic-native/social-sharing";
import {iOptions} from "./iOptions";
import {File} from "@ionic-native/file";
import {FileTransfer, FileTransferObject} from "@ionic-native/file-transfer";
import * as html2canvas from "html2canvas";
import {ApiService} from "../../providers/api.service";
import * as moment from "moment";
import * as echarts from "echarts";

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

    loading: Loading;
    fileDir: string;
    fileName: string;
    range: string;
    data: any;
    grandTotal: any;
    @ViewChild('languagesUsed') languagesUsed: ElementRef;//使用语言
    @ViewChild('editorsUsed') editorsUsed: ElementRef;//编辑器
    @ViewChild('systemsUsed') systemsUsed: ElementRef;//操作系统


    constructor(private apiService: ApiService,
                public loadingCtrl: LoadingController,
                private socialSharing: SocialSharing,
                private transfer: FileTransfer,
                private file: File) {
        this.range = 'last_7_days';
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            showBackdrop: true,
            content: '图片生成中'
        });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad StatsPage');
        this.loading.present();
        console.log(this.fileDir);
        this.apiService.getStats(this.range).subscribe(res => {
                console.log(res);
                this.data = res.data;
                this.initLanguageUsed(res.data.languages);
                this.initEditors(res.data.editors);
                this.initSystemsUsed(res.data.operating_systems);
                this.loading.dismiss();
            },
            error => {
                this.loading.dismiss();
            }
        );
        let now = moment().format('YYYY-MM-DD');

        this.apiService.getSummaries(now, now).subscribe(res => {
                res = res.data[0];
                this.grandTotal = res['grand_total'];
                console.log(res['grand_total']);
            }
        );
    }

    /**
     *
     * @param languages
     */
    initLanguageUsed(languages: Array<any>): void {
        let container = this.languagesUsed.nativeElement;
        let myChart = echarts.init(container);
        let option = {
            title: {
                text: 'Languages',
                left: 'center',
                top: 'center'
            },
            legend: {
                show: true,
                // orient: 'horizontal',
                // left: 'left',
                bottom: 0,
                data: []
            },
            series: [
                {
                    name: '访问来源',
                    type: 'pie',
                    radius: ['50%', '90%'],
                    data: [],
                    label: {
                        normal: {
                            position: 'inside'
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        for (let item of languages) {
            option.series[0].data.push({value: item['total_seconds'], name: item['name']});
            option.legend.data.push(item['name']);
        }


        myChart.setOption(option);
    }

    /**
     *
     */
    initEditors(editors: Array<any>): void {
        let container = this.editorsUsed.nativeElement;
        let myChart = echarts.init(container);
        let option = {
            title: {
                text: 'Editors',
                left: 'center',
                top: 'center',
            },
            legend: {
                show: true,
                bottom: 0,
                data: []
            },
            series: [
                {
                    name: '编辑器',
                    type: 'pie',
                    radius: ['50%', '90%'],
                    data: [],
                    label: {
                        normal: {
                            position: 'inside'
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        for (let item of editors) {
            option.series[0].data.push({value: item['total_seconds'], name: item['name']});
            option.legend.data.push(item['name']);
        }


        myChart.setOption(option);
    }


    /**
     *
     * @param systems
     */
    initSystemsUsed(systems: Array<any>): void {
        let container = this.systemsUsed.nativeElement;
        let myChart = echarts.init(container);
        let option = {
            title: {
                text: 'System',
                left: 'center',
                top: 'center',
            },
            legend: {
                show: true,
                bottom: 0,
                data: []
            },
            series: [
                {
                    name: '系统',
                    type: 'pie',
                    radius: ['50%', '90%'],
                    data: [],
                    label: {
                        normal: {
                            position: 'inside'
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        for (let item of systems) {
            option.series[0].data.push({value: item['total_seconds'], name: item['name']});
            option.legend.data.push(item['name']);
        }

        myChart.setOption(option);
    }

    //刷新
    doRefresh(refresher) {
        let now = moment().format('YYYY-MM-DD');
        this.apiService.getSummaries(now, now).subscribe(res => {
            res = res.data[0];
            this.grandTotal = res['grand_total'];
            console.log(res['grand_total']);
            refresher.complete();
        });
    }

    /**
     * 社交分享
     */
    shareClicked() {
        let filename = this.file.dataDirectory + 'myscreenshot.png';
        let options: iOptions = {
            message: 'CodeTracker',
            subject: 'CodeTracker',
            files: [filename],
            chooserTitle: 'CodeTracker'
        };
        // if ('iOS' == this.authService.platform) {
        //     console.log('iOS下载开始');
        this.loading.present();
        html2canvas(document.body, {useCORS: true}, {
            onrendered: (canvas) => {
                let dataURL = canvas.toDataURL();
                // canvas is the final rendered <canvas> element
                this.downloadFile(dataURL, filename).then((entry) => {
                    console.log('download complete: ' + entry.toURL());
                    this.loading.dismiss();
                    this.socialShare(options);
                }, (error) => {
                    // handle error
                    console.log(error);
                });
            }
        });
        // }
        // else {//Android
        //     domtoimage.toPng(document.getElementById('content-statistics'))
        //         .then(function (dataURL) {
        //             // location.href = dataURL;
        //             this.downloadFile(dataURL, filename).then((entry) => {
        //                 console.log('download complete: ' + entry.toURL());
        //                 this.loading.dismiss();
        //                 this.socialShare(options);
        //             }, (error) => {
        //                 // handle error
        //                 console.log(error);
        //             });
        //         });
        // }
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
