import { Component, OnInit, ViewChild } from '@angular/core';
import { Clipboards, MappedClipboard } from '../../interfaces/clipboards';
import { IonContent, ViewWillEnter } from '@ionic/angular';
import { ConfigurationsService } from 'src/app/services';
import { ClipboardService } from 'src/app/services/clipboard.service';
import { Observable, finalize, map, tap } from 'rxjs';

@Component({
  selector: 'app-clipboard',
  templateUrl: './clipboard.page.html',
  styleUrls: ['./clipboard.page.scss'],
})
export class ClipboardPage implements OnInit, ViewWillEnter {

  @ViewChild(IonContent) content: IonContent;

  attendance$: Observable<MappedClipboard[]>;

  clipboard$: Observable<Clipboards[]>;
  skeleton =  new Array(2);
  hideHeader: boolean;
  clipboardName: string;

  constructor(
    private config: ConfigurationsService,
    private clipboardService: ClipboardService
  ) { }

  ngOnInit() {
    // this.doRefresh();
    this.hideHeader = this.config.comingFromTabs;
  }

  ionViewWillEnter() {
    this.config.goToTopEvent.subscribe({
      next: (tabPath) => {
        if (tabPath === 'clipboards') {
          this.content.scrollToTop(500);
        }
      }
    });
  }

  ionViewDidEnter(){
    this.doRefresh();
  }

  createClipboard() {
    console.log(`received ${this.clipboardName}`)
  }

  doRefresh(event?) {
    this.clipboard$ = this.clipboardService.getClipboardsByUser('4'),finalize(() => {
      if (event) {
        event.target.complete();
      }
    })
  }

}
