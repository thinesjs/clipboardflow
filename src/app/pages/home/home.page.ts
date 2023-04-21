import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonicModule, ViewWillEnter } from '@ionic/angular';
import { ConfigurationsService } from 'src/app/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit, ViewWillEnter {

  @ViewChild(IonContent) content: IonContent;

  skeleton = new Array(2);
  balance: number;
  noBalance: boolean;
  hideHeader: boolean;

  constructor(
    private config: ConfigurationsService
  ) { }

  ngOnInit() {
    this.hideHeader = this.config.comingFromTabs;
  }

  ionViewWillEnter() {
    this.config.goToTopEvent.subscribe({
      next: (tabPath) => {
        if(tabPath === 'home') {
          this.content.scrollToTop(500);
        }
      }
    })
  }

}
