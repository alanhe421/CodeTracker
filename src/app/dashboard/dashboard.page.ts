import {Component, ElementRef, OnInit, ViewChild} from "@angular/core";
import * as moment from "moment";
import * as echarts from 'echarts';
import {ApiService} from "../services/api.service";

@Component({
    selector: 'page-dashboard',
    templateUrl: 'dashboard.page.html'
})
export class DashboardPage implements OnInit {

    fileDir: string;
    range: string;
    data: any;
    grandTotal: any;
    @ViewChild('languagesUsed') languagesUsed: ElementRef;
    @ViewChild('editorsUsed') editorsUsed: ElementRef;
    @ViewChild('systemsUsed') systemsUsed: ElementRef;

    constructor(private apiService: ApiService) {
        this.range = 'last_7_days';

    }

    ngOnInit() {
        console.log('ionViewDidLoad StatsPage');
        console.log(this.fileDir);
        this.apiService.getStats(this.range).subscribe((res: any) => {
                console.log(res);
                this.data = res.data;
                this.initLanguageUsed(res.data.languages);
                this.initEditors(res.data.editors);
                this.initSystemsUsed(res.data.operating_systems);
            },
            error => {
            }
        );
        let now = moment().format('YYYY-MM-DD');

        this.apiService.getSummaries(now, now).subscribe((res: any) => {
                res = res.data[0];
                this.grandTotal = res['grand_total'];
                console.log(res['grand_total']);
            }
        );
    }

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

    doRefresh(refresher) {
        let now = moment().format('YYYY-MM-DD');
        this.apiService.getSummaries(now, now).subscribe((res: any) => {
            res = res.data[0];
            this.grandTotal = res['grand_total'];
            console.log(res['grand_total']);
            refresher.complete();
        });
    }
}
