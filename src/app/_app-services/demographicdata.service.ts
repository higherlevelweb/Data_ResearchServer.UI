import { Injectable } from '@angular/core';
// import { Http } from '@angular/http';
// import * as  adal from 'adal-angular/lib/adal.js';
import { HttpClient, HttpHeaders, HttpResponse, HttpClientModule } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

// import {Headers, Response } from '@angular/http';
import 'rxjs/add/operator/map'; /* use to map the reponse from http into json */

 import {
  BASE_SOURCE_DEMOGRAPHICDATA,
  Endpoint,
  apiUrl
} from '../../_config/links-config';


@Injectable({
  providedIn: 'root'
})
export class DemographicdataService {

  constructor(public http: HttpClient) {
   console.log('Demographic data services connected...');
  }

/*   constructor(private http: Http) {
    let obj;
    this.getCFASLocalData().subscribe(data => obj = data, error => console.log(error));
  }
 */

   getCFASLocalData() {
    const apiUrlCFAS = './assets/data/CFAS2012_all.json';
    return this.http.get(apiUrlCFAS)
    .map(response => response );
 }

 CalculateManikin2() {
  const apiUrlCFAS = BASE_SOURCE_DEMOGRAPHICDATA + 'GetByGender/2';
    // const apiUrlCFAS = 'http://localhost:5001/api/v1/cfas/CalculateManikins/F';
    return this.http.get(apiUrlCFAS)
   .map(res => res); /* use rxjs to map the reponse from http into json */
 }

 CalculateManikinsByGender(gender: number) {
  const url = BASE_SOURCE_DEMOGRAPHICDATA + 'CalculateManikins/' + gender;
   return this.http.get(url)
      .map(response => response);
}

 GetAndCalculatePCAParam(filterInput: String) {
    console.log(filterInput);
  const url = BASE_SOURCE_DEMOGRAPHICDATA + 'GetAndCalculatePCAParam/' + filterInput;
   return this.http.get(url)
      .map(response => response);
}


CalculateManikinsWithFilter(filterInput: String) {
  console.log(filterInput);
const url = BASE_SOURCE_DEMOGRAPHICDATA + 'CalculateManikinsWithFilter/' + filterInput;
 return this.http.get(url)
    .map(response => response);
}

GetFilteredHistogramParam(filterInput: String) {

  console.log(filterInput);
const url = BASE_SOURCE_DEMOGRAPHICDATA + 'GetFilteredHistogramParam/' + filterInput;
 return this.http.get(url)
    .map(response => response);
}


////  -------------  LIST -----------------  ///////

GetCFASBodyMeasureByType(bodytype: String) {
const url = BASE_SOURCE_DEMOGRAPHICDATA + 'GetCFASBodyMeasureByType/' + bodytype;
 return this.http.get(url)
    .map(response => response);
}

GetMOS() {
const url = BASE_SOURCE_DEMOGRAPHICDATA + 'GetMOS/';
 return this.http.get(url)
    .map(response => response);
}

}
