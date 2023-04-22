import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, LoadingController, NavController, Platform } from '@ionic/angular';
import { StorageService } from 'src/app/services/storage.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.page.html',
  styleUrls: ['./logout.page.scss'],
})
export class LogoutPage implements OnInit {

  constructor(
    private navCtrl: NavController,
    private loadingCtrl: LoadingController,
    private storage: Storage,
    private plt: Platform,
    private storageService: StorageService
  ) { }

  async ngOnInit() {
    const loading = await this.loadingCtrl.create({
      message: 'Logging out...'
    });
    await loading.present();

    if (this.plt.is('capacitor')) {
      this.storage.clear();
      this.navCtrl.navigateRoot('/login', { replaceUrl: true });
    } else {
      this.storage.clear();
      this.navCtrl.navigateRoot('/login', { replaceUrl: true });
    }
    // Dismiss all loading
    loading.dismiss();
  }
}
