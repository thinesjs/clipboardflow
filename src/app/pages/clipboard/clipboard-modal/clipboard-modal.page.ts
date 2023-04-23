import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ApiService, ComponentService, ConfigurationsService } from 'src/app/services';
import { ClipboardService } from 'src/app/services/clipboard.service';
import { Observable, finalize } from 'rxjs';
import { ClipboardPastes } from 'src/app/interfaces/clipboards';
import { Clipboard } from '@capacitor/clipboard';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-clipboard-modal',
  templateUrl: './clipboard-modal.page.html',
  styleUrls: ['./clipboard-modal.page.scss'],
})
export class ClipboardModalPage implements OnInit {

  @Input() clipboardCode: string;
  clipboardText: string;
  clipboardData$: Observable<ClipboardPastes[]>;

  userDidAddText = false;
  addingProcessing = false;
  addingSuccess = false;
  addingFailed = false;

  constructor(
    private config: ConfigurationsService,
    private clipboardService: ClipboardService,
    private apiService: ApiService,
    private component: ComponentService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
  }

  ionViewDidEnter(){
    // console.log("hey")
    this.doRefresh();
  }

  login(){}

  addToClipboard() {
    this.userDidAddText = true;
    this.addingProcessing = true;

    if(!this.clipboardText){
      this.addingProcessing = false;
      this.userDidAddText = false;
      this.component.toastMessage('Text cannot be empty!', 'danger')
    }else{
      const body = new HttpParams({ fromObject: { "text": this.clipboardText } });
      this.apiService.post<any>(`/clipboard/${this.clipboardCode}`, {
        body
      })
        .subscribe({
          next: () => {
            this.addingProcessing = false;
            this.addingSuccess = true;
  
            this.doRefresh();
            this.clipboardText = "";
  
            this.component.toastMessage(
              'Text added successfully!',
              'success'
            );
          },
          error: (err) => {
            this.addingProcessing = false;
            this.addingFailed = true;
            
  
            this.doRefresh();
  
            this.component.toastMessage(
              err.status + ': ' + err.error.error,
              'danger'
            );
          },
          complete: () => {
            setTimeout(() => {
              this.addingFailed = false;
              this.userDidAddText = false;
            }, 3000);
          }
        });
    }    
  }

  doRefresh(event?) {
    this.clipboardData$ = this.clipboardService.getClipboardPastes(this.clipboardCode).pipe(
      finalize(() => {
        if (event) {
          event.target.complete();
        }
      })
    )
  }

  async writeToClipboard(text :string) {
    await Clipboard.write({
      string: text
    }).then((value) =>{
      this.component.toastMessage(
        'Text copied to clipboard.',
        'success'
      );
    });
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }

}
