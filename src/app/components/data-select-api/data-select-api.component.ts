import { Injectable } from '@angular/core';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FilterVariables } from '../../core/models/filter-variables';
import { DemographicdataService } from '../../_app-services/demographicdata.service';
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { interval } from 'rxjs/observable/interval';
import { delay } from 'rxjs/operators';

@Component({
  selector: 'app-data-select-api',
  templateUrl: './data-select-api.component.html',
  styleUrls: ['./data-select-api.component.css']
})
@Injectable()
export class DataSelectApiComponent {

  @Output() sendSelectedApiData = new EventEmitter();
  //@Output() sendSelectedDataSet = new EventEmitter();

  //selectedDataSet coming from 1D histogram component
  public selectedDataSet: Array<any>;

  //Chart Data (To Come in through data service)
  public frequencyAllChartYDataCountPlot1: Array<any>;
  public frequencyAllChartYDataCountPlot2: Array<any>;
  public frequencyAllChartYDataPercentPlot1: Array<any>;
  public frequencyAllChartYDataPercentPlot2: Array<any>;
  public histogramStatisticsPlot1: Array<any>;
  public histogramStatisticsPlot2: Array<any>;
  public percentileMeasureValuesPlot1: Array<any>;
  public percentileMeasureValuesPlot2: Array<any>;

  public summaryMeasureValuesPlot1: Array<any>;
  public summaryMeasureValuesPlot2: Array<any>;

  public filterVariables1: FilterVariables;
  public filterVariables2: FilterVariables;
  public dataFromAPIPlot: any;
  public dataFromAPIPlot1: any;
  public dataFromAPIPlot2: any;
  public apiReceivedDataSet: Array<any>;
  public masterSelectApiDataSet: Array<any>;
  public plot_second_demographics = false;

  constructor(
    private demographicSurveyService: DemographicdataService,
    private activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer
  ) {
    // this.activatedRoute.queryParams.subscribe(params => {
    //  this.modelId = params['modelID'];
    //  this.httpURL = this.httpURL+ this.modelId;
    //  console.error(this.modelId); // Print the parameter to the console.
    // });
  }

  //trigger on submit from selection component
  submit_select_data(selectedDataSet) {
    if (selectedDataSet) {

      //set selected data set array received from selection component
      this.selectedDataSet = selectedDataSet;
      //get plot second demographics option
      this.plot_second_demographics = selectedDataSet.filter(selection => selection.item === 'plot_second_demographics')[0].value;
      //get filter selected data to send to api
      this.setAPIDataFilter(selectedDataSet);
      //get summarized plot 1 values from api
      this.summarizeApiData();

    }
  }

  sendSelectApiData() {

    //build array of api received data
    this.apiReceivedDataSet = [
      { item: 'measures1', value: this.summaryMeasureValuesPlot1, plot: '1' },
      { item: 'frequencies1', value: this.frequencyAllChartYDataCountPlot1, plot: '1' },
      { item: 'percentages1', value: this.frequencyAllChartYDataPercentPlot1, plot: '1' },
      { item: 'percentiles1', value: this.percentileMeasureValuesPlot1, plot: '1' },
      { item: 'statistics1', value: this.histogramStatisticsPlot1, plot: '1' }
    ];

    if (this.plot_second_demographics) {
      this.apiReceivedDataSet.push({ item: 'measures2', value: this.summaryMeasureValuesPlot2, plot: '2' });
      this.apiReceivedDataSet.push({ item: 'frequencies2', value: this.frequencyAllChartYDataCountPlot2, plot: '2' });
      this.apiReceivedDataSet.push({ item: 'percentages2', value: this.frequencyAllChartYDataPercentPlot2, plot: '2' });
      this.apiReceivedDataSet.push({ item: 'percentiles2', value: this.percentileMeasureValuesPlot2, plot: '2' });
      this.apiReceivedDataSet.push({ item: 'statistics2', value: this.histogramStatisticsPlot2, plot: '2' });
    }

    //contruct master object of selected data and api received data to send to parent component
    this.masterSelectApiDataSet = [this.selectedDataSet, this.apiReceivedDataSet]
    //emit master select api data object to parent component
    this.sendSelectedApiData.emit(this.masterSelectApiDataSet);

  }

  public setAPIDataFilter(selectedDataSet) {

    if (selectedDataSet.filter(selection => selection.item === 'plot_second_demographics')[0].value !== undefined) {
      this.plot_second_demographics = selectedDataSet.filter(selection => selection.item === 'plot_second_demographics')[0].value;
    }
    // rebuilding the global json before calling the service and API
    // console.log( 'agegroup :' + JSON.stringify(selectedDataSet.filter(selection => selection.item === 'agegroups')[0].value));
    const agegroupids = [];
    for (let i = 0; i < JSON.parse(JSON.stringify(selectedDataSet.filter(selection => selection.item === 'agegroups')[0].value)).length; i++) {
      agegroupids.push(JSON.parse(JSON.stringify(selectedDataSet.filter(selection => selection.item === 'agegroups')[0].value))[i].value);
    }

    const serviceids = [];
    for (let i = 0; i < JSON.parse(JSON.stringify(selectedDataSet.filter(selection => selection.item === 'services')[0].value)).length; i++) {
      serviceids.push(JSON.parse(JSON.stringify(selectedDataSet.filter(selection => selection.item === 'services')[0].value))[i].value);
    }

    const tradeids = [];
    if (selectedDataSet.filter(selection => selection.item === 'trades_branches')[0].value !== undefined) {
      for (let i = 0; i < JSON.parse(JSON.stringify(selectedDataSet.filter(selection => selection.item === 'trades_branches')[0].value)).length; i++) {
        tradeids.push(JSON.parse(JSON.stringify(selectedDataSet.filter(selection => selection.item === 'trades_branches')[0].value))[i].value);
      }
    }
    const componentids = [];
    if (selectedDataSet.filter(selection => selection.item === 'components')[0].value !== undefined) {
      for (let i = 0; i < JSON.parse(JSON.stringify(selectedDataSet.filter(selection => selection.item === 'components')[0].value)).length; i++) {
        componentids.push(JSON.parse(JSON.stringify(selectedDataSet.filter(selection => selection.item === 'components')[0].value))[i].value);
      }
    }

    this.filterVariables1 = {
      gender: selectedDataSet.filter(selection => selection.item === 'sex')[0].value,
      datavariable: selectedDataSet.filter(selection => selection.item === 'body_measure')[0].value,
      isActive: false,
      SelectedVariables: selectedDataSet.filter(selection => selection.item === 'body_measure')[0].value,
      SexID: selectedDataSet.filter(selection => selection.item === 'sex')[0].value,
      AgeGroupID: agegroupids.toString(),
      ComponentID: componentids.toString(),
      ServiceID: serviceids.toString(),
      MOSID: '', // '10,182,183,168'
      TradeID: tradeids.toString(),
      PreferredHandwritingID: selectedDataSet.filter(selection => selection.item === 'preferred_hand')[0].value,
      PreferredHandsightingWeaponID: '0',
      VisionCorrected: selectedDataSet.filter(selection => selection.item === 'vision_corrected')[0].value,
      LanguageID: selectedDataSet.filter(selection => selection.item === 'language')[0].value,
      PCAManikinOption: '',
      ManikinDefinition: '',
      AccomodationPercentage: selectedDataSet.filter(selection => selection.item === 'accomodation')[0].value,
      SurveyDatabase: selectedDataSet.filter(selection => selection.item === 'dataset')[0].value,
    };

    if (this.plot_second_demographics) {
      this.filterVariables2 = {
        gender: selectedDataSet.filter(selection => selection.item === 'sex_2')[0].value,
        datavariable: selectedDataSet.filter(selection => selection.item === 'body_measure')[0].value,
        isActive: false,
        SelectedVariables: selectedDataSet.filter(selection => selection.item === 'body_measure')[0].value,
        SexID: selectedDataSet.filter(selection => selection.item === 'sex_2')[0].value,
        AgeGroupID: agegroupids.toString(),
        ComponentID: componentids.toString(),
        ServiceID: serviceids.toString(),
        MOSID: '', // '10,182,183,168'
        TradeID: tradeids.toString(),
        PreferredHandwritingID: selectedDataSet.filter(selection => selection.item === 'preferred_hand_2')[0].value,
        PreferredHandsightingWeaponID: '0',
        VisionCorrected: selectedDataSet.filter(selection => selection.item === 'vision_corrected_2')[0].value,
        LanguageID: selectedDataSet.filter(selection => selection.item === 'language_2')[0].value,
        PCAManikinOption: '',
        ManikinDefinition: '',
        AccomodationPercentage: selectedDataSet.filter(selection => selection.item === 'accomodation')[0].value,
        SurveyDatabase: selectedDataSet.filter(selection => selection.item === 'dataset')[0].value,
      };
    } else {
      this.filterVariables2 = this.filterVariables1;
    }
  }

  private summarizeApiData() {

    console.log('*******  Start Call to Web API Plot 1. Waiting for API data... *******');

    this.demographicSurveyService
      .GetFilteredHistogramParam(
        '{"filter" :[' + JSON.stringify(this.filterVariables1) + ']}'
      )
      .subscribe(data => {
        this.dataFromAPIPlot1 = JSON.parse(JSON.stringify(data));

        if (this.dataFromAPIPlot1) {
          console.log("*** API Data Received (Plot 1): " + data + ' ***');
        }

        if (this.dataFromAPIPlot1 != null || this.dataFromAPIPlot1 !== undefined) {
          console.log(this.dataFromAPIPlot1);

          // Get Summary Values Plot 1 from API Data
          this.summaryMeasureValuesPlot1 = this.dataFromAPIPlot1.Histogram['HistoGram_X_Data'];
          // Get Frequencies Plot 1 from API Data
          this.frequencyAllChartYDataCountPlot1 = this.dataFromAPIPlot1.Histogram['HistoGram_Y_FrequencyCount'];
          // Percentiles Plot 1 from API Data
          this.percentileMeasureValuesPlot1 = this.dataFromAPIPlot1.Histogram['PercentileData'];
          //Get Statistics Plot 1 from API Data
          this.histogramStatisticsPlot1 = this.dataFromAPIPlot1.Histogram['HistogramStatistics'];
          //Get Percentages Plot 1 from API Data
          this.frequencyAllChartYDataPercentPlot1 = this.dataFromAPIPlot1.Histogram['HistoGram_Y_FrequencyPercentage'];
          //Get Bins Plot 1 from API Data
          //this.histogramBinPlot1 = this.dataFromAPIPlot1.Histogram['HistoGramBin'];

          if (this.plot_second_demographics) {
            //summarize data for plot 2
            this.summarize1DPlot2();
          } else {
            //send Select/Api data
            this.sendSelectApiData();
          }

        } else {
          // ERROR
          // If Lists of Lists Master Dataset fails to contain any data alert and following
          alert("List of Lists Dataset (Master Dataset - Plot 1) Failed to Load!");
        }
      });
  }

  private summarize1DPlot2() {

    console.log('*******  Start Call to Web API Plot 2. Waiting for API data... *******');

    this.demographicSurveyService
      .GetFilteredHistogramParam(
        '{"filter" :[' + JSON.stringify(this.filterVariables2) + ']}'
      )
      .subscribe(data => {
        this.dataFromAPIPlot2 = JSON.parse(JSON.stringify(data));

        if (this.dataFromAPIPlot2) {
          console.log("*** API Data Received (Plot 2): " + data + ' ***');
        }

        if (this.dataFromAPIPlot2 != null || this.dataFromAPIPlot2 !== undefined) {
          console.log(this.dataFromAPIPlot2);

          // Get Summary Values Plot 2 from API Data
          this.summaryMeasureValuesPlot2 = this.dataFromAPIPlot2.Histogram['HistoGram_X_Data'];
          // Get Frequencies Plot 2 from API Data
          this.frequencyAllChartYDataCountPlot2 = this.dataFromAPIPlot2.Histogram['HistoGram_Y_FrequencyCount'];
          // Percentiles Plot 2 from API Data
          this.percentileMeasureValuesPlot2 = this.dataFromAPIPlot2.Histogram['PercentileData'];
          //Get Statistics Plot 2 from API Data
          this.histogramStatisticsPlot2 = this.dataFromAPIPlot2.Histogram['HistogramStatistics'];
          //Get Percentages Plot 2 from API Data
          this.frequencyAllChartYDataPercentPlot2 = this.dataFromAPIPlot2.Histogram['HistoGram_Y_FrequencyPercentage'];
          //Get Bins Plot 2 from API Data
          //this.histogramBinPlot1 = this.dataFromAPIPlot1.Histogram['HistoGramBin'];

          //send Select/Api data
          this.sendSelectApiData();

        } else {
          // ERROR
          // If Lists of Lists Master Dataset fails to contain any data alert and following
          alert("List of Lists Dataset (Master Dataset - Plot 2) Failed to Load!");
        }
      });
  }

}
