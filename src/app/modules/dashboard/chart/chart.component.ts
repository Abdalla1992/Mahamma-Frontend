import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ChartType, TimeUnit } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { ChartTypeEnum } from 'src/app/@AppService/Enums/chart-typs-enum';

@Component({
  selector: 'dashboard-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnChanges {

  @Input() Type: ChartTypeEnum;
  @Input() DataList :  any[];
  @Input() title :  string;
  
  public barChartOptions:any = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      // yAxes: [
      //   {
      //     grid:{
      //       display:false
      //     }
      //   }
      // ],
      // xAxes: [
      //   {
      //     display: false
      //   }
      // ],
      // xAxes: [{
      //   gridLines: {
      //     color: "rgba(0, 0, 0, 0)",
      //   }
      // }],
      // yAxes: [{
      //   gridLines: {
      //     color: "rgba(0, 0, 0, 0)",
      //   }
      // }],
      y: {
        display:false
      },
      x: {
        display:false
      }
    }
  };
  public barChartLabels:string[] = [];
  public barChartData:any[] = [];
  public barChartLegend:boolean = false;
  colors : Color[] = [];

  constructor() {
  }
  
  ngOnChanges(): void {
    this.SetStatistics();
  }

  SetStatistics() {
    let dataValues:number[] = [];
    this.barChartLabels = [];
    this.barChartData = [];
    let chartsColors : string[] = [];
    if(this.DataList){
      for (let result of this.DataList) {
          this.barChartLabels.push(result.item1);
          dataValues.push(result.item2);
          chartsColors.push(result.item3);
      }
      this.barChartData.push({data: dataValues})
      this.colors = [
        {
          backgroundColor: chartsColors,
        },
      ];
    }
  }
}
