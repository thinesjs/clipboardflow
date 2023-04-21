import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonicModule, ViewWillEnter } from '@ionic/angular';
import { ConfigurationsService } from 'src/app/services';

@Component({
  selector: 'app-clipboard',
  templateUrl: './clipboard.page.html',
  styleUrls: ['./clipboard.page.scss'],
})
export class ClipboardPage implements OnInit, ViewWillEnter {

  @ViewChild(IonContent) content: IonContent;

  skeleton =  new Array(2);
  hideHeader: boolean;
  clipboardName: string;

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

  createClipboard() {
    console.log(`received ${this.clipboardName}`)
  }

}
