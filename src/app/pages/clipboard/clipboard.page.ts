import { Component, OnInit, ViewChild } from '@angular/core';
import { Clipboards, MappedClipboard } from '../../interfaces/clipboards';
import { IonContent, LoadingController, ViewWillEnter } from '@ionic/angular';
import { ComponentService, ConfigurationsService, ApiService } from 'src/app/services';
import { ClipboardService } from 'src/app/services/clipboard.service';
import { Observable, finalize, map, tap } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-clipboard',
  templateUrl: './clipboard.page.html',
  styleUrls: ['./clipboard.page.scss'],
})
export class ClipboardPage implements OnInit, ViewWillEnter {

  @ViewChild(IonContent) content: IonContent;

  attendance$: Observable<MappedClipboard[]>;

  clipboard$: Observable<Clipboards[]>;
  skeleton =  new Array(4);
  hideHeader: boolean;
  clipboardName: string;
  // loading: HTMLIonLoadingElement;

  constructor(
    private config: ConfigurationsService,
    private clipboardService: ClipboardService,
    private apiService: ApiService,
    private component: ComponentService,
    private loadingCtrl: LoadingController,
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
    this.loadingCtrl.create();
    const body = new HttpParams({ fromObject: { "title": this.clipboardName } });
    this.apiService.post<any>('/clipboard', {
      body
    })
      .subscribe({
        next: () => {
          this.loadingCtrl.dismiss();
          this.doRefresh();
          this.component.toastMessage(
            'Clipboard created successfully!',
            'success'
          );
        },
        error: (err) => {
          this.component.toastMessage(
            err.status + ': ' + err.error.error,
            'danger'
          );
        },
        complete: () => {
          this.loadingCtrl.dismiss();
        }
      });
  }

  doRefresh(event?) {
    this.clipboard$ = this.clipboardService.getClipboardsByUser(),finalize(() => {
      if (event) {
        event.target.complete();
      }
    })
  }

  // async attendanceDetails(module: Attendance, intakeCode: string) {
  //   const modal = await this.modalCtrl.create({
  //     component: AttendanceDetailsModalPage,
  //     componentProps: {
  //       module,
  //       intake: intakeCode
  //     },
  //     breakpoints: [0, 1],
  //     initialBreakpoint: 1
  //   });
  //   await modal.present();
  // }

}
