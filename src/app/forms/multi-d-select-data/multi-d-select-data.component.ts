import { Component, EventEmitter, Output, Input, OnInit } from '@angular/core';
import { DATASETS, BODY_MEASURES, SEXES, LANGUAGES, AGEGROUPS, SERVICES, TRADES_BRANCHES, COMPONENT_TYPES, PREFERRED_HANDS, VISIONSCORRECTED, PCA_MANIKIN_OPTIONS, PCA_MANKIN_DEFINITIONS, ACCOMODATIONS, UNITS, BIN_OPTIONS,
  MISSING_DATA_HANDLING, NUMBER_OF_PCS_TO_ASSESS } from '../../../_config/temp-lists';
 
@Component({
  selector: 'app-multi-d-select-data',
  templateUrl: './multi-d-select-data.component.html',
  styleUrls: ['./multi-d-select-data.component.css']
})

export class MultiDSelectDataComponent implements OnInit {

  @Input() isPCAFromParent: string;
  @Input() numberOfDimensionFromParent: string;
  @Input() isPCACalculationCompleted: string;
  @Input() pcaNumberOfPCsCalculated: Array<any>;
  @Input() pcaCumulativeTotalVariances: Array<any>;
  @Input() selectedDataSet: Array<any>;
  @Output() submitSelectData = new EventEmitter();
  public multiDSelection = true;
  public formValidationMsg: string;
  public formValidationError = false;

  // Menu Options Lists
  private datasets = DATASETS;
  private body_measures = BODY_MEASURES;
  private body_measures_2 = BODY_MEASURES;
  private body_measures_3 = BODY_MEASURES;
  private body_measures_multi = BODY_MEASURES;
  private sexes = SEXES;
  private agegroups = AGEGROUPS;
  private languages = LANGUAGES;
  private services = SERVICES;
  private trades_branches = TRADES_BRANCHES;
  private component_types = COMPONENT_TYPES;
  private preferred_hands = PREFERRED_HANDS;
  private visions_corrected = VISIONSCORRECTED;
  private manikin_options = PCA_MANIKIN_OPTIONS;
  private manikin_definitions = PCA_MANKIN_DEFINITIONS;
  private missing_data_handling = MISSING_DATA_HANDLING;
  private number_of_pcs_to_assess = NUMBER_OF_PCS_TO_ASSESS;

  // Chart Settings Lists
  public accomodations = ACCOMODATIONS;
  public bin_options = BIN_OPTIONS;
  public units = UNITS;
  public pcaItemsCount = 0;

  // Data Options
  public selected_dataset: string = this.datasets[0];
  public selected_number_of_pcs_to_assess: string = this.number_of_pcs_to_assess[0].value;

  // Data Options - Demographics (1)
  public selected_body_measure: string = this.body_measures[0].value;
  public selected_body_measure_2: string = this.body_measures_2[0].value;
  public selected_body_measure_3: string = this.body_measures_3[0].value;
  public selected_body_measures = [];
  public selected_sex = this.sexes[0].value; // Set Default Selected Sex to Male
  public selected_agegroups = this.agegroups;
  public selected_language = this.languages[0].value;
  public selected_services = this.services;
  public selected_trades_branches = this.trades_branches;
  public selected_components = this.component_types;
  public selected_preferred_hand = this.preferred_hands[0].value; // Set Default Selected Preferred Hands to Both
  public selected_vision_corrected = this.visions_corrected[0].value; // Set Default Selected Visions Corrected to Either
  public selected_missing_data_handling = this.missing_data_handling[0].value; // Set Default Selected Visions Corrected to Either


  //Data Options - Demographics (2)
  public selected_sex_2 = this.selected_sex;
  public selected_agegroups_2 = this.selected_agegroups;
  public selected_language_2 = this.selected_language;
  public selected_services_2 = this.selected_services;
  public selected_trades_branches_2 = this.selected_trades_branches;
  public selected_components_2 = this.selected_components;
  public selected_preferred_hand_2 = this.selected_preferred_hand; // Set Default Selected Preferred Hands to Both
  public selected_vision_corrected_2 = this.selected_vision_corrected; // Set Default Selected Visions Corrected to Either

  //Chart Settings
  public selected_unit = this.units[0]; // Set Default Selected Unit to Metric
  public selected_bins = this.bin_options[7]; // Set Default Selected Bins to 12
  public selected_accomodation = this.accomodations[10];
  public plot_second_demographics = false;
  public show_accomodation_option = false;
  public showCalculateManikinsOptions = false;
  public showEllipseOptions = false;
  public selected_manikin_definitions = [];

  // set Review Data Display Variables
  public selectedDatasetDisplay: string;
  public selectedBodyMeasureDisplay: string;
  public selectedBodyMeasuresDisplay: string;
  public selectedUnitsDisplay: string;
  // public selectedBinsDisplay: string;
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
  public selectedManikinDefinitionsDisplay: string;
  public selectedBodyMeasureDisplay2: string;
  public selectedBodyMeasureDisplay3: string;

  public buttonSubmitText = 'Generate Chart Summary';
 
  // multi-d-selection options
  public selected_manikin_options = {
    show_ellipse: false,
    manikins: false
  };

  // Data Selections
  public selectedData: any;

  // Select Menu Settings
  public multiSelectSettings = {};

  // toggle review data and loading views
  public dataSelectionView: boolean = true;
  public reviewData = false;
  public isValid = true;

  constructor() { }

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

    // Create display list of items for multiselect lists of selected options
    getPcaDisplay(object) {
      let listDisplay: string = '';
      for (let key of Object.keys(object)) {
        let item = object[key];
        if (this.pcaItemsCount==0) {
          listDisplay = item.display.trim();
        } else {
          listDisplay = listDisplay + ', ' + item.display.trim();
        }
        this.pcaItemsCount++;
      }
      return listDisplay;
    }

  getCheckedDisplay(object) {
    let checkedDisplay: string = "";
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


  // when second plot demographics option is click reset all selected items for plot 2 to equal plot 1 values
  setSecondDemographics() {
    if (this.plot_second_demographics) {
      // Data Options - Demographics (2)
      this.selected_sex_2 = this.selected_sex;
      this.selected_agegroups_2 = this.selected_agegroups;
      this.selected_language_2 = this.selected_language;
      this.selected_services_2 = this.selected_services;
      this.selected_trades_branches_2 = this.selected_trades_branches;
      this.selected_components_2 = this.selected_components;
      this.selected_preferred_hand_2 = this.selected_preferred_hand;
      this.selected_vision_corrected_2 = this.selected_vision_corrected;
    }
  }

  // update all selection data set values
  updateSelectData() {
    // Create Select Data Array with JSON Parameters of Selected Data to pass through to parent 1D Histrogram component
    this.selectedData = [
      { type: 'setting', item: 'dataset', title: "Dataset", value: this.selected_dataset, display: this.selected_dataset, plot: '0' },
      { type: 'setting', item: 'body_measure', title: "Body Measure", value: this.selected_body_measure, display: this.getItemDisplay(this.body_measures, this.selected_body_measure), plot: '0' },
      { type: 'setting', item: 'body_measure_2', title: "Body Measure 2", value: this.selected_body_measure_2, display: this.getItemDisplay(this.body_measures_2, this.selected_body_measure_2), plot: '0' },
      { type: 'setting', item: 'body_measure_3', title: "Body Measure 3", value: this.selected_body_measure_3, display: this.getItemDisplay(this.body_measures_3, this.selected_body_measure_3), plot: '0' },
      { type: 'setting', item: 'unit', title: "Unit", value: this.selected_unit, display: this.selected_unit, plot: '0' },
      { type: 'setting', item: 'bins', title: "Bins #", value: this.selected_bins, display: this.selected_bins, plot: '0' },
      { type: 'setting', item: 'accomodation', title: "Accomodation", value: this.selected_accomodation, display: this.selected_accomodation, plot: '0' },
      { type: 'setting', item: 'plot_second_demographics', title: "Plot Second Demographics", value: this.plot_second_demographics, display: this.plot_second_demographics, plot: '0' },
      { type: 'demographic', item: 'agegroups', title: "Age Groups", value: this.selected_agegroups, display: this.getListDisplay(this.selected_agegroups), plot: '1' },
      { type: 'demographic', item: 'sex', title: "Sex", value: this.selected_sex, display: this.getItemDisplay(this.sexes, this.selected_sex), plot: '1' },
      { type: 'demographic', item: 'language', title: "Language", value: this.selected_language, display: this.getItemDisplay(this.languages, this.selected_language), plot: '1' },
      { type: 'demographic', item: 'services', title: "Services", value: this.selected_services, display: this.getListDisplay(this.selected_services), plot: '1' },
      { type: 'demographic', item: 'trades_branches', title: "Trades/Branches", value: this.selected_trades_branches, display: this.getListDisplay(this.selected_trades_branches), plot: '1' },
      { type: 'demographic', item: 'components', title: "Components", value: this.selected_components, display: this.getListDisplay(this.selected_components), plot: '1' },
      { type: 'demographic', item: 'preferred_hand', title: "Preferred Hand", value: this.selected_preferred_hand, display: this.getItemDisplay(this.preferred_hands, this.selected_preferred_hand), plot: '1' },
      { type: 'demographic', item: 'vision_corrected', title: "Vision Corrected", value: this.selected_vision_corrected, display: this.getItemDisplay(this.visions_corrected, this.selected_vision_corrected), plot: '1' },
      { type: 'pcasetting', item: 'missing_data_handling', title: "Missing Data Handling", value: this.selected_missing_data_handling, display: this.getItemDisplay(this.visions_corrected, this.selected_missing_data_handling), plot: '1' },
      { type: 'pcasetting', item: 'number_of_pcs_to_assess', title: "Number Of PCs to Assess", value: this.selected_missing_data_handling, display: this.getItemDisplay(this.visions_corrected, this.selected_missing_data_handling), plot: '1' },
      { type: 'pcasetting', item: 'pcs_to_be_calculated', title: "PCs to be Calculated", value: this.selected_missing_data_handling, display: this.getItemDisplay(this.visions_corrected, this.selected_missing_data_handling), plot: '1' },
      { type: 'option', item: 'show_manikin_options', title: "Show Manikin Options", value: this.selected_manikin_options.show_ellipse, display: this.getListDisplay(this.selected_manikin_options.show_ellipse), plot: '0' },
      { type: 'option', item: 'show_manikin_options_manikins', title: "Show Manikin Options Manikins", value: this.selected_manikin_options.manikins, display: this.getListDisplay(this.selected_manikin_options.manikins), plot: '0' },
      { type: 'option', item: 'selected_manikin_definitions', title: "Selected Manikin Definitions", value: this.selected_manikin_definitions, display: this.getListDisplay(this.selected_manikin_definitions), plot: '0' },
    ];
    if (this.isPCAFromParent) {
      this.selectedData.push({ type: 'setting', item: 'selected_body_measures', title: "Body Measures", value: this.selected_body_measures, display: this.getPcaDisplay(this.selected_body_measures), plot: '0' }); // to be modified later for 2D and 3D
    }

    //if second demographics option push additional selected items for plot 2
    if (this.plot_second_demographics) {
      this.selectedData.push({ type: 'demographic', item: 'agegroups_2', title: "Age Groups 2", value: this.selected_agegroups_2, display: this.getListDisplay(this.selected_agegroups_2), plot: '2' });
      this.selectedData.push({ type: 'demographic', item: 'sex_2', title: "Sex 2", value: this.selected_sex_2, display: this.getItemDisplay(this.sexes, this.selected_sex_2), plot: '2' });
      this.selectedData.push({ type: 'demographic', item: 'language_2', title: "Language 2", value: this.selected_language_2, display: this.getItemDisplay(this.languages, this.selected_language_2), plot: '2' });
      this.selectedData.push({ type: 'demographic', item: 'services_2', title: "Services 2", value: this.selected_services_2, display: this.getListDisplay(this.selected_services_2), plot: '2' });
      this.selectedData.push({ type: 'demographic', item: 'trades_branches_2', title: "Trades/Branches 2", value: this.selected_trades_branches_2, display: this.getListDisplay(this.selected_trades_branches_2), plot: '2' });
      this.selectedData.push({ type: 'demographic', item: 'components_2', title: "Components 2", value: this.selected_components_2, display: this.getListDisplay(this.selected_components_2), plot: '2' });
      this.selectedData.push({ type: 'demographic', item: 'preferred_hand_2', title: "Preferred Hand 2", value: this.selected_preferred_hand_2, display: this.getItemDisplay(this.preferred_hands, this.selected_preferred_hand_2), plot: '2' });
      this.selectedData.push({ type: 'demographic', item: 'vision_corrected_2', title: "Vision Corrected 2", value: this.selected_vision_corrected_2, display: this.getItemDisplay(this.visions_corrected, this.selected_vision_corrected_2), plot: '2' });
    }
  }

  setReviewDataDisplaySettings() {
    this.selectedDatasetDisplay = this.selectedData.filter(selection => selection.item === 'dataset')[0].display;
    this.selectedBodyMeasureDisplay = this.selectedData.filter(selection => selection.item === 'body_measure')[0].display;
    this.selectedBodyMeasureDisplay2 = this.selectedData.filter(selection => selection.item === 'body_measure_2')[0].display;
    this.selectedBodyMeasureDisplay3 = this.selectedData.filter(selection => selection.item === 'body_measure_3')[0].display;
    if (this.isPCAFromParent) { this.selectedBodyMeasuresDisplay = this.selectedData.filter(selection => selection.item === 'selected_body_measures')[0].display; }
    this.selectedUnitsDisplay = this.selectedData.filter(selection => selection.item === 'unit')[0].display;
    // this.selectedBinsDisplay = this.selectedData.filter(selection => selection.item === 'bins')[0].display;
    this.selectedSexDisplay = this.selectedData.filter(selection => selection.item === 'sex')[0].display;
    this.selectedAgegroupsDisplay = this.selectedData.filter(selection => selection.item === 'agegroups')[0].display;
    this.selectedLanguageDisplay = this.selectedData.filter(selection => selection.item === 'language')[0].display;
    this.selectedServicesDisplay = this.selectedData.filter(selection => selection.item === 'services')[0].display;
    this.selectedTradesBranchesDisplay = this.selectedData.filter(selection => selection.item === 'trades_branches')[0].display;
    this.selectedComponentsDisplay = this.selectedData.filter(selection => selection.item === 'components')[0].display;
    this.selectedVisionCorrectedDisplay = this.selectedData.filter(selection => selection.item === 'vision_corrected')[0].display;
    this.selectedPreferredHandDisplay = this.selectedData.filter(selection => selection.item === 'preferred_hand')[0].display;
    this.selectedManikinDefinitionsDisplay = this.selectedData.filter(selection => selection.item === 'selected_manikin_definitions')[0].display;
    if (this.selectedManikinDefinitionsDisplay == "") {
      this.selectedManikinDefinitionsDisplay = "None Selected";
    }
    //if second demographics option push additional selected items for plot 2
    if (this.plot_second_demographics) {
      this.selectedSexDisplay2 = this.selectedData.filter(selection => selection.item === 'sex_2')[0].display;
      this.selectedAgegroupsDisplay2 = this.selectedData.filter(selection => selection.item === 'agegroups_2')[0].display;
      this.selectedLanguageDisplay2 = this.selectedData.filter(selection => selection.item === 'language_2')[0].display;
      this.selectedServicesDisplay2 = this.selectedData.filter(selection => selection.item === 'services_2')[0].display;
      this.selectedTradesBranchesDisplay2 = this.selectedData.filter(selection => selection.item === 'trades_branches_2')[0].display;
      this.selectedComponentsDisplay2 = this.selectedData.filter(selection => selection.item === 'components_2')[0].display;
      this.selectedPreferredHandDisplay2 = this.selectedData.filter(selection => selection.item === 'preferred_hand_2')[0].display;
      this.selectedVisionCorrectedDisplay2 = this.selectedData.filter(selection => selection.item === 'vision_corrected_2')[0].display;
    }
  }

  setSelectedDataValues(selectedData) {
    this.selected_dataset = selectedData.filter(selection => selection.item === 'dataset')[0].value;
    this.selected_body_measure = selectedData.filter(selection => selection.item === 'body_measure')[0].value;
    this.selected_body_measure_2 = selectedData.filter(selection => selection.item === 'body_measure_2')[0].value;
    this.selected_body_measure_3 = selectedData.filter(selection => selection.item === 'body_measure_3')[0].value;
    this.selected_unit = selectedData.filter(selection => selection.item === 'unit')[0].value;
    this.selected_bins = selectedData.filter(selection => selection.item === 'bins')[0].value;
    this.selected_sex = selectedData.filter(selection => selection.item === 'sex')[0].value;
    this.selected_agegroups = selectedData.filter(selection => selection.item === 'agegroups')[0].value;
    this.selected_language = selectedData.filter(selection => selection.item === 'language')[0].value;
    this.selected_services = selectedData.filter(selection => selection.item === 'services')[0].value;
    this.selected_trades_branches = selectedData.filter(selection => selection.item === 'trades_branches')[0].value;
    this.selected_components = selectedData.filter(selection => selection.item === 'components')[0].value;
    this.selected_vision_corrected = selectedData.filter(selection => selection.item === 'vision_corrected')[0].value;
    this.selected_preferred_hand = selectedData.filter(selection => selection.item === 'preferred_hand')[0].value;
    this.selected_manikin_options.show_ellipse = selectedData.filter(selection => selection.item === 'show_manikin_options')[0].value;
    this.selected_manikin_definitions = selectedData.filter(selection => selection.item === 'selected_manikin_definitions')[0].value;   
    this.selected_manikin_options.manikins = selectedData.filter(selection => selection.item === 'show_manikin_options_manikins')[0].value;
    this.selected_accomodation = selectedData.filter(selection => selection.item === 'accomodation')[0].value;
    if (this.isPCAFromParent) { this.selected_body_measures = selectedData.filter(selection => selection.item === 'selected_body_measures')[0].value }
    //if second demographics option push additional selected items for plot 2
    if (selectedData.filter(selection => selection.item === 'plot_second_demographics')[0].value == 1) {
      this.plot_second_demographics = true;
      this.selected_sex_2 = selectedData.filter(selection => selection.item === 'sex_2')[0].value;
      this.selected_agegroups_2 = selectedData.filter(selection => selection.item === 'agegroups_2')[0].value;
      this.selected_language_2 = selectedData.filter(selection => selection.item === 'language_2')[0].value;
      this.selected_services_2 = selectedData.filter(selection => selection.item === 'services_2')[0].value;
      this.selected_trades_branches_2 = selectedData.filter(selection => selection.item === 'trades_branches_2')[0].value;
      this.selected_components_2 = selectedData.filter(selection => selection.item === 'components_2')[0].value;
      this.selected_vision_corrected_2 = selectedData.filter(selection => selection.item === 'vision_corrected_2')[0].value;
      this.selected_preferred_hand_2 = selectedData.filter(selection => selection.item === 'preferred_hand_2')[0].value;
    }

    //if ellipse of manikin options are selected show accomodations option
    if (this.selected_manikin_options.show_ellipse || this.selected_manikin_options.manikins){
      this.show_accomodation_option = true;
    }

  }

  bmFilterWholeBody(body_measures) {
    return body_measures.type == 'WholeBody'
  }
  bmFilterHeadNeck(body_measures) {
    return body_measures.type == 'HeadNeck'
  }
  bmFilterSeated(body_measures) {
    return body_measures.type == 'Seated'
  }
  bmFilterTorso(body_measures) {
    return body_measures.type == 'Torso'
  }
  bmFilterHandArm(body_measures) {
    return body_measures.type == 'HandArm'
  }
  bmFilterLegFoot(body_measures) {
    return body_measures.type == 'LegFoot'
  }

  //toggle option to view selected set data
  reviewSelectData() {
    this.updateSelectData();
    this.setReviewDataDisplaySettings();
    this.reviewData = true;
  }

  onSubmit() {

    //update all selection data before sent to parent
    this.updateSelectData();

    console.log("selected_body_measures: " + JSON.stringify(this.selected_body_measures));

    //Validation Body Measures options before submit
    this.formValidationError = false;
    this.formValidationMsg = "";
    if (this.multiDSelection == true) {
      if (this.isPCAFromParent == 'true') {
        if (this.selected_body_measures.length < 2) {
          this.formValidationMsg = "Please select at least 2 body measure options.";
          this.formValidationError = true;
        } 
        if (this.selected_body_measures.length > 20){
          this.formValidationMsg = "Please select a maximum of only 20 body measure options.";
          this.formValidationError = true;
          this.selected_body_measures = [];
        }
      } else if (this.numberOfDimensionFromParent == '2') {
        if (this.selected_body_measure == this.selected_body_measure_2) {
          this.formValidationMsg = "Please select 2 different body measure options.";
          this.formValidationError = true;
        }
      } else if (this.numberOfDimensionFromParent == '3') {
        if (this.selected_body_measure == this.selected_body_measure_2 || this.selected_body_measure == this.selected_body_measure_3 || this.selected_body_measure_2 == this.selected_body_measure_3) {
          this.formValidationMsg = "Please select 3 different body measure options.";
          this.formValidationError = true;
        }
      }
    }
    if (this.selected_services.length == 0 || this.selected_services_2.length == 0) {
      this.formValidationMsg = "Please select services options.";
      this.formValidationError = true;
    } else if (this.selected_agegroups.length == 0 || this.selected_agegroups_2.length == 0) {
      this.formValidationMsg = "Please select age groups options.";
      this.formValidationError = true;
    } else if (this.selected_trades_branches.length == 0 || this.selected_trades_branches_2.length == 0) {
      this.formValidationMsg = "Please select trades/branches options.";
      this.formValidationError = true;
    } else if (this.selected_components.length == 0 || this.selected_components_2.length == 0) {
      this.formValidationMsg = "Please select components options.";
      this.formValidationError = true;
    }

    if (this.formValidationError == true) {
      console.log("Form not Validated: " + this.formValidationMsg);
      return false;
    } else {
      this.submitSelectData.emit(this.selectedData);
    }

    //change data selection view to false (to switch to loading page)
    this.dataSelectionView = false;
  }

  calculateManekins() {
    //update all selection data before sent to parent
    this.updateSelectData();
    console.log("selected_body_measures: " + JSON.stringify(this.selected_body_measures));
    //Validate multi-select options and Send Selection Data Back to Parent 1D Histogram component
    if (this.selected_services.length == 0 || this.selected_services_2.length == 0 || this.selected_agegroups.length == 0 || this.selected_agegroups_2.length == 0 || this.selected_trades_branches.length == 0 || this.selected_trades_branches_2.length == 0 || this.selected_components.length == 0 || this.selected_components_2.length == 0) {
      alert("Please select all multi-select options.")
      return false;
    } else {
      this.submitSelectData.emit(this.selectedData);
    }
    //change data selection view to false (to switch to loading page)
    this.dataSelectionView = false;
  }

  ngOnInit() {
    this.isPCACalculationCompleted = '2';

    if (this.isPCAFromParent) {
      this.buttonSubmitText = 'Calculate PCA';
    }
    if(this.isPCACalculationCompleted != undefined){
      console.log("isPCACalculationCompleted" + this.isPCACalculationCompleted );
    }
    // console.log("selected_manikin_options: " + JSON.stringify(this.selected_manikin_options));
    // multi-select default drop-down settings
    this.multiSelectSettings = {
      singleSelection: false,
      idField: 'value',
      textField: 'display',
      selectAllText: 'Select All',
      unSelectAllText: 'Unselect All',
      allowSearchFilter: false
    };

    // if selected data set exsists pass data back to selection form 
    if (this.selectedDataSet) {
      this.setSelectedDataValues(this.selectedDataSet);
    }

  }

}
