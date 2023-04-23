import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ModalController } from '@ionic/angular';
import { ApiService, ComponentService, ConfigurationsService } from 'src/app/services';
import { ClipboardService } from 'src/app/services/clipboard.service';
import { Observable, finalize } from 'rxjs';
import { ClipboardPastes } from 'src/app/interfaces/clipboards';
import { Clipboard } from '@capacitor/clipboard';

@Component({
  selector: 'app-clipboard-modal',
  templateUrl: './clipboard-modal.page.html',
  styleUrls: ['./clipboard-modal.page.scss'],
})
export class ClipboardModalPage implements OnInit {

  @Input() clipboardCode: string;
  clipboardData$: Observable<ClipboardPastes[]>;

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
