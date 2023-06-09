import { Injectable } from '@angular/core';
import { NavController, Platform } from '@ionic/angular'
import { Storage } from '@ionic/storage-angular';
import { BehaviorSubject, Observable, from, of, throwError } from "rxjs";
import { map, switchMap } from "rxjs/operators";
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from "@auth0/angular-jwt";
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userInfo = new BehaviorSubject(null);
  jwtHelper = new JwtHelperService();
  checkUserObs: Observable<any>;

  constructor(
    private readonly storage: Storage,
    private readonly platform: Platform,
    private readonly http: HttpClient,
    private storageService: StorageService,
    private navCtrl: NavController,
  ) { this.loadUserInfo(); }

  loadUserInfo() {
    let readyPlatformObs = from(this.platform.ready());
    this.checkUserObs = readyPlatformObs.pipe(
      switchMap(() => {
          return from(this.getAccessToken());
      }),
      map((token) => {
        if(!token){
          return null;
        }
          var decodedUser = this.jwtHelper.decodeToken(token);
          this.userInfo.next(decodedUser);
          return true;
      }));
  }

  getAccessToken(){
    return this.storage.get("access_token");
  }

  getToken() : Promise<any>
  {
    return this.storage.get("access_token");
  }

  getUserID() : Promise<any>
  {
    return this.storage.get("user_id");
  }

  useLogin(email: string, password: string): Observable<boolean> {
    if(email && password){
      var payload={
        email:  email,
        password: password
      };
      return this.http.post("https://clipboardflow.tjsserver.xyz/api/auth/login",payload).pipe(
      map((response:any)=>{
        this.storage.set('access_token',response.access_token);
        this.storage.set('user_id',response.user.id);
        var decodedUser = this.jwtHelper.decodeToken(response.access_token);
        this.userInfo.next(decodedUser);
        // console.log(decodedUser);
        return true;
      })
      )
    }
    
    return of(false);
  }

  useRegister(username: string, email: string, password: string): Observable<boolean> {
    if(email && password){
      var payload={
        username: username,
        email:  email,
        password: password
      };
      return this.http.post("https://clipboardflow.tjsserver.xyz/api/auth/register",payload).pipe(
      map((response:any)=>{
        if (response.status.includes("success")) return true
        return false;
      })
      )
    }
    
    return of(false);
  }
}
