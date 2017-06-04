import {Component, ElementRef, ViewChild} from "@angular/core";
import {Loading, LoadingController, NavParams} from "ionic-angular";
import {ApiService} from "../../providers/api.service";
import * as echarts from "echarts";
import * as moment from "moment";
import {ErrorService} from "../../providers/error.service";
declare const Wechat: any;
/*
 Generated class for the Stats page.

 See http://ionicframework.com/docs/v2/components/#navigation for more info on
 Ionic pages and navigation.
 */
@Component({
    selector: 'page-stats',
    templateUrl: 'stats.html'
})
export class StatsPage {

    range: string;
    @ViewChild('languagesUsed') languagesUsed: ElementRef;//使用语言
    @ViewChild('editorsUsed') editorsUsed: ElementRef;//编辑器
    @ViewChild('systemsUsed') systemsUsed: ElementRef;//操作系统

    loading: Loading;
    data: any;
    grandTotal: any;

    constructor(public navParams: NavParams,
                private apiService: ApiService, public loadingCtrl: LoadingController, private errorService: ErrorService) {
        this.range = this.navParams.get('range');
        this.loading = this.loadingCtrl.create({
            spinner: 'bubbles',
            showBackdrop: true
            // content: 'Please wait...'
        });

    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad StatsPage');
        this.loading.present();
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


}
