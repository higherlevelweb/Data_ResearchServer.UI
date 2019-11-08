import { Injectable } from '@angular/core';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FilterVariables, FilterExtendedVariables } from '../../core/models/filter-variables';
import { DemographicdataService } from '../../_app-services/demographicdata.service';
import { ActivatedRoute } from "@angular/router";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { ApidataService } from '../../_app-services/apidata.service';

import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { interval } from 'rxjs/observable/interval';
import { delay } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';

@Component({
  selector: 'app-multi-d-data-select-api',
  templateUrl: './multi-d-data-select-api.component.html',
  styleUrls: ['./multi-d-data-select-api.component.css']
})

@Injectable()

export class MultiDDataSelectApiComponent implements OnInit {
  message:string;
  @Input() isPCAFromParent: string;
  @Input() numberOfDimensionFromParent: string;
  @Input() selectedDataOptions: Array<any>;
  @Output() sendSelectedApiData = new EventEmitter();

  // selectedDataSet coming from 1D histogram component
  public selectedDataSet: Array<any>;

  public summaryMeasureValuesPlot1: Array<any>;
  public summaryMeasureValuesPlot2: Array<any>;

  public filterVariables1: FilterVariables;
  public filterVariables2: FilterExtendedVariables;
  public realDataPlot1: any;
  public realDataPlot2: any;
  public dataFromAPIPlot: any;
  public dataFromAPIPlot1: any;
  public dataFromAPIPlot2: any;
  public apiReceivedDataSet: Array<any>;
  public masterSelectApiDataSet: Array<any>;
  public plot_second_demographics = false;
  public multivariate_is_pca = false;
  public statisticsPlot1_1: Array<any>;
  public statisticsPlot1_2: Array<any>;
  public statisticsPlot2_1: Array<any>;
  public statisticsPlot2_2: Array<any>;
  public statisticsPlot1_3: Array<any>;

  public pcaDataCharacteristicsAndCumulativeVariances: Array<any>;
  public pcaTotalVariance: Array<any>;
  public pcaCovarianceMatrix: Array<any>;
  public pcaKMOBarSphericityVariables: Array<any>;
  public pcaFactorLoadingVariables: Array<any>;
  public pcaFactorScoreCoefficientsVariables: Array<any>;
  public pcaNearestNeigborCases: Array<any>;
  public pcaStructuralDimensions: Array<any>;
  public pcaNumberOfPCsCalculated: Array<any>;
  public pcaCumulativeTotalVariances: Array<any>;

  public numberOfMeasurements: number;
  public isPCACalculationCompleted = false;

  constructor(
    private demographicSurveyService: DemographicdataService,
    private activatedRoute: ActivatedRoute,
    public sanitizer: DomSanitizer, private data: ApidataService
  ) {
    // this.activatedRoute.queryParams.subscribe(params => {
    //  this.modelId = params['modelID'];
    //  this.httpURL = this.httpURL+ this.modelId;
    // });
  }

  // trigger on submit from selection component
  submit_select_data(selectedDataSet) {
    if (selectedDataSet) {

      // set selected data set array received from selection component
      this.selectedDataSet = selectedDataSet;
      // get plot second demographics option
      this.plot_second_demographics = selectedDataSet.filter(selection => selection.item === 'plot_second_demographics')[0].value;
      // get filter selected data to send to api
      this.setAPIDataFilter(selectedDataSet);
      // get summarized plot 1 values from api
      this.summarizeApiData();

    }
  }

  sendSelectApiData() {

    // build array of api received data
    this.apiReceivedDataSet = [
      { item: 'measures1', value: this.summaryMeasureValuesPlot1, plot: '1' },
      { item: 'measures1', value: this.summaryMeasureValuesPlot1, plot: '1' },
      { item: 'data1', value: this.realDataPlot1, plot: '1' },
      { item: 'statisticsPlot1_1', value: this.statisticsPlot1_1, plot: '1' },
      { item: 'statisticsPlot1_2', value: this.statisticsPlot1_2, plot: '1' },
      { item: 'statisticsPlot1_3', value: this.statisticsPlot1_3, plot: '1' },
      { item: 'pcaDataCharacteristicsAndCumulativeVariances', value: this.pcaDataCharacteristicsAndCumulativeVariances, plot: '1' },
      { item: 'pcaCovarianceMatrix', value: this.pcaCovarianceMatrix, plot: '1' },
      { item: 'pcaTotalVariance', value: this.pcaTotalVariance, plot: '1' },
      { item: 'pcaNumberOfPCsCalculated', value: this.pcaNumberOfPCsCalculated, plot: '1' },
      { item: 'pcaCumulativeTotalVariances', value: this.pcaCumulativeTotalVariances, plot: '1' },
      { item: 'pcaKMOBarSphericityVariables', value: this.pcaKMOBarSphericityVariables, plot: '1' },
      { item: 'pcaFactorLoadingVariables', value: this.pcaFactorLoadingVariables, plot: '1' },
      { item: 'pcaFactorScoreCoefficientsVariables', value: this.pcaFactorScoreCoefficientsVariables, plot: '1' },
      { item: 'pcaNearestNeigborCases', value: this.pcaNearestNeigborCases, plot: '1' },
      { item: 'pcaStructuralDimensions', value: this.pcaStructuralDimensions, plot: '1' },
      { item: 'filterVariables1', value: this.filterVariables1, plot: '1' },
      { item: 'filterVariables2', value: this.filterVariables2, plot: '1' },
      { item: 'numberOfDimensionFromParent', value: this.numberOfDimensionFromParent, plot: '1' }
    ];
    
    if (this.plot_second_demographics) {
      this.apiReceivedDataSet.push({ item: 'measures2', value: this.summaryMeasureValuesPlot2, plot: '2' },
        { item: 'data2', value: this.realDataPlot2, plot: '1' },
        { item: 'statisticsPlot2_1', value: this.statisticsPlot2_1, plot: '2' },
        { item: 'statisticsPlot2_2', value: this.statisticsPlot2_2, plot: '2' }
      );
    }

    // contruct master object of selected data and api received data to send to parent component
    this.masterSelectApiDataSet = [this.selectedDataSet, this.apiReceivedDataSet];
    // emit master select api data object to parent component
    this.sendSelectedApiData.emit(this.masterSelectApiDataSet);

  }

  public setAPIDataFilter(selectedDataSet) {

    // const body_measures_multiids = [];

    if (selectedDataSet.filter(selection => selection.item === 'plot_second_demographics')[0].value !== undefined) {
      this.plot_second_demographics = selectedDataSet.filter(selection => selection.item === 'plot_second_demographics')[0].value;
    }
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
    const datavariableids = [];

    const body_measures_multiids = [];


    const manikindefinitions = [];
    for (let i = 0; i < JSON.parse(JSON.stringify(selectedDataSet.filter(selection => selection.item === 'selected_manikin_definitions')[0].value)).length; i++) {
      manikindefinitions.push(JSON.parse(JSON.stringify(selectedDataSet.filter(selection => selection.item === 'selected_manikin_definitions')[0].value))[i].value);
      console.log('manikindefinitions:  ' + manikindefinitions[i].value);
    }

    const agegroupids2 = [];
    const serviceids2 = [];
    const tradeids2 = [];
    const componentids2 = [];

    let sexID02 = '';
    let ageGroupID02 = '';
    let componentID02 = '';
    let serviceID02 = '';
    let mOSID02 = '';
    let tradeID02 = '';
    let preferredHandwritingID02 = '';
    let preferredHandsightingWeaponID02 = '';
    let visionCorrected02 = '';
    let languageID02 = '';

    let manikinOptions = '';
    console.log('manikindefinitions:  ' + manikindefinitions);
    let showEllipse = false;
    showEllipse = selectedDataSet.filter(selection => selection.item === 'show_manikin_options')[0].value;
    console.log('showEllipse:  ' + showEllipse);

    // this.numberOfDimensionFromParent = '1';

    console.log('numberOfDimensionFromParent:  ' + this.numberOfDimensionFromParent);

    if (manikindefinitions.length > 1) {
      manikinOptions = 'Manikins';
    }
    if (showEllipse == true) {
      manikinOptions = manikinOptions + ',' + 'Ellipse';
    }
    if (this.plot_second_demographics) {
      sexID02 = selectedDataSet.filter(selection => selection.item === 'sex_2')[0].value;
      ageGroupID02 = '';
      componentID02 = '';
      serviceID02 = '';
      mOSID02 = '';
      tradeID02 = '';
      preferredHandwritingID02 = selectedDataSet.filter(selection => selection.item === 'preferred_hand_2')[0].value;
      preferredHandsightingWeaponID02 = "0";
      visionCorrected02 = selectedDataSet.filter(selection => selection.item === 'vision_corrected_2')[0].value;
      languageID02 = selectedDataSet.filter(selection => selection.item === 'language_2')[0].value;

      for (let i = 0; i < JSON.parse(JSON.stringify(selectedDataSet.filter(selection => selection.item === 'agegroups_2')[0].value)).length; i++) {
        agegroupids2.push(JSON.parse(JSON.stringify(selectedDataSet.filter(selection => selection.item === 'agegroups_2')[0].value))[i].value);
      }

      for (let i = 0; i < JSON.parse(JSON.stringify(selectedDataSet.filter(selection => selection.item === 'services_2')[0].value)).length; i++) {
        serviceids2.push(JSON.parse(JSON.stringify(selectedDataSet.filter(selection => selection.item === 'services_2')[0].value))[i].value);
      }

      if (selectedDataSet.filter(selection => selection.item === 'trades_branches_2')[0].value !== undefined) {
        for (let i = 0; i < JSON.parse(JSON.stringify(selectedDataSet.filter(selection => selection.item === 'trades_branches_2')[0].value)).length; i++) {
          tradeids2.push(JSON.parse(JSON.stringify(selectedDataSet.filter(selection => selection.item === 'trades_branches_2')[0].value))[i].value);
        }
      }
      if (selectedDataSet.filter(selection => selection.item === 'components_2')[0].value !== undefined) {
        for (let i = 0; i < JSON.parse(JSON.stringify(selectedDataSet.filter(selection => selection.item === 'components_2')[0].value)).length; i++) {
          componentids2.push(JSON.parse(JSON.stringify(selectedDataSet.filter(selection => selection.item === 'components_2')[0].value))[i].value);
        }
      }

    }
    let selectedVariables = '';
    const temp = [];

    if (selectedDataSet.filter(selection => selection.item === 'body_measure')[0].value !== undefined) {
      selectedVariables = selectedDataSet.filter(selection => selection.item === 'body_measure')[0].value;
    }
    if (this.numberOfDimensionFromParent === '2' || this.numberOfDimensionFromParent === '3') {
      if (selectedDataSet.filter(selection => selection.item === 'body_measure_2')[0].value !== isNullOrUndefined) {
        selectedVariables = selectedVariables + ',' + selectedDataSet.filter(selection => selection.item === 'body_measure_2')[0].value;
      }
    }
    if (this.numberOfDimensionFromParent === '3') {

      if (selectedDataSet.filter(selection => selection.item === 'body_measure_3')[0].value !== isNullOrUndefined) {
        selectedVariables = selectedVariables + ',' + selectedDataSet.filter(selection => selection.item === 'body_measure_3')[0].value;
      }
    }
    if (this.isPCAFromParent === 'true') {

      for (let i = 0; i < JSON.parse(JSON.stringify(selectedDataSet.filter(selection => selection.item === 'selected_body_measures')[0].value)).length; i++) {
        body_measures_multiids.push(JSON.parse(JSON.stringify(selectedDataSet.filter(selection => selection.item === 'selected_body_measures')[0].value))[i].value);
        //console.log('selected_body_measuresids:  ' + body_measures_multiids[i].value);
        this.numberOfDimensionFromParent = i.toString();
      }
      selectedVariables = body_measures_multiids.toString();
      console.log('selected_body_measures :  ' + selectedVariables);
      console.log('temp :  ' + temp);

    }

//if (this.numberOfDimensionFromParent === '1' ||  this.numberOfDimensionFromParent === '2') {

  console.log( 'numberOfDimensionFromParent == 2:  ' + this.numberOfDimensionFromParent);
  console.log( 'isPCA == isPCAFromParent' + this.isPCAFromParent);
 
  
  this.filterVariables2 = {
    datavariable: selectedVariables,
    isOverlay: this.plot_second_demographics,
    isPCA: this.isPCAFromParent === 'true' ? true : false,
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
    SexID2: sexID02,
    AgeGroupID2: agegroupids2.toString(),
    ComponentID2: componentids2.toString(),
    ServiceID2: serviceids2.toString(),
    MOSID2: '', // '10,182,183,168'
    TradeID2: tradeids2.toString(),
    PreferredHandwritingID2: preferredHandwritingID02,
    PreferredHandsightingWeaponID2: preferredHandsightingWeaponID02,
    VisionCorrected2: visionCorrected02,
    LanguageID2: languageID02,
    PCAManikinOption: manikinOptions.toString(),
    ManikinDefinition: manikindefinitions.toString(),
    AccomodationPercentage: selectedDataSet.filter(selection => selection.item === 'accomodation')[0].value,
    Unit: selectedDataSet.filter(selection => selection.item === 'unit')[0].value,
    BinNumber: selectedDataSet.filter(selection => selection.item === 'bins')[0].value,
    MissingDataHandlingWithDeletion: 'true',
    PCsToBeCalculated: '2',
    NumberOfPCsToAssess: '2',
    PCACalculateManekins: 'false',
    SurveyDatabase: selectedDataSet.filter(selection => selection.item === 'dataset')[0].value,
  };

 // } else  {


    this.filterVariables1 = {
      isPCA: this.isPCAFromParent === 'true' ? true : false,
      gender: selectedDataSet.filter(selection => selection.item === 'sex')[0].value,
      datavariable: selectedVariables,
      isActive: false,
      SelectedVariables: selectedVariables,
      SexID: selectedDataSet.filter(selection => selection.item === 'sex')[0].value,
      AgeGroupID: agegroupids.toString(),
      ComponentID: componentids.toString(),
      ServiceID: serviceids.toString(),
      MOSID: '', // '10,182,183,168
      TradeID: tradeids.toString(),
      PreferredHandwritingID: selectedDataSet.filter(selection => selection.item === 'preferred_hand')[0].value,
      PreferredHandsightingWeaponID: '0',
      VisionCorrected: selectedDataSet.filter(selection => selection.item === 'vision_corrected')[0].value,
      LanguageID: selectedDataSet.filter(selection => selection.item === 'language')[0].value,
      PCAManikinOption: manikinOptions.toString(),
      ManikinDefinition: manikindefinitions.toString(),
      AccomodationPercentage: selectedDataSet.filter(selection => selection.item === 'accomodation')[0].value,
      SurveyDatabase: selectedDataSet.filter(selection => selection.item === 'dataset')[0].value,
    };

  //}
}

  private summarizeApiData() {

    console.log('*******  Start Call to Web API Plot 1. Waiting for API data... *******');
    console.log("*** filterVariables2 : " + JSON.stringify((this.numberOfDimensionFromParent === '1' || this.numberOfDimensionFromParent === '2') ? this.filterVariables2 : this.filterVariables1) + ' ***');

    this.demographicSurveyService
      .CalculateManikinsWithFilter(
        '{"filter" :[' + JSON.stringify((this.numberOfDimensionFromParent === '1' || this.numberOfDimensionFromParent === '2') ? this.filterVariables2 : this.filterVariables1) + ']}'
      )
      .subscribe(data => {
        this.dataFromAPIPlot1 = JSON.parse(JSON.stringify(data));
        this.summaryMeasureValuesPlot1 = JSON.parse(JSON.stringify(data));
        this.summaryMeasureValuesPlot2 = JSON.parse(JSON.stringify(data));
        if (this.dataFromAPIPlot1) {
          console.log("*** API Data Received (Plot 1): " + data + ' ***');
        }
        console.log("*** API Data Received (Plot 1) - summaryMeasureValuesPlot1: " + this.summaryMeasureValuesPlot1 + ' ***');

        if (this.dataFromAPIPlot1 != null || this.dataFromAPIPlot1 !== undefined) {
          console.log(this.dataFromAPIPlot1);
          this.realDataPlot1 = this.dataFromAPIPlot1.RealDataPlot1; // plot 1 real data
          console.log("*** real DataPlot1: " + JSON.stringify(this.realDataPlot1) + ' ***');

          //Get Statistics Plot 1 from API Data
          this.statisticsPlot1_1 = this.dataFromAPIPlot1.StatisticsPlot1_1; // plot 1 - variable 1
          if (this.numberOfDimensionFromParent === '2') {
            this.statisticsPlot1_2 = this.dataFromAPIPlot1.StatisticsPlot1_2; // plot 1 - variable 2
          }
          if (this.numberOfDimensionFromParent === '3') {
            this.statisticsPlot1_2 = this.dataFromAPIPlot1.StatisticsPlot1_2; // plot 1 - variable 2
            this.statisticsPlot1_3 = this.dataFromAPIPlot1.StatisticsPlot1_3; // plot 1 - variable 3
          }

          if (this.plot_second_demographics) {
            this.realDataPlot2 = this.dataFromAPIPlot1.RealDataPlot2; // plot 1 real data
            this.statisticsPlot2_1 = this.dataFromAPIPlot1.StatisticsPlot2_1; // plot 1 - variable 1
            if (this.numberOfDimensionFromParent === '2') {
              this.statisticsPlot2_2 = this.dataFromAPIPlot1.StatisticsPlot2_2; // plot 1 - variable 2
            }
          }

            if (this.isPCAFromParent === 'true')
            {
              this.isPCACalculationCompleted = true;

              this.pcaDataCharacteristicsAndCumulativeVariances = this.dataFromAPIPlot1.PlotData.DataCharacteristicsAndCumulativeVariances; 
              console.log("*** pcaDataCharacteristicsAndCumulativeVariances  (Plot 1): " + JSON.stringify(this.pcaDataCharacteristicsAndCumulativeVariances)  + ' ***');
              // console.log("*** pcaDataCharacteristicsAndCumulativeVariances 1 - PlotData : " + JSON.stringify(this.dataFromAPIPlot1.PlotData.DataCharacteristicsAndCumulativeVariances)  + ' ***');

              this.pcaTotalVariance = this.dataFromAPIPlot1.PlotData.TotalVariance;
              this.pcaNumberOfPCsCalculated = this.dataFromAPIPlot1.PlotData.NumberOfPCsCalculated ;
              this.pcaCumulativeTotalVariances = this.dataFromAPIPlot1.PlotData.CumulativeTotalVariances;
              this.pcaKMOBarSphericityVariables = this.dataFromAPIPlot1.PlotData.KMOBarSphericityVariables;
              this.pcaCovarianceMatrix = this.dataFromAPIPlot1.PlotData.CovarianceMatrix;
              this.pcaFactorLoadingVariables = this.dataFromAPIPlot1.PlotData.FactorLoading;
              this.pcaFactorScoreCoefficientsVariables = this.dataFromAPIPlot1.PlotData.FactorCoefficients;
              this.pcaNearestNeigborCases = this.dataFromAPIPlot1.NearestNeigborCases;
              this.pcaStructuralDimensions = this.dataFromAPIPlot1.StructuralDimensions;

              console.log("*** pcaStructuralDimensions  (Plot 1): " + JSON.stringify(this.pcaStructuralDimensions)  + ' ***');
              console.log("*** pcaNearestNeigborCases  (Plot 1): " + JSON.stringify(this.pcaNearestNeigborCases)  + ' ***');
  
              console.log("*** pcaNumberOfPCsCalculated  (Plot 1): " + JSON.stringify(this.pcaNumberOfPCsCalculated)  + ' ***');
            
            }
          
          // console.log("*** statisticsPlot1_1  (Plot 1): " + JSON.stringify(this.statisticsPlot1_1)  + ' ***');
          // console.log("*** statisticsPlot1_2  (Plot 1): " + JSON.stringify(this.statisticsPlot1_2)  + ' ***');
          // console.log("*** statisticsPlot1_3  (Plot 1): " + JSON.stringify(this.statisticsPlot1_3)  + ' ***');

          this.sendSelectApiData();
        } else {
          // ERROR
          // If Lists of Lists Master Dataset fails to contain any data alert and following
          alert("List of Lists Dataset (Master Dataset - Plot 1) Failed to Load!");
        }
      });
  }

  ngOnInit(){
   // if(this.pcaNumberOfPCsCalculated[0].display != undefined){
    this.data.currentMessage.subscribe(message => this.message = 'API****' + this.message);
    //}
    
    //Set Selected Data Set from previously selected options for changes
    this.selectedDataSet = this.selectedDataOptions;
    this.data.currentMessage.subscribe(message => this.message = 'API****' + this.message);
 
  }

}
