import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ChartType } from '../../classes/chart-types';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

  //Default Chart Type
  public chartType: string = 'line';

  //Chart Type Select Options
  public chartTypes = [
    new ChartType('line', 'Line'),
    new ChartType('bar', 'Bar')
  ];

  public binsDisplay: string;
  public unitDisplay: string;
  public bodyMeasureDisplay: string;
  public chartUnitsSelectedDisplay: string = "mm";

  public chartOptions: any = {
    scales: {
      xAxes: [{
        ticks: {
          autoSkip: false,
          maxRotation: 45,
          minRotation: 45
        }
      }]
    }
  };

  //Receive Chart Data
  @Input() chartData: any[];
  @Input() chartLabels: any[];
  @Input() selectedDataSet: any[];

  //Function to Change Chart Type on Option Click Event (Emitted from Child)
  chartTypeSelected($option) {
    this.chartType = $option;
  }

  ngOnInit() {
    //console.log("Selected Data: " + JSON.stringify(this.selectedDataSet));
    this.binsDisplay = this.selectedDataSet.filter(selection => selection.item === 'bins')[0].display;
    this.unitDisplay = this.selectedDataSet.filter(selection => selection.item === 'unit')[0].display;
    this.bodyMeasureDisplay = this.selectedDataSet.filter(selection => selection.item === 'body_measure')[0].display;

    //If Imperial Units are seclected convert measurements from metric
    if (this.bodyMeasureDisplay == "BMI" || this.bodyMeasureDisplay == "Age") {
      this.unitDisplay = "";
      //Set Unit Display
      if (this.bodyMeasureDisplay == "BMI") {
        this.chartUnitsSelectedDisplay = "Kg/m2";
      } else if (this.bodyMeasureDisplay == "Age") {
        this.chartUnitsSelectedDisplay = "Years";
      }
    } else if (this.bodyMeasureDisplay == "Weight") {
      //Set Unit chart display to kg
      if (this.unitDisplay == "Imperial") {
        this.chartUnitsSelectedDisplay = "Kg";
      } else {
        this.chartUnitsSelectedDisplay = "Pounds";
      }
    } else {
      //Set unit chart display to inches
      if (this.unitDisplay == "Imperial") {
        this.chartUnitsSelectedDisplay = "Inches";
      } else {
        this.chartUnitsSelectedDisplay = "mm";
      }
    }

  }

}
