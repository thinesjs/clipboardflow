import { Component, OnInit, ViewChild } from '@angular/core';
import { Clipboards, MappedClipboard } from '../../interfaces/clipboards';
import { IonContent, ModalController, ViewWillEnter } from '@ionic/angular';
import { ComponentService, ConfigurationsService, ApiService } from 'src/app/services';
import { ClipboardService } from 'src/app/services/clipboard.service';
import { Observable, finalize, map, tap } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import { ClipboardModalPage } from './clipboard-modal/clipboard-modal.page';
// import { AttendanceDetailsModalPage } from './attendance-details-modal/attendance-details-modal.page';

@Component({
  selector: 'app-clipboard',
  templateUrl: './clipboard.page.html',
  styleUrls: ['./clipboard.page.scss'],
})
export class ClipboardPage implements OnInit, ViewWillEnter {

  @ViewChild(IonContent) content: IonContent;

  clipboard$: Observable<Clipboards[]>;
  skeleton =  new Array(4);
  hideHeader: boolean;
  clipboardName: string;

  userDidCreate = false;
  creationProcessLoading = false;
  createSuccess = false;
  createFail = false;

  constructor(
    private config: ConfigurationsService,
    private clipboardService: ClipboardService,
    private apiService: ApiService,
    private component: ComponentService,
    private modalCtrl: ModalController
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
    this.userDidCreate = true;
    this.creationProcessLoading = true;

    if(!this.clipboardName){
      this.creationProcessLoading = false;
      this.userDidCreate = false;
      this.component.toastMessage('Label cannot be empty!', 'danger')
    }else{
      const body = new HttpParams({ fromObject: { "title": this.clipboardName } });
      this.apiService.post<any>('/clipboard', {
        body
      })
        .subscribe({
          next: () => {
            this.creationProcessLoading = false;
            this.createSuccess = true;
  
            this.doRefresh();
            this.clipboardName = "";
  
            this.component.toastMessage(
              'Clipboard created successfully!',
              'success'
            );
          },
          error: (err) => {
            this.creationProcessLoading = false;
            this.createFail = true;
            
  
            this.doRefresh();
  
            this.component.toastMessage(
              err.status + ': ' + err.error.error,
              'danger'
            );
          },
          complete: () => {
            setTimeout(() => {
              this.createFail = false;
              this.userDidCreate = false;
            }, 3000);
          }
        });
    }    
  }

  doRefresh(event?) {
    this.clipboard$ = this.clipboardService.getClipboardsByUser().pipe(
      finalize(() => {
        if (event) {
          event.target.complete();
        }
      })
    )
  }

  async openClipboard(clipboardCode: string) {
    const modal = await this.modalCtrl.create({
      component: ClipboardModalPage,
      componentProps: {
        clipboardCode
      },
      breakpoints: [0, 1],
      initialBreakpoint: 1
    });
    await modal.present();
  }

}
