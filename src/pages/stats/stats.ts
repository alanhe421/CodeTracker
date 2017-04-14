import {Component, ViewChild, ElementRef} from "@angular/core";
import {NavParams, LoadingController, Loading} from "ionic-angular";
import {ApiService} from "../../providers/api.service";
import * as echarts from "echarts";
import * as moment from "moment";
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
    loading: Loading;
    data: any;
    grandTotal: any;

    constructor(public navParams: NavParams,
                private apiService: ApiService, public loadingCtrl: LoadingController) {
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
            this.loading.dismiss();
        });
        let now = moment().format('YYYY-MM-DD');

        this.apiService.getSummaries(now, now).subscribe(res => {
            res = res.data[0];
            this.grandTotal = res['grand_total'];
            console.log(res['grand_total']);
        });
    }


    initLanguageUsed(languages: Array<any>): void {
        let container = this.languagesUsed.nativeElement;
        let myChart = echarts.init(container);
        let option = {
            title: {
                text: 'Languages',
                x: 'center'
            },
            legend: {
                show: false,
                orient: 'vertical',
                left: 'left',
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


    initEditors(): void {

    }

    doRefresh(refresher) {
        console.log('Begin async operation', refresher);

        setTimeout(() => {
            console.log('Async operation has ended');
            refresher.complete();
        }, 2000);
    }

}
