import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { IonTabs, IonContent, Platform, ModalController } from '@ionic/angular';
import { TabItem } from './tab-item';
import { TabItems } from '../../constants';
import { ComponentService } from 'src/app/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})
export class TabsPage implements OnInit {

  tabItems: TabItem[];
  activateTab: string;
  @ViewChild(IonTabs) tabs: IonTabs;
  smallScreen: boolean;
  logo: string;
  theme$: Observable<string>;

  constructor(
    private component: ComponentService
  ) { }

  ngOnInit() {
    this.checkLogoType();

    this.tabItems = TabItems;

    this.onResize();
    
  }

  onChange() {
    this.activateTab = this.tabs.getSelected();
  }
  
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.smallScreen = window.innerWidth <= 720;
  }

  checkLogoType(){
    const autoDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (autoDark) {
      // Change to white text logo
      this.logo = 'assets/icon/logo-universal.png';
    } else {
      //Change to black text logo
      this.logo = 'assets/icon/logo-universal.png';
    }
  }

}
