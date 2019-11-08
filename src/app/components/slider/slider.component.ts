import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder } from "@angular/forms";
import { NouiFormatter } from "ng2-nouislider/src/nouislider";

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})

export class SliderComponent implements OnInit {

  //Default Slider Settings
  public disabled: boolean = false;
  public percentileIndexValue1: number = 10;
  public percentileIndexValue2: number = 10;
  public percentileSliderMin: number = 1;
  public percentileSliderMax: number = 99;
  public percentileMeasureValueSelected1: number;
  public percentileMeasureValueSelected2: number;
  public bodyMeasureTitle: string;
  public plotSecondDemographics: string;

  //Input Percentile Meaures Array and Body Measure Title from Parent 1D Histogram
  @Input() public percentileMeasureValues1;
  @Input() public percentileMeasureValues2;
  @Input() selectedDataSet: any[];

  //Update Selected Percentile Value and Body Measure when slider is finished moving
  updateSelectedPercentile1(selectedPercentile): void {
      this.percentileIndexValue1 = selectedPercentile;
      this.percentileMeasureValueSelected1 = this.percentileMeasureValues1[selectedPercentile - 1];
      this.percentileMeasureValueSelected1 = Math.round((this.percentileMeasureValueSelected1) * 100) / 100;
  }

  //Update Selected Percentile Value and Body Measure when slider is finished moving
  updateSelectedPercentile2(selectedPercentile): void {
    this.percentileIndexValue2 = selectedPercentile;
    this.percentileMeasureValueSelected2 = this.percentileMeasureValues2[selectedPercentile - 1];
    this.percentileMeasureValueSelected2 = Math.round((this.percentileMeasureValueSelected2) * 100) / 100;
  }

  //Set default value for Body Measure Value
  ngOnInit(): void {
    this.bodyMeasureTitle = this.selectedDataSet.filter(selection => selection.item === 'body_measure')[0].display;
    this.plotSecondDemographics = this.selectedDataSet.filter(selection => selection.item === 'plot_second_demographics')[0].display;
  }

}
