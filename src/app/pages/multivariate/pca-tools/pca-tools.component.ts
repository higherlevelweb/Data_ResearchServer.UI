import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl, } from '@angular/platform-browser';
import { ExcelService } from './../../../_app-services/excel.service';
import { isNumeric } from 'rxjs/util/isNumeric';
import { isNullOrUndefined } from 'util';
import { ACCOMODATIONS, PCS_TO_BE_CALCULATED, PCA_MANIKIN_OPTIONS, PCA_MANKIN_DEFINITIONS, MISSING_DATA_HANDLING, NUMBER_OF_PCS_TO_ASSESS } from '../../../../_config/temp-lists';
import { FilterVariables, FilterExtendedVariables } from '../../../core/models/filter-variables';
import { ApidataService } from '../../../_app-services/apidata.service';
import { DemographicdataService } from '../../../_app-services/demographicdata.service';

@Component({
  selector: 'app-pca-tools',
  templateUrl: './pca-tools.component.html',
  styleUrls: ['./pca-tools.component.css']
})
export class PcaToolsComponent implements OnInit {

  @Output() submitSelectData = new EventEmitter();
  public formValidationMsg: string;
  public formValidationError = false;

  public selectedDataOptions: Array<any>;
  public receivedApiData: Array<any>;
  public dataFromAPIPlot1: any;
  // Chart Data (To Come in through data service)
  public statisticsPlot11: Array<any>;
  public statisticsPlot12: Array<any>;
  public statisticsPlot13: Array<any>;
  public bodyMeasuresPlot1: Array<any>;

  // Chart Number Bins Selected
  public chartBinsSelected: number;

  // Chart Units Selected
  public chartUnitsSelected: string;

  // Hard Default Settings
  public multi_d_selection: boolean = true;
  public numberOfDimensionFromParent: string = '4';
  public isPCAFromParent: string = 'true';

  // Chart Data
  public loadChartView: boolean = false;
  public chartDataLoaded: boolean = false;
  public selected_data_set: Array<any>;
  public selected_body_measure: string;
  public selected_body_measure_2: string;
  public selected_body_measure_3: string;
  public selected_body_measures: string;
  public isPCACalculationCompleted: boolean;

  public realDataPlot1: any;
  // Data Selections
  public selectedData: any;

  public viewSelectedOptions = false;
  public viewTotalCovariance = false;
  public viewCovarianceMatrix = false;
  public viewCasesAndKMOMeasure = false;
  public viewFactorScoreCoefficientsVariables = false;
  public viewFactorLoadings = false;
  public viewStructuralDimensions = false;
  public viewNearestNeighbourCases = false;
  public viewPlot = false;

  // set Review Data Display Variables
  public selectedDatasetDisplay: string;
  public selectedBodyMeasureDisplay: string;
  public selectedBodyMeasuresDisplay: string;
  public selectedUnitsDisplay: string;
  public selectedBinsDisplay: string;
  public selectedSexDisplay: string;
  public selectedAgegroupsDisplay: string;
  public selectedLanguageDisplay: string;
  public selectedServicesDisplay: string;
  public selectedTradesBranchesDisplay: string;
  public selectedComponentsDisplay: string;
  public selectedPreferredHandDisplay: string;
  public selectedVisionCorrectedDisplay: string;
  public selectedSexDisplay2: string;
  public selectedAgegroupsDisplay2: string;
  public selectedLanguageDisplay2: string;
  public selectedServicesDisplay2: string;
  public selectedTradesBranchesDisplay2: string;
  public selectedComponentsDisplay2: string;
  public selectedPreferredHandDisplay2: string;
  public selectedVisionCorrectedDisplay2: string;

  listofListsPCAData: string;
  listOfListsPCADataReceived: Array<any>;
  listOfListsPCAataCharacteristicsAndCumulativeVariances: Array<any>;

  public temp_list: Array<any>;
  public listofListsPCAData_0_DataCharacteristics: Array<any>;
  public listofListsPCAData_0_CumulativeVariances: Array<any>;
  public listofListsPCAData_0_DataCharacteristics_temp: string;
  public listofListsPCAData_1_CovarianceMatrix: Array<any>;
  public listofListsPCAData_2_CasesKMOBarSphericity: Array<any>;
  public listofListsPCAData_0_TotalVariance: Array<any>;
  public listofListsPCAData_0_NumberOfPCsCalculated: Array<any>;
  public listofListsPCAData_0_CumulativeTotalVariances: Array<any>;

  public listofListsPCAData_4_FactorLoadings: Array<any>;
  public listofListsPCAData_4_FactorScoreCoefficientsVariables: Array<any>;
  public listofListsPCAData_5_StructuralDimensions: Array<any>;
  public listofListsPCAData_5_NearestNeigborCases: Array<any>;

  public pcaDataKMOMeasure: number;
  public pcaDataKMOMeasureStatus: string;
  public pcaBartlettSphericity: number;
  public pcaDataCasesVariables: number;
  public pcaDataBartlettsSphericityTest: string;
  // pcaDataBartlettsSphericityTest: string;

  public showCasesAndKMOMeasure = false;
  public showCovarianceMatrix = false;
  public showTotalCovariance = false;
  public showDataCharacteristics = false;
  public showFactorScoreCoefficientsVariables = false;
  public showFactorLoadings = false;
  public showStructuralDimensions = false;
  public showNearestNeighbourCases = false;
  public showPlot = false;

  public columns: string[];
  public pcaNumberOfPCsCalculatedValue = 2;
  public filterVariables1: FilterVariables;
  public filterVariables2: FilterExtendedVariables;
  public filterVariablesPCA: FilterExtendedVariables;
  public buttonDisabled: boolean = false;
  message: string;

  errorMessage: any[];

  plotdata: string;
  id: string;
  modelId: string;
  url: SafeResourceUrl;
  // string :httpURL;
  httpURL = 'http://localhost:89/' + this.pcaNumberOfPCsCalculatedValue + 'dplot.html';

  /////////////////////////////////
  public accomodations = ACCOMODATIONS;
  public pcs_to_be_calculated = PCS_TO_BE_CALCULATED;
  private manikin_options = PCA_MANIKIN_OPTIONS;
  private manikin_definitions = PCA_MANKIN_DEFINITIONS;
  private missing_data_handling = MISSING_DATA_HANDLING;
  private number_of_pcs_to_assess = NUMBER_OF_PCS_TO_ASSESS;


  public selected_number_of_pcs_to_assess: string = this.number_of_pcs_to_assess[0].value;
  public selected_accomodation = this.accomodations[10];
  public show_accomodation_option = false;
  public showCalculateManikinsOptions = false;
  public showEllipseOptions = false;
  public selected_manikin_definitions = [];
  public selected_pcs_to_be_calculated = this.pcs_to_be_calculated[3];
  public selected_missing_data_handling = this.missing_data_handling[0].value;

  // multi-d-selection options
  public selected_manikin_options = {
    show_ellipse: false,
    manikins: false
  };

  // Select Menu Settings
  public multiSelectSettings = {};

  // return display for selection item
  getItemDisplay(object, item) {
    let itemDisplay: string = '';
    itemDisplay = object.filter(selection => selection.value === item)[0].display;
    return itemDisplay;
  }

  // Create display list of items for multiselect lists of selected options
  getListDisplay(object) {
    let listDisplay: string = '';
    for (let key of Object.keys(object)) {
      let item = object[key];
      listDisplay = listDisplay + item.display + ' &nbsp; ';
    }
    return listDisplay;
  }

  getCheckedDisplay(object) {
    let checkedDisplay: string = '';
    for (let key of Object.keys(object)) {
      if (object[key] == true)
        checkedDisplay = checkedDisplay + '<span class="select-result-item">' + key + ': true</span>';
    }
    return checkedDisplay;
  }
  public i = 1;

  setShowCalculateManikinsOptions(option) {
    this.selected_manikin_options.manikins = option.target.checked;
    if (this.selected_manikin_options.manikins) {
      this.show_accomodation_option = true;
    } else if (!this.selected_manikin_options.show_ellipse) {
      this.show_accomodation_option = false;
      this.selected_accomodation = this.accomodations[0];
    }
    console.log(this.i + " Show Calculate Mankin Options: " + this.selected_manikin_options.manikins);
  }

  setShowEllipseOptions(option) {
    this.selected_manikin_options.show_ellipse = option.target.checked;
    if (this.selected_manikin_options.show_ellipse) {
      this.show_accomodation_option = true;
    } else if (!this.selected_manikin_options.manikins) {
      this.show_accomodation_option = false;
      this.selected_accomodation = this.accomodations[0];
    }
    console.log(this.i + " Show Ellipse Options: " + this.selected_manikin_options.show_ellipse);
  }

  updateSelectedAccomodation() {
    console.log("Accomodation: " + this.selected_accomodation);
  }
  updateSelectedPCS_To_Be_Calculated() {
    console.log("selected_pcs_to_be_calculated: " + this.selected_pcs_to_be_calculated);
    this.selected_number_of_pcs_to_assess = this.selected_pcs_to_be_calculated;
    if (this.selected_number_of_pcs_to_assess === '1') {
      this.buttonDisabled = true;
    } else {
      this.buttonDisabled = false;
    }
  }
  updateNumber_Of_PCs_To_Assess(option) {
    this.selected_pcs_to_be_calculated = this.selected_number_of_pcs_to_assess;
    if (this.selected_pcs_to_be_calculated === '1') {
      this.buttonDisabled = true;
    } else {
      this.buttonDisabled = false;
    }
    // this.temp_list = this.listofListsPCAData_0_DataCharacteristics;
    // this.listofListsPCAData_0_DataCharacteristics = null;
    //this.alternate('id_listofListsPCAData_0_TotalVariance');
  }


  /////////////////////////////////

  constructor(private demographicSurveyService: DemographicdataService, public sanitizer: DomSanitizer, private excelService: ExcelService, private data: ApidataService) {
    // constructor(public sanitizer: DomSanitizer) {
    if (this.selected_pcs_to_be_calculated === undefined) {
      this.selected_pcs_to_be_calculated = '2';

      if (Number(this.selected_pcs_to_be_calculated) > 1 && Number(this.selected_pcs_to_be_calculated) < 4) {
        this.httpURL = 'http://localhost:89/' + this.selected_pcs_to_be_calculated + 'dplot.html';
        this.modelId = '01';
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.httpURL);
        this.plotdata = '';
      }
    }
  }

  viewHideSelectedDataOptions($event) {
    this.viewSelectedOptions = !this.viewSelectedOptions;
  }
  viewHideTotalCovariance($event) {
    this.viewTotalCovariance = !this.viewTotalCovariance;
  }
  viewHideCovarianceMatrix($event) {
    this.viewCovarianceMatrix = !this.viewCovarianceMatrix;
  }
  viewHideCasesAndKMOMeasure($event) {
    this.viewCasesAndKMOMeasure = !this.viewCasesAndKMOMeasure;
  }
  viewHideFactorScoreCoefficientsVariables($event) {
    this.viewFactorScoreCoefficientsVariables = !this.viewFactorScoreCoefficientsVariables;
  }
  viewHideFactorLoadings($event) {
    this.viewFactorLoadings = !this.viewFactorLoadings;
  }
  viewHideStructuralDimensions($event) {
    this.viewStructuralDimensions = !this.viewStructuralDimensions;
  }
  viewHideNearestNeighbourCases($event) {
    this.viewNearestNeighbourCases = !this.viewNearestNeighbourCases;
  }
  viewHidePlot($event) {
    this.viewPlot = !this.viewPlot;
  }
  getSelectedApiData(selectedApiData) {

    // set selected data options array
    this.selectedDataOptions = selectedApiData[0];
    console.log('Selected Data Options: ' + JSON.stringify(this.selectedDataOptions));

    this.selected_data_set = this.selectedDataOptions.filter(selection => selection.item === 'dataset')[0].value;
    this.selected_body_measure = this.selectedDataOptions.filter(selection => selection.item === 'body_measure')[0].value;
    this.selected_body_measures = this.selectedDataOptions.filter(selection => selection.item === 'selected_body_measures')[0].value;
    this.selected_body_measure_2 = this.selectedDataOptions.filter(selection => selection.item === 'body_measure_2')[0].value;
    this.selected_body_measure_3 = this.selectedDataOptions.filter(selection => selection.item === 'body_measure_3')[0].value;
    this.chartUnitsSelected = this.selectedDataOptions.filter(selection => selection.item === 'unit')[0].value;

    // set received api data array
    this.receivedApiData = selectedApiData[1];
    console.log('Received API Data: ' + JSON.stringify(this.receivedApiData));
    this.numberOfDimensionFromParent = this.receivedApiData.filter(selection => selection.item === 'numberOfDimensionFromParent')[0].value;
    console.log('numberOfDimensionFromParent 2: ' + this.numberOfDimensionFromParent);

    this.bodyMeasuresPlot1 = this.receivedApiData.filter(selection => selection.item === 'measures1')[0].value;
    // this.listOfListsPCADataReceived = this.receivedApiData.filter(selection => selection.item === 'data1')[0].value;
    this.listOfListsPCAataCharacteristicsAndCumulativeVariances = this.receivedApiData.filter(selection => selection.item === 'pcaDataCharacteristicsAndCumulativeVariances')[0].value;

    this.listofListsPCAData_1_CovarianceMatrix = this.receivedApiData.filter(selection => selection.item === 'pcaCovarianceMatrix')[0].value;
    this.listofListsPCAData_2_CasesKMOBarSphericity = this.receivedApiData.filter(selection => selection.item === 'pcaKMOBarSphericityVariables')[0].value;
    this.listofListsPCAData_0_TotalVariance = this.receivedApiData.filter(selection => selection.item === 'pcaTotalVariance')[0].value;
    this.listofListsPCAData_0_NumberOfPCsCalculated = this.receivedApiData.filter(selection => selection.item === 'pcaNumberOfPCsCalculated')[0].value;
    this.listofListsPCAData_0_CumulativeTotalVariances = this.receivedApiData.filter(selection => selection.item === 'pcaCumulativeTotalVariances')[0].value;
    this.listofListsPCAData_4_FactorLoadings = this.receivedApiData.filter(selection => selection.item === 'pcaFactorLoadingVariables')[0].value;
    this.listofListsPCAData_4_FactorScoreCoefficientsVariables = this.receivedApiData.filter(selection => selection.item === 'pcaFactorScoreCoefficientsVariables')[0].value;
    this.listofListsPCAData_5_StructuralDimensions = this.receivedApiData.filter(selection => selection.item === 'pcaStructuralDimensions')[0].value;
    this.listofListsPCAData_5_NearestNeigborCases = this.receivedApiData.filter(selection => selection.item === 'pcaNearestNeigborCases')[0].value;

    this.filterVariables1 = this.receivedApiData.filter(selection => selection.item === 'filterVariables1')[0].value;
    this.filterVariables2 = this.receivedApiData.filter(selection => selection.item === 'filterVariables2')[0].value;

    // Reset values
    this.number_of_pcs_to_assess = this.listofListsPCAData_0_CumulativeTotalVariances;
    this.selected_pcs_to_be_calculated = this.listofListsPCAData_0_NumberOfPCsCalculated[0].value;
    console.log('API Body Measures: ' + this.bodyMeasuresPlot1);

    // set selected chart data option displays
    this.setReviewDataDisplaySettings();

    // Set all chart data and switch to chart view
    this.generateChartView();
    this.generatePCAData(this.receivedApiData);
  }

  changeSelectedData() {
    // Change view back to selection
    this.loadChartView = false;
    this.chartDataLoaded = false;
  }

  setReviewDataDisplaySettings() {
    this.selectedDatasetDisplay = this.selectedDataOptions.filter(selection => selection.item === 'dataset')[0].display;
    this.selectedBodyMeasureDisplay = this.selectedDataOptions.filter(selection => selection.item === 'body_measure')[0].display;
    this.selectedBodyMeasuresDisplay = this.selectedDataOptions.filter(selection => selection.item === 'selected_body_measures')[0].display;
    this.selectedUnitsDisplay = this.selectedDataOptions.filter(selection => selection.item === 'unit')[0].display;
    this.selectedBinsDisplay = this.selectedDataOptions.filter(selection => selection.item === 'bins')[0].display;
    this.selectedSexDisplay = this.selectedDataOptions.filter(selection => selection.item === 'sex')[0].display;
    this.selectedAgegroupsDisplay = this.selectedDataOptions.filter(selection => selection.item === 'agegroups')[0].display;
    this.selectedLanguageDisplay = this.selectedDataOptions.filter(selection => selection.item === 'language')[0].display;
    this.selectedServicesDisplay = this.selectedDataOptions.filter(selection => selection.item === 'services')[0].display;
    this.selectedTradesBranchesDisplay = this.selectedDataOptions.filter(selection => selection.item === 'trades_branches')[0].display;
    this.selectedComponentsDisplay = this.selectedDataOptions.filter(selection => selection.item === 'components')[0].display;
    this.selectedVisionCorrectedDisplay = this.selectedDataOptions.filter(selection => selection.item === 'vision_corrected')[0].display;
    this.selectedPreferredHandDisplay = this.selectedDataOptions.filter(selection => selection.item === 'preferred_hand')[0].display;
    console.log('selectedBodyMeasuresDisplay: ' + this.selectedBodyMeasuresDisplay);

    this.selectedBodyMeasuresDisplay = this.selectedBodyMeasuresDisplay.toString().split("&nbsp;").join(",");
    console.log('selectedBodyMeasuresDisplay: ' + this.selectedBodyMeasuresDisplay);
    this.selectedBodyMeasuresDisplay = this.selectedBodyMeasuresDisplay.toString().split("&nbsp; ,").join(",");
    console.log('selectedBodyMeasuresDisplay: ' + this.selectedBodyMeasuresDisplay);
    this.selectedBodyMeasuresDisplay = this.selectedBodyMeasuresDisplay.toString().split(" ,").join(",");
    console.log('selectedBodyMeasuresDisplay: ' + this.selectedBodyMeasuresDisplay);

  }

  generatePCAData(dataFromAPIPlot1: any) {

    if (this.isPCAFromParent === 'true') {

      console.log('listOfListsPCADataReceived: ' + JSON.stringify(this.listOfListsPCADataReceived));

      this.listofListsPCAData_0_DataCharacteristics = this.listOfListsPCAataCharacteristicsAndCumulativeVariances[`DataCharacteristics`];
      // console.log('listofListsPCAData_0_DataCharacteristics: ' + JSON.stringify(this.listofListsPCAData_0_DataCharacteristics));
      this.listofListsPCAData_0_CumulativeVariances = this.listOfListsPCAataCharacteristicsAndCumulativeVariances[`CumulativeVariances`];
      console.log('listofListsPCAData_0_CumulativeVariances: ' + JSON.stringify(this.listofListsPCAData_0_CumulativeVariances));

      // this.listofListsPCAData_1_CovarianceMatrix  =  this.listOfListsPCADataReceived[`CovarianceMatrix`];
      console.log('listofListsPCAData_1_CovarianceMatrix: ' + JSON.stringify(this.listofListsPCAData_1_CovarianceMatrix));

      this.setKMOCasesVariables(this.listofListsPCAData_2_CasesKMOBarSphericity);

      console.log('FactorCoefficients: ' + JSON.stringify(this.listofListsPCAData_4_FactorScoreCoefficientsVariables));
      console.log('listofListsPCAData_5_NearestNeigborCases: ' + JSON.stringify(this.listofListsPCAData_5_NearestNeigborCases));
      console.log('listofListsPCAData_0_TotalVariance: ' + JSON.stringify(this.listofListsPCAData_0_TotalVariance));
      console.log('listofListsPCAData_0_NumberOfPCsCalculated: ' + JSON.stringify(this.listofListsPCAData_0_NumberOfPCsCalculated));
      console.log('listofListsPCAData_0_CumulativeTotalVariances: ' + JSON.stringify(this.listofListsPCAData_0_CumulativeTotalVariances));
      console.log('listofListsPCAData_4_FactorLoadings: ' + JSON.stringify(this.listofListsPCAData_4_FactorLoadings));

      if (this.listofListsPCAData_0_NumberOfPCsCalculated[0].display !== isNullOrUndefined) {
        this.pcaNumberOfPCsCalculatedValue = Number(this.listofListsPCAData_0_NumberOfPCsCalculated[0].display);
      }
      // Transform array of 1 Dim to array of 2 Dim before presebtiung to UI
      // this.TransformArray(6, 4, this.listofListsPCAData_0_DataCharacteristics);
      // this.listofListsPCAData_0_DataCharacteristics = JSON.parse(this.listofListsPCAData_0_DataCharacteristics);
      // console.log(dataFromAPIPlot1.DataCharacteristicsAndCumulativeVariances.DataCharacteristics);

      this.columns = this.listofListsPCAData_4_FactorLoadings[0];


      if (this.listofListsPCAData_0_DataCharacteristics.length > 0) {
        this.showCasesAndKMOMeasure = true;
        this.showCovarianceMatrix = true;
        this.showDataCharacteristics = true;
      }

      if (this.listofListsPCAData_0_DataCharacteristics.length > 0) {
        this.showCasesAndKMOMeasure = true;
        this.showCovarianceMatrix = true;
        this.showDataCharacteristics = true;
        this.showFactorLoadings = true;
        this.showFactorScoreCoefficientsVariables = true;
        this.showTotalCovariance = true;
      }
    }
  }

  generateChartView() {

    // this.setStatisticsData();

    // Generate Chart Data

    // Load Chart
    this.loadChartView = true;
    // Load Chart
    this.chartDataLoaded = true;
  }

  exploreNewData() {
    window.location.href = '/multivariate/pca-tools/';
  }


  exportAsExcelFileRealDataPlot1(): void {
    console.log(' *** this.realDataPlot1 ---3D (Plot 1): ' + JSON.stringify(this.realDataPlot1) + ' ***');
    this.excelService.exportAsExcelFileRealData(this.realDataPlot1, 'export_CFSA_data', 1);
  }

  exportAsExcelFileDataCaracteristics(): void {
    // this.excelService.exportAsExcelFileRealData(this.listofListsPCAData_0_DataCharacteristics, 'export_CFSA_DataCharacteristics', 1);
    // this.excelService.exportAsExcelFileRealData(this.listofListsPCAData_0_CumulativeVariances, 'export_CFSA_CumulativeVariances', 1);
    if (this.listofListsPCAData_1_CovarianceMatrix !== undefined) {
      if (this.listofListsPCAData_1_CovarianceMatrix.length != null && this.listofListsPCAData_1_CovarianceMatrix.length > 0) {
        this.excelService.exportAsExcelFileRealData(this.listofListsPCAData_1_CovarianceMatrix, 'export_CFSA_CovarianceMatrix', 1);
        this.excelService.exportAsExcelFileRealData(this.listofListsPCAData_2_CasesKMOBarSphericity, 'export_CFSA_CasesKMOBarSphericity', 1);
        this.excelService.exportAsExcelFileRealData(this.listofListsPCAData_0_TotalVariance, 'export_CFSA_TotalVariance', 1);
      }
    }

    if (this.listofListsPCAData_4_FactorLoadings !== undefined) {
      if (this.listofListsPCAData_4_FactorLoadings.length != null && this.listofListsPCAData_4_FactorLoadings.length > 0) {
        this.excelService.exportAsExcelFileRealData(this.listofListsPCAData_4_FactorLoadings, 'export_CFSA_FactorLoadings', 1);
        this.excelService.exportAsExcelFileRealData(this.listofListsPCAData_4_FactorScoreCoefficientsVariables, 'export_CFSA_FactorScoreCoefficientsVariables', 1);
      }
    }

    if (this.listofListsPCAData_5_StructuralDimensions !== undefined) {
      if (this.listofListsPCAData_5_NearestNeigborCases.length != null && this.listofListsPCAData_5_NearestNeigborCases.length > 0) {
        this.excelService.exportAsExcelFileRealData(this.listofListsPCAData_5_StructuralDimensions, 'export_CFSA_StructuralDimensions', 1);
      }
    }

    if (this.listofListsPCAData_5_NearestNeigborCases !== undefined) {
      if (this.listofListsPCAData_5_NearestNeigborCases.length != null && this.listofListsPCAData_5_NearestNeigborCases.length > 0) {
        this.excelService.exportAsExcelFileRealData(this.listofListsPCAData_5_NearestNeigborCases, 'export_CFSA_NearestNeigborCases', 1);
      }
    }

  }

  setKMOCasesVariables(dataKMOCase: string[]) {
    // "KMOBarSphericityVariables": [{ "Col0" :457.0000,  "Col1" :0.7923,  "Col2" :0.0000}]

    console.log(JSON.stringify(dataKMOCase));

    this.pcaDataCasesVariables = Number(dataKMOCase[0]) === NaN ? 0 : Number(dataKMOCase[0]);
    this.pcaDataKMOMeasure = Number(dataKMOCase[1]) === NaN ? 0 : Number(dataKMOCase[1]);
    this.pcaBartlettSphericity = Number(dataKMOCase[2]) === NaN ? 0 : Number(dataKMOCase[2]);

    if ((Number(this.pcaDataKMOMeasure) >= 0.00) && (this.pcaDataKMOMeasure < 0.50)) {
      this.pcaDataKMOMeasureStatus = 'Unacceptable';
    } else if ((this.pcaDataKMOMeasure >= 0.50) && (this.pcaDataKMOMeasure < 0.60)) {
      this.pcaDataKMOMeasureStatus = 'Miserable';
    } else if ((this.pcaDataKMOMeasure >= 0.60) && (this.pcaDataKMOMeasure < 0.70)) {
      this.pcaDataKMOMeasureStatus = 'Mediocre';
    } else if ((this.pcaDataKMOMeasure >= 0.70) && (this.pcaDataKMOMeasure < 0.80)) {
      this.pcaDataKMOMeasureStatus = 'Middling';
    } else if ((this.pcaDataKMOMeasure >= 0.80) && (this.pcaDataKMOMeasure < 0.90)) {
      this.pcaDataKMOMeasureStatus = 'Meritorious';
    } else if ((this.pcaDataKMOMeasure >= 0.90) && (this.pcaDataKMOMeasure <= 1.00)) {
      this.pcaDataKMOMeasureStatus = 'Marvelous';
    }
    this.pcaDataBartlettsSphericityTest = this.pcaBartlettSphericity.toString(); // .ToString("0.000");
  }

  public getKMOMeasureColor(casesToVariables: number, KMO: number, pValue: number): string {

    if (casesToVariables < 5) {
      // txtVariables.BackColor = System.Drawing.Color.Yellow;
      return 'red';
    } else if (casesToVariables >= 5 && casesToVariables < 20) {
      // txtVariables.BackColor = System.Drawing.Color.Yellow;
      return 'yellow';
    }
    if (KMO <= 0.6 || pValue >= 0.01) {
      //  txtKMOMeasure.BackColor = System.Drawing.Color.Yellow;
      return 'yellow';
    }

  }
  public getContentAndHeaderBackColor(myCovValue: string, ndx: number): string {

    if (isNumeric(myCovValue)) {
      if (ndx === 1 && this.pcaNumberOfPCsCalculatedValue >= 1) {
        return 'lightblue';
      } else if (ndx === 2 && this.pcaNumberOfPCsCalculatedValue >= 2) {
        return 'lightblue';
      } else if (ndx === 3 && this.pcaNumberOfPCsCalculatedValue >= 3) {
        return 'lightblue';
      } else {
        return 'white';
      }
    } else {
      return 'darkgrey';
    }
  }
  public getWidthOfCell(myCovValue: String): string {

     return myCovValue.length * 2 + 'px';
  }
  public getHeaderOrTitleBackColor(myCovValue: string): string {

    if (isNumeric(myCovValue)) {
      return 'white';
    } else {
      return 'darkgrey';
    }
  }
  public getCovarianceColor(myCovValue: number): string {

    if (myCovValue < 1.0 && myCovValue >= 0.8) {
      return 'red';
    } else if (myCovValue == 1.0 || myCovValue == 1 || myCovValue === 1.0000) {
      return 'black';
    } else {
      return 'navy';
    }

  }


  alternate(id) {
    if (document.getElementsByTagName) {
      const table = document.getElementById(id);
      const rows = table.getElementsByTagName('tr');
      for (let i = 0; i < rows.length; i++) {
        // manipulate rows
        if (i % 2 === 0) {
          rows[i].className = 'even';
        } else {
          rows[i].className = 'odd';
        }
      }
    }
  }

  // update all selection data set values
  updateSelectData() {
    console.log("**updateSelectData* filterVariables2 : " + JSON.stringify((this.numberOfDimensionFromParent === '1' || this.numberOfDimensionFromParent === '2') ? this.filterVariables2 : this.filterVariables1) + ' ***');

    const manikindefinitions = [];
    for (let i = 0; i < this.selected_manikin_definitions.length; i++) {
      // manikindefinitions.push(this.selected_manikin_definitions[0].value[i].value);
      manikindefinitions.push(JSON.parse(JSON.stringify(this.selected_manikin_definitions))[i].value);

      console.log('manikindefinitions:  ' + manikindefinitions[i].value);
    }

    if (this.selected_number_of_pcs_to_assess === '1') {
      this.selected_number_of_pcs_to_assess = '2';
    }
    if (this.selected_pcs_to_be_calculated === '1') {
      this.selected_pcs_to_be_calculated = '2';
    }
    this.filterVariablesPCA = this.filterVariables2;
    this.filterVariablesPCA.PCACalculateManekins = 'true';
    this.filterVariablesPCA.NumberOfPCsToAssess = this.selected_number_of_pcs_to_assess;
    this.filterVariablesPCA.PCsToBeCalculated = this.selected_pcs_to_be_calculated;
    this.filterVariablesPCA.MissingDataHandlingWithDeletion = this.selected_missing_data_handling;
    this.filterVariablesPCA.AccomodationPercentage = this.selected_accomodation;
    this.filterVariablesPCA.PCAManikinOption = this.selected_manikin_options.show_ellipse;
    this.filterVariablesPCA.ManikinDefinition = manikindefinitions;

  }
  calculateManekins() {

    // update all selection data before sent to parent   
    this.updateSelectData();
    this.summarizeApiData(this.filterVariablesPCA);

    this.data.currentMessage.subscribe(message => this.message = 'API****' + JSON.stringify(this.filterVariables1));

    // Validation Body Measures options before submit
    this.formValidationError = false;
    this.formValidationMsg = '';
    if (this.isPCAFromParent === 'true') {
      if (this.isPCAFromParent === 'true') {
        if (this.selected_body_measures.length < 2) {
          this.formValidationMsg = 'Please select at least 2 body measure options.';
          this.formValidationError = true;
        }
      }
      if (this.number_of_pcs_to_assess.length === 0) {
        this.formValidationMsg = 'Please select number of PCs to assess.';
        this.formValidationError = true;
      }

      if (this.formValidationError === true) {
        console.log('Form not Validated: ' + this.formValidationMsg);
        return false;
      } else {
        this.submitSelectData.emit(this.selectedData);
      }
      // change data selection view to false (to switch to loading page)
      // this.dataSelectionView = false;
    }
    if (this.selected_pcs_to_be_calculated === undefined) {
      this.selected_pcs_to_be_calculated = '2';

      if (Number(this.selected_pcs_to_be_calculated) > 1 && Number(this.selected_pcs_to_be_calculated) < 4) {
        this.httpURL = 'http://localhost:89/' + this.selected_pcs_to_be_calculated + 'dplot.html';
        this.modelId = '01';
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.httpURL);
        this.plotdata = '';
      }
    }
  }
  private summarizeApiData(filterVariablesPCA: FilterExtendedVariables) {

    console.log("*** filterVariables2 : " + JSON.stringify((this.numberOfDimensionFromParent === '1' || this.numberOfDimensionFromParent === '2') ? this.filterVariablesPCA : this.filterVariablesPCA) + ' ***');

    this.demographicSurveyService
      .CalculateManikinsWithFilter(
        '{"filter" :[' + JSON.stringify((this.numberOfDimensionFromParent === '1' || this.numberOfDimensionFromParent === '2') ? this.filterVariablesPCA : this.filterVariablesPCA) + ']}'
      )
      .subscribe(data => {
        this.dataFromAPIPlot1 = JSON.parse(JSON.stringify(data));
        if (this.dataFromAPIPlot1) {
          console.log("*** API Data Received (Plot 1): " + data + ' ***');
        }

        if (this.dataFromAPIPlot1 != null || this.dataFromAPIPlot1 !== undefined) {
          console.log(this.dataFromAPIPlot1);
          this.realDataPlot1 = this.dataFromAPIPlot1.RealDataPlot1; // plot 1 real data

          if (this.isPCAFromParent === 'true') {
            this.isPCACalculationCompleted = true;

            this.listofListsPCAData_5_NearestNeigborCases = this.dataFromAPIPlot1.NearestNeigborCases;
            this.listofListsPCAData_5_StructuralDimensions = this.dataFromAPIPlot1.StructuralDimensions;

            console.log("*** pcaStructuralDimensions  (Plot 1): " + JSON.stringify(this.listofListsPCAData_5_StructuralDimensions) + ' ***');
            console.log("*** pcaNearestNeigborCases  (Plot 1): " + JSON.stringify(this.listofListsPCAData_5_NearestNeigborCases) + ' ***');

            console.log("this.showNearestNeighbourCases before: " + this.showNearestNeighbourCases + ' ***');

            // Calculate Manekins
            if (this.listofListsPCAData_5_StructuralDimensions !== undefined) {
              if (this.listofListsPCAData_5_NearestNeigborCases.length != null && this.listofListsPCAData_5_NearestNeigborCases.length > 0) {
                this.showStructuralDimensions = true;
                this.showPlot = true;
              }
            }
            if (this.listofListsPCAData_5_NearestNeigborCases !== undefined) {
              if (this.listofListsPCAData_5_NearestNeigborCases.length > 0) {
                this.showNearestNeighbourCases = true;
              }
            }

            console.log("this.showNearestNeighbourCases after: " + this.showNearestNeighbourCases + ' ***');

          }
        } else {
          // ERROR
          // If Lists of Lists Master Dataset fails to contain any data alert and following
          alert("List of Lists Dataset (Master Dataset - Plot 1) Failed to Load!");
        }
      });
  }

  printPage() {
    //Print functionality here
    window.print();
  }

  ngOnInit() {

    this.multiSelectSettings = {
      singleSelection: false,
      idField: 'value',
      textField: 'display',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: false
    };
  }
}
