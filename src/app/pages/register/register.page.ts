import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, Platform } from '@ionic/angular';
import { throwError } from 'rxjs';
import { ComponentService, ConfigurationsService } from 'src/app/services';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  username: string;
  email: string;
  password: string;
  rpassword: string;
  showPassword: boolean;
  showLoginSection: boolean;
  // LOGIN BUTTON ANIMATIONS ITEMS
  userDidLogin = false;
  loginProcessLoading = false;
  userAuthenticated = false;
  userUnauthenticated = false;
  currentYear = new Date().getFullYear();
  isMobile = false;

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

  register() { 
    
    this.userDidLogin = true;
    this.loginProcessLoading = true;

    if(!this.username && !this.email && !this.password && !this.rpassword ){
      this.loginProcessLoading = false;
      this.userDidLogin = false;
      this.component.toastMessage('You have not filled up any of the feilds!', 'danger')
    }else if(!this.username){
      this.loginProcessLoading = false;
      this.userDidLogin = false;
      this.component.toastMessage('Please enter your username!', 'danger')
    }else if(!this.email){
      this.loginProcessLoading = false;
      this.userDidLogin = false;
      this.component.toastMessage('Please enter your email!', 'danger')
    }else if(!this.password){
      this.loginProcessLoading = false;
      this.userDidLogin = false;
      this.component.toastMessage('Please enter your password!', 'danger')
    }else if(!this.rpassword){
      this.loginProcessLoading = false;
      this.userDidLogin = false;
      this.component.toastMessage('Please enter your password again!', 'danger')
    }else if(this.password.length < 6 || this.rpassword.length < 6){
      this.loginProcessLoading = false;
      this.userDidLogin = false;
      this.component.toastMessage('Passwords require atleast 6 characters', 'danger')
    }else if(this.password != this.rpassword){
      this.loginProcessLoading = false;
      this.userDidLogin = false;
      this.component.toastMessage('Passwords don\'t match!', 'danger')
    }else{
      if (this.platform.is('capacitor') && !this.configuration.connectionStatus) {
        this.component.toastMessage('You are offline. Check internet connection!', 'danger')
      }

      // authenticate to server (tjsserver.xyz)
      this.authService.useRegister(this.username, this.email, this.password)
      .subscribe(value => {
        if(value){
          this.loginProcessLoading = false;
          this.userAuthenticated = true;

          setTimeout(() => {
            // Show the success message for 300 ms after completing the request
            const url = this.route.snapshot.queryParams.redirect || '/login';
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
        if (error.status === 409) {
          this.component.toastMessage('You are already registered! Login instead.', 'danger');
          this.loginProcessLoading = false;
          this.userUnauthenticated = true;
          setTimeout(() => {
            this.userUnauthenticated = false;
            this.userDidLogin = false;
          }, 1000);
          return throwError(() => new Error('User Exist'));
        }
      })

      
    }

    
  }

  showConfirmationMessage() { }

  async openLink(linkName: "troubleshooting") { }

}
