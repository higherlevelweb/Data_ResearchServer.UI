import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styleUrls: ['./user-data.component.css']
})
export class UserDataComponent implements OnInit {

  public selectedDataOptions: Array<any>;
  public receivedApiData: Array<any>;

  //Chart Data (To Come in through data service)
  public frequencyCountsPlot1: Array<any> = [79, 991, 1012, 114, 1, 32, 510, 1086, 514, 54, 1, 15, 259, 796, 835, 258, 33, 1, 9, 141, 528, 792, 537, 170, 19, 1, 6, 73, 353, 638, 677, 335, 101, 13, 1, 5, 50, 219, 487, 633, 511, 214, 69, 8, 1, 4, 28, 150, 360, 528, 558, 354, 160, 47, 7, 1, 4, 15, 100, 258, 440, 515, 475, 236, 115, 31, 7, 1, 4, 11, 64, 195, 352, 444, 465, 370, 177, 81, 28, 5, 1, 4, 8, 50, 146, 266, 382, 433, 417, 262, 143, 62, 19, 4, 1, 2, 7, 35, 106, 202, 326, 392, 400, 360, 177, 118, 52, 15, 4, 1, 2, 7, 35, 106];
  public frequencyCountsPlot2: Array<any> = [79, 991, 1012, 114, 1, 32, 510, 1086, 514, 54, 1, 15, 259, 796, 835, 258, 33, 1, 9, 141, 528, 792, 537, 170, 19, 1, 6, 73, 353, 638, 677, 335, 101, 13, 1, 5, 50, 219, 487, 633, 511, 214, 69, 8, 1, 4, 28, 150, 360, 528, 558, 354, 160, 47, 7, 1, 4, 15, 100, 258, 440, 515, 475, 236, 115, 31, 7, 1, 4, 11, 64, 195, 352, 444, 465, 370, 177, 81, 28, 5, 1, 4, 8, 50, 146, 266, 382, 433, 417, 262, 143, 62, 19, 4, 1, 2, 7, 35, 106, 202, 326, 392, 400, 360, 177, 118, 52, 15, 4, 1, 2, 7, 35, 106];
  public bodyMeasuresPlot1: Array<any> = [498.5, 551, 603.5, 656, 708.5, 498.5, 540.5, 582.5, 624.5, 666.5, 708.5, 498.5, 533.5, 568.5, 603.5, 638.5, 673.5, 708.5, 498.5, 528.5, 558.5, 588.5, 618.5, 648.5, 678.5, 708.5, 498.5, 524.75, 551, 577.25, 603.5, 629.75, 656, 682.25, 708.5, 498.5, 521.833333333333, 545.166666666667, 568.5, 591.833333333333, 615.166666666667, 638.5, 661.833333333334, 685.166666666667, 708.5, 498.5, 519.5, 540.5, 561.5, 582.5, 603.5, 624.5, 645.5, 666.5, 687.5, 708.5, 498.5, 517.590909090909, 536.681818181818, 555.772727272727, 574.863636363636, 593.954545454546, 613.045454545455, 632.136363636364, 651.227272727273, 670.318181818182, 689.409090909091, 708.5, 498.5, 516, 533.5, 551, 568.5, 586, 603.5, 621, 638.5, 656, 673.5, 691, 708.5, 498.5, 514.653846153846, 530.807692307692, 546.961538461539, 563.115384615385, 579.269230769231, 595.423076923077, 611.576923076923, 627.73076923077, 643.884615384616, 660.038461538462, 676.192307692308, 692.346153846154, 708.5, 498.5, 513.5, 528.5, 543.5, 558.5, 573.5, 588.5, 603.5, 618.5, 633.5, 648.5, 663.5, 678.5, 693.5, 708.5];
  public bodyMeasuresPlot2: Array<any> = [498.5, 551, 603.5, 656, 708.5, 498.5, 540.5, 582.5, 624.5, 666.5, 708.5, 498.5, 533.5, 568.5, 603.5, 638.5, 673.5, 708.5, 498.5, 528.5, 558.5, 588.5, 618.5, 648.5, 678.5, 708.5, 498.5, 524.75, 551, 577.25, 603.5, 629.75, 656, 682.25, 708.5, 498.5, 521.833333333333, 545.166666666667, 568.5, 591.833333333333, 615.166666666667, 638.5, 661.833333333334, 685.166666666667, 708.5, 498.5, 519.5, 540.5, 561.5, 582.5, 603.5, 624.5, 645.5, 666.5, 687.5, 708.5, 498.5, 517.590909090909, 536.681818181818, 555.772727272727, 574.863636363636, 593.954545454546, 613.045454545455, 632.136363636364, 651.227272727273, 670.318181818182, 689.409090909091, 708.5, 498.5, 516, 533.5, 551, 568.5, 586, 603.5, 621, 638.5, 656, 673.5, 691, 708.5, 498.5, 514.653846153846, 530.807692307692, 546.961538461539, 563.115384615385, 579.269230769231, 595.423076923077, 611.576923076923, 627.73076923077, 643.884615384616, 660.038461538462, 676.192307692308, 692.346153846154, 708.5, 498.5, 513.5, 528.5, 543.5, 558.5, 573.5, 588.5, 603.5, 618.5, 633.5, 648.5, 663.5, 678.5, 693.5, 708.5];
  public percentileMeasureValuesPlot1: Array<any> = [537.98, 543.46, 548.44, 552, 554.4, 557, 558.5, 560.5, 562.5, 564.3, 566, 567.5, 569.5, 571, 572.2, 573.18, 574.5, 575.5, 576.62, 577.5, 578.5, 579.56, 580.5, 581.5, 583, 583.5, 584.5, 585, 586.5, 587.5, 588.5, 589.5, 590, 591, 592, 592.5, 593.5, 594.5, 595.5, 596, 597, 597.5, 598.64, 599.5, 600, 601, 602, 603, 603.5, 604.5, 605, 605.5, 607, 607.5, 608.5, 609.5, 610, 611, 612, 612.8, 613.5, 614, 615, 616, 616.5, 617.5, 618.5, 619, 620, 621, 621.5, 622.5, 623.5, 624, 625, 626, 627, 628, 629.5, 630, 631, 632, 633, 634, 635, 636.5, 638.5, 640.5, 643, 644.7, 647.5, 649.5, 651.14, 653.62, 656, 660, 664.5, 668.5, 676.52];
  public percentileMeasureValuesPlot2: Array<any> = [537.98, 543.46, 548.44, 552, 554.4, 557, 558.5, 560.5, 562.5, 564.3, 566, 567.5, 569.5, 571, 572.2, 573.18, 574.5, 575.5, 576.62, 577.5, 578.5, 579.56, 580.5, 581.5, 583, 583.5, 584.5, 585, 586.5, 587.5, 588.5, 589.5, 590, 591, 592, 592.5, 593.5, 594.5, 595.5, 596, 597, 597.5, 598.64, 599.5, 600, 601, 602, 603, 603.5, 604.5, 605, 605.5, 607, 607.5, 608.5, 609.5, 610, 611, 612, 612.8, 613.5, 614, 615, 616, 616.5, 617.5, 618.5, 619, 620, 621, 621.5, 622.5, 623.5, 624, 625, 626, 627, 628, 629.5, 630, 631, 632, 633, 634, 635, 636.5, 638.5, 640.5, 643, 644.7, 647.5, 649.5, 651.14, 653.62, 656, 660, 664.5, 668.5, 676.52];
  public histogramStatisticsPlot1: Array<any>;
  public histogramStatisticsPlot2: Array<any>;

  //Chart Number Bins Selected
  public chartBinsSelected: number;

  //Chart Units Selected
  public chartUnitsSelected: string;

  //Hard Default Settings
  //Chart Data
  public chart_data_y: Array<any>;
  public chart_data_x: Array<any>;
  public frequencyChartYData1 = [];
  public frequencyChartYData2 = [];
  public dataPlotX: number;
  public chartMaxBinOptions = 15;
  public chartMinBinOptions = 5;
  public loadChartView: boolean = false;
  public chartDataLoaded: boolean = false;
  public selected_data_set: Array<any>;
  public selected_body_measure: string;
  public selectedBodyMeasure: string;
  public plotSecondDemographics: boolean;

  //Histogram Summary Statistics
  histogramStatisticsPlot1Min: any;
  histogramStatisticsPlot1Max: any;
  histogramStatisticsPlot1N: any;
  histogramStatisticsPlot1Avg: any;
  histogramStatisticsPlot1StdDev: any;
  histogramStatisticsPlot1Sem: any;
  histogramStatisticsPlot1Skew: any;
  histogramStatisticsPlot1Kurt: any;
  histogramStatisticsPlot1Norm: any;
  histogramStatisticsPlot1CV: any;
  histogramStatisticsPlot2Min: any;
  histogramStatisticsPlot2Max: any;
  histogramStatisticsPlot2N: any;
  histogramStatisticsPlot2Avg: any;
  histogramStatisticsPlot2StdDev: any;
  histogramStatisticsPlot2Sem: any;
  histogramStatisticsPlot2Skew: any;
  histogramStatisticsPlot2Kurt: any;
  histogramStatisticsPlot2Norm: any;
  histogramStatisticsPlot2CV: any;

  getSelectedApiData(selectedApiData) {

    //set selected data options array
    this.selectedDataOptions = selectedApiData[0];
    console.log("Selected Data Options: " + JSON.stringify(this.selectedDataOptions));

    this.selected_data_set = this.selectedDataOptions.filter(selection => selection.item === 'dataset')[0].value;
    this.selected_body_measure = this.selectedDataOptions.filter(selection => selection.item === 'body_measure')[0].value;
    this.selectedBodyMeasure = this.selectedDataOptions.filter(selection => selection.item === 'body_measure')[0].display;
    this.chartBinsSelected = this.selectedDataOptions.filter(selection => selection.item === 'bins')[0].value;
    this.chartUnitsSelected = this.selectedDataOptions.filter(selection => selection.item === 'unit')[0].value;
    this.plotSecondDemographics = this.selectedDataOptions.filter(selection => selection.item === 'plot_second_demographics')[0].value;

    console.log("Selected Data Set: " + this.selected_data_set);
    console.log("Selected Body Measure: " + this.selected_body_measure);
    console.log("Selected Chart Bins #: " + this.chartBinsSelected);
    console.log("Selected Chart Units: " + this.chartUnitsSelected);
    console.log("Plot Second Demographics Option: " + this.plotSecondDemographics);

    //set received api data array
    this.receivedApiData = selectedApiData[1];
    console.log("Received API Data: " + JSON.stringify(this.receivedApiData));

    //Chart Data (To Come in through data service)
    this.frequencyCountsPlot1 = this.receivedApiData.filter(selection => selection.item === 'frequencies1')[0].value;
    this.histogramStatisticsPlot1 = this.receivedApiData.filter(selection => selection.item === 'statistics1')[0].value;
    this.percentileMeasureValuesPlot1 = this.receivedApiData.filter(selection => selection.item === 'percentiles1')[0].value;
    this.bodyMeasuresPlot1 = this.receivedApiData.filter(selection => selection.item === 'measures1')[0].value;

    console.log("API Frequencies: " + this.frequencyCountsPlot1);
    console.log("API Body Measures: " + this.bodyMeasuresPlot1);
    console.log("API Statistics: " + JSON.stringify(this.histogramStatisticsPlot1));

    // Set Statistics Data for Plot 1
    this.setStatisticsDataPlot1();

    if (this.plotSecondDemographics) {
      //Chart Data (To Come in through data service)
      this.frequencyCountsPlot2 = this.receivedApiData.filter(selection => selection.item === 'frequencies2')[0].value;
      this.histogramStatisticsPlot2 = this.receivedApiData.filter(selection => selection.item === 'statistics2')[0].value;
      this.percentileMeasureValuesPlot2 = this.receivedApiData.filter(selection => selection.item === 'percentiles2')[0].value;
      this.bodyMeasuresPlot2 = this.receivedApiData.filter(selection => selection.item === 'measures2')[0].value;

      console.log("API Frequencies (Plot2): " + this.frequencyCountsPlot1);
      console.log("API Body Measures (Plot2): " + this.bodyMeasuresPlot1);
      console.log("API Statistics (Plot2): " + JSON.stringify(this.histogramStatisticsPlot1));

      // Set Statistics Data for Plot 2
      this.setStatisticsDataPlot2();

    }

    // Set all chart data and switch to chart view
    this.generateChartView();

  }

  // Set Statistics Data for Plot 1 and Plot 2
  setStatisticsDataPlot1() {
    this.histogramStatisticsPlot1Min = parseFloat(this.histogramStatisticsPlot1[0].Min).toFixed(2);
    this.histogramStatisticsPlot1Max = parseFloat(this.histogramStatisticsPlot1[0].Max).toFixed(2);
    this.histogramStatisticsPlot1N = this.histogramStatisticsPlot1[0].Count;
    this.histogramStatisticsPlot1Avg = parseFloat(this.histogramStatisticsPlot1[0].Mean).toFixed(2);
    this.histogramStatisticsPlot1StdDev = parseFloat(this.histogramStatisticsPlot1[0].StdDev).toFixed(2);
    this.histogramStatisticsPlot1Sem = parseFloat(this.histogramStatisticsPlot1[0].SE).toFixed(2);
    this.histogramStatisticsPlot1Skew = parseFloat(this.histogramStatisticsPlot1[0].Skew).toFixed(2);
    this.histogramStatisticsPlot1Kurt = parseFloat(this.histogramStatisticsPlot1[0].Kurtosis).toFixed(2);
    this.histogramStatisticsPlot1Norm = parseFloat(this.histogramStatisticsPlot1[0].Normalize).toFixed(2);
    this.histogramStatisticsPlot1CV = parseFloat(this.histogramStatisticsPlot1[0].CV).toFixed(2);
  }

  setStatisticsDataPlot2() {
    this.histogramStatisticsPlot2Min = parseFloat(this.histogramStatisticsPlot2[0].Min).toFixed(2);
    this.histogramStatisticsPlot2Max = parseFloat(this.histogramStatisticsPlot2[0].Max).toFixed(2);
    this.histogramStatisticsPlot2N = this.histogramStatisticsPlot2[0].Count;
    this.histogramStatisticsPlot2Avg = parseFloat(this.histogramStatisticsPlot2[0].Mean).toFixed(2);
    this.histogramStatisticsPlot2StdDev = parseFloat(this.histogramStatisticsPlot2[0].StdDev).toFixed(2);
    this.histogramStatisticsPlot2Sem = parseFloat(this.histogramStatisticsPlot2[0].SE).toFixed(2);
    this.histogramStatisticsPlot2Skew = parseFloat(this.histogramStatisticsPlot2[0].Skew).toFixed(2);
    this.histogramStatisticsPlot2Kurt = parseFloat(this.histogramStatisticsPlot2[0].Kurtosis).toFixed(2);
    this.histogramStatisticsPlot2Norm = parseFloat(this.histogramStatisticsPlot2[0].Normalize).toFixed(2);
    this.histogramStatisticsPlot2CV = parseFloat(this.histogramStatisticsPlot2[0].CV).toFixed(2);
  }

  generateChartView() {

    //this.setStatisticsData();

    //Generate Chart Data
    this.setChartYData();
    this.setChartXData();

    //Load Chart
    this.loadChartView = true;
    //Load Chart
    this.chartDataLoaded = true;

  }

  //Set X Chart Data Labels
  setChartYData() {
    var i, y, j = 0, z = this.chartMinBinOptions;
    for (i = 4; i < this.chartMaxBinOptions + 1; i++) {
      for (y = 0; y < z; y++) {
        if (z == this.chartBinsSelected) {
          this.frequencyChartYData1.push(this.frequencyCountsPlot1[j]);
          this.frequencyChartYData2.push(this.frequencyCountsPlot2[j]);
          //console.log("Data Plot Y: " + y + ": " + this.frequencyChartYData[y]);
        }
        j++;
      }
      z++;
    }
    if (this.plotSecondDemographics) {
      //Set Chart Data Frequencies Array
      this.chart_data_y = [
        { data: this.frequencyChartYData1, label: 'Plot 1' }, ///this.histoPlot1Data
        { data: this.frequencyChartYData2, label: 'Plot 2' } // histoPlot2Data
      ];
    } else {
      //Set Chart Data Frequencies Array
      this.chart_data_y = [
        { data: this.frequencyChartYData1, label: 'Chart Data' }
      ];
    }

  }

  //Set X Chart Data Labels
  setChartXData() {
    //Set Mock Chart Labels Data
    var dataMax = Math.max(...this.bodyMeasuresPlot1);
    var dataMin = Math.min(...this.bodyMeasuresPlot1);

    //If Imperial Units are seclected convert measurements from metric
    if (this.chartUnitsSelected == "Imperial") {
      if (this.selected_body_measure == "BMI" || this.selected_body_measure == "Age") {
        //Unit conversion not appplicable to BMI or Age
      } else if (this.selected_body_measure == "Weight") {
        //Imperial Convert Weight from Kilograms to Pounds
        dataMax = Math.round((parseFloat(((dataMax) * 2.20462).toFixed(2))) * 100) / 100;
        dataMin = Math.round((parseFloat(((dataMin) * 2.20462).toFixed(2))) * 100) / 100;
      } else {
        //Imperial Convert Units from Millimeters to Inches
        console.log("Convert Metric to Imperial by: " + this.selected_body_measure);
        dataMax = Math.round((parseFloat(((dataMax) / 25.4).toFixed(2))) * 100) / 100;
        dataMin = Math.round((parseFloat(((dataMin) / 25.4).toFixed(2))) * 100) / 100;
      }
    }

    var chartBins = this.chartBinsSelected;

    //Detmine Data Span X and Data Inervals X
    var dataSpanX = dataMax - dataMin;
    var dataIntervalsX = Math.round((dataSpanX / chartBins) * 100) / 100;

    //Set Data for Chart Labels Array
    //Push the first label into the array
    this.chart_data_x = [(Math.round((dataMin) * 100) / 100) + " to " + Math.floor(dataMin + Math.round(dataIntervalsX) - 1)];
    this.dataPlotX = Math.round((dataMin + dataIntervalsX) * 100) / 100;
    //loop according to number of bins to push labels into array
    var i;
    for (i = 0; i < chartBins - 2; i++) {
      let chartXLabel = Math.floor(this.dataPlotX) + " to " + Math.floor(this.dataPlotX + Math.round(dataIntervalsX) - 1);
      this.chart_data_x.push(chartXLabel);
      this.dataPlotX = Math.round((this.dataPlotX + dataIntervalsX) * 100) / 100;
    }
    //Push the last label into the array
    this.chart_data_x.push((Math.floor(dataMax) - 1 - Math.round(dataIntervalsX)) + " to " + (Math.round((dataMax) * 100) / 100));
  }

  constructor() { }

  ngOnInit() {
  }

}
