import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonicModule } from '@ionic/angular';
import { ConfigurationsService } from 'src/app/services';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

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
