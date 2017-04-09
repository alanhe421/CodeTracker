import {Component, ViewChild, ElementRef} from "@angular/core";
import {NavParams, LoadingController, Loading} from "ionic-angular";
import {ApiService} from "../../providers/api.service";
import * as echarts from "echarts";
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


}
