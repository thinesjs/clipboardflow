import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import SwiperCore, { Autoplay, Lazy, Navigation } from 'swiper';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController, ModalController, Platform } from '@ionic/angular';
import { catchError, throwError, switchMap, timeout, tap, Observable, map } from 'rxjs';

import { ComponentService, ConfigurationsService, WsApiService } from '../../services';
import { Browser } from '@capacitor/browser';
// import { ShortNews } from '../../interfaces/news';
// import { QuixCustomer, Role } from '../../interfaces';
// import { DataCollectorService } from '../../services/data-collector.service';
// import { NewsService } from '../../services/news.service';
// import { NewsDetailsModalPage } from '../news/news-details-modal/news-details-modal.page';

// SwiperCore.use([Autoplay, Lazy, Navigation]);

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string;
  password: string;
  showPassword: boolean;
  showLoginSection: boolean;
  // LOGIN BUTTON ANIMATIONS ITEMS
  userDidLogin = false;
  loginProcessLoading = false;
  userAuthenticated = false;
  userUnauthenticated = false;
  currentYear = new Date().getFullYear();
  isMobile = false;

  loginForm = {
    email:'',
    password:''
  };

  constructor(
    private platform: Platform,
    private component: ComponentService,
    private configuration: ConfigurationsService,
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit() {
    this.isMobile = this.platform.width() < 720;
  }

  login() { 
    
    this.userDidLogin = true;
    this.loginProcessLoading = true;

    if(!this.email && !this.password){
      this.loginProcessLoading = false;
      this.userDidLogin = false;
      this.component.toastMessage('You have not filled up the email and password feilds!', 'danger')
    }else if(!this.email){
      this.loginProcessLoading = false;
      this.userDidLogin = false;
      this.component.toastMessage('Please enter your email!', 'danger')
    }else if(!this.password){
      this.loginProcessLoading = false;
      this.userDidLogin = false;
      this.component.toastMessage('Please enter your password!', 'danger')
    }else{
      if (this.platform.is('capacitor') && !this.configuration.connectionStatus) {
        this.component.toastMessage('You are offline. Check internet connection!', 'danger')
      }

      // authenticate to server (tjsserver.xyz)
      this.authService.useLogin(this.email, this.password)
      .subscribe(value => {
        if(value){
          this.loginProcessLoading = false;
          this.userAuthenticated = true;

          setTimeout(() => {
            const url = this.route.snapshot.queryParams.redirect || '/';
            this.router.navigateByUrl(url, {replaceUrl: true});
          }, 300);
        }
        else{
          this.loginProcessLoading = false;
          this.userUnauthenticated = true;

          this.component.toastMessage('You have entered an invalid email or password.', 'danger');
          return throwError(() => new Error('Invalid email or password'));
        }
      },error => {
        if (error.error.msg.includes('Username or password is incorrect!') || error.error.msg.includes('Email or password is incorrect!')) {
          this.component.toastMessage('You have entered an invalid email or password.', 'danger');
          this.loginProcessLoading = false;
          this.userUnauthenticated = true;
          setTimeout(() => {
            this.userUnauthenticated = false;
            this.userDidLogin = false;
          }, 1000);
          return throwError(() => new Error('Invalid email or password'));
        }
        // console.log(error.error.msg)
      })

      
    }

    
  }

  showConfirmationMessage() { }

  async openLink(linkName: "troubleshooting") { }

}
