import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit{

  public showSubNav: Boolean = true;
  public currentBaseRouterLocation: string;

  constructor(private router: Router) {

    this.router.events.subscribe(event => {
      this.setCurrentRouterLocation(this.router.url.split('/')[1]);
    });

  }

  setCurrentRouterLocation(location) {
    this.currentBaseRouterLocation = location;

    if (this.currentBaseRouterLocation == "analyze" || this.currentBaseRouterLocation == "") {
      this.setFullPageView();
    } else {
      this.setSubNavPageView();
    }
  }

  setFullPageView() {
    this.showSubNav = false;
  }

  setSubNavPageView() {
    this.showSubNav = true;
  }

  onActivate(event) {
    window.scroll(0, 0);
  }

  ngOnInit(){
    if (this.router.url.split('/')[1]=="analyze"){
      this.showSubNav = false;
      console.log("Show Sub Nav: " + this.showSubNav);
    }
  }
}
