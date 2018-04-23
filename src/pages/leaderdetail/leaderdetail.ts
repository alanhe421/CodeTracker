import {Component, ElementRef, ViewChild} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import * as echarts from "echarts";

/**
 * Generated class for the Leaderdetail page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
    selector: 'page-leaderdetail',
    templateUrl: 'leaderdetail.html',
})
export class LeaderdetailPage {

    leader: any;
    @ViewChild('languagesUsed') languagesUsed: ElementRef;//使用语言

    constructor(public navCtrl: NavController, public navParams: NavParams) {
        this.leader = this.navParams.get('leader');
    }

    ionViewDidLoad() {
        console.log('ionViewDidLoad Leaderdetail');
        this.initLanguageUsed(this.leader.running_total.languages);
    }

    initLanguageUsed(languages: Array<any>): void {
        let container = this.languagesUsed.nativeElement;
        let myChart = echarts.init(container);
        let option = {
            title: {
                text: 'Languages',
                x: 'center'
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                show: false,
                orient: 'vertical',
                left: 'left',
                data: []
            },
            series: [
                {
                    name: 'Languages',
                    type: 'pie',
                    radius: ['50%', '70%'],
                    data: [],
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
}
