import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterItemsPipe } from './shared/filter-items.pipe';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';


import { ChartsModule } from 'ng2-charts';
import { NouisliderModule } from 'ng2-nouislider';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

//Layout Components
import { SiteHeaderComponent } from './layout/site-header/site-header.component';
import { SiteNavComponent } from './layout/site-nav/site-nav.component';
import { SiteSubNavComponent } from './layout/site-sub-nav/site-sub-nav.component';
import { SiteSubNavAnalyzeComponent } from './layout/site-sub-nav-analyze/site-sub-nav-analyze.component';
import { SiteFooterComponent } from './layout/site-footer/site-footer.component';
import { PageComponent } from './layout/page/page.component';

//Page Components
import { HomeComponent } from './pages/home/home.component';
import { AnalyzeComponent } from './pages/analyze/analyze.component';
import { OverviewComponent } from './pages/overview/overview.component';
import { InformationComponent } from './pages/overview/information/information.component';
import { UserDataComponent } from './pages/analyze/user-data/user-data.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ChartComponent } from './components/chart/chart.component';
import { SliderComponent } from './components/slider/slider.component';
import { OneDSelectDataComponent } from './forms/one-d-select-data/one-d-select-data.component';
import { DataSelectApiComponent } from './components/data-select-api/data-select-api.component';
import { MultiDSelectDataComponent } from './forms/multi-d-select-data/multi-d-select-data.component';
import { MultiDDataSelectApiComponent } from './components/multi-d-data-select-api/multi-d-data-select-api.component';

// AoT requires an exported function for factories
export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    SiteHeaderComponent,
    SiteNavComponent,
    SiteSubNavComponent,
    SiteSubNavAnalyzeComponent,
    SiteFooterComponent,
    PageComponent,
    HomeComponent,
    AnalyzeComponent,
    OverviewComponent,
    InformationComponent,
    UserDataComponent,
    ChartComponent,
    SliderComponent,
    OneDSelectDataComponent,
    DataSelectApiComponent,
    MultiDSelectDataComponent,
    FilterItemsPipe,
    MultiDDataSelectApiComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ChartsModule,
    NouisliderModule,
    NgMultiSelectDropDownModule.forRoot(),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
