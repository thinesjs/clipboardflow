import { Component, EnvironmentInjector, inject } from '@angular/core';
import { AlertButton, NavController, Platform } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Network } from '@capacitor/network';
import { Capacitor } from '@capacitor/core';
import { VersionValidator } from './interfaces';
import { ConfigurationsService, ComponentService, WsApiService } from './services';
import { NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  // standalone: true,
  // imports: [IonicModule, CommonModule],
})
export class AppComponent {

  constructor(
    private plt: Platform,
    private ws: WsApiService,
    private config: ConfigurationsService,
    private component: ComponentService,
  ) {

    // if (environment.production) {
    //   window.console.log = () => { };
    // }

    this.plt.ready().then(() => {
      this.checkForUpdate();
    });
  }

    async checkForUpdate() {
      // this.showWelcomeAlert("doing");
      const networkConnection = await Network.getStatus();

      if (!networkConnection.connected) return;

      this.ws.get<VersionValidator>('/apspace_mandatory_update.json', { url: 'https://d370klgwtx3ftb.cloudfront.net', auth: false })
        .subscribe(res => {
          let navigationExtras: NavigationExtras;
          const currentAppVersion = this.config.appVersion;
          const currentAppPlatform = Capacitor.getPlatform();

          if (res.maintenanceMode) { 
            // maintenance mode is on
            // navigationExtras = {
            //   state: { forceUpdate: false }
            // };
            // this.navCtrl.navigateRoot(['/maintenance-and-update'], navigationExtras);
          } else { 
            // maintenance mode is off
            navigationExtras = {
              state: { forceUpdate: true, storeUrl: '' }
            };
            if (currentAppPlatform === 'android') {
              if (res.android.minimum > currentAppVersion) { 
                // force update
                // navigationExtras.state.storeUrl = res.android.url;
                // this.navCtrl.navigateRoot(['/maintenance-and-update'], navigationExtras);
              } else if (res.android.latest > currentAppVersion) { 
                // optional update
                this.showUpdateAlert(res.android.url);
              }
            } else if (currentAppPlatform === 'ios') {
              if (res.ios.minimum > currentAppVersion) { 
                // force update
                // navigationExtras.state.storeUrl = res.ios.url;
                // this.navCtrl.navigateRoot(['/maintenance-and-update'], navigationExtras);
              } else if (res.ios.latest > currentAppVersion) { 
                // optional update
                this.showUpdateAlert(res.ios.url);
              }
            }
          }
        });
    }

    showUpdateAlert(url: string) {
      const btn: AlertButton = {
        text: 'Update',
        cssClass: 'success',
        handler: () => {
          this.component.openLink(url);
        }
      }
      this.component.alertMessage('Update Available', 'A new version of ClipboardFlow is available. Updating the app will ensure you get the latest features.', 'success', '', btn);
    }

    showWelcomeAlert(url: string) {
      const btn: AlertButton = {
        text: 'Update',
        cssClass: 'success',
        handler: () => {
          this.component.openLink(url);
        }
      }
      this.component.alertMessage('Hey!', 'This is working!.', 'success', '', btn);
    }
  }

