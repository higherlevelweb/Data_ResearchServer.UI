import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { OverviewComponent } from './pages/overview/overview.component';
import { HomeComponent } from './pages/home/home.component';
import { InformationComponent } from './pages/overview/information/information.component';
import { AnalyzeComponent } from './pages/analyze/analyze.component';
import { UserDataComponent } from './pages/analyze/user-data/user-data.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ChartComponent } from './components/chart/chart.component';
 
const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'overview', component: OverviewComponent },
  { path: 'overview/information', component: InformationComponent },
  { path: 'data', component: AnalyzeComponent },
  { path: 'data/analytics', component: UserDataComponent },
  { path: 'component/chart', component: ChartComponent }
];
 
@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
