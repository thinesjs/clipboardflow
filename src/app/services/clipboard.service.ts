import { Injectable } from '@angular/core';
import { ConfigurationsService } from './configurations.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Observable, from, map, switchMap } from 'rxjs';
import { Clipboards } from '../interfaces/clipboards';
import { AuthService } from './auth.service';
import { Platform } from '@ionic/angular';

const ACCESS_TOKEN_KEY = 'my-access-token';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {
  
  baseUrlUser = 'https://clipboardflow.tjsserver.xyz/api/clipboard/user'; 
  token = null;

  constructor(
    private readonly platform: Platform,
    private http: HttpClient,
    private network: ConfigurationsService,
    private storage: Storage,
    private authService: AuthService,
  ) { this.loadToken(); }

  async loadToken() {
    this.token = await this.authService.getToken();
  }

  getClipboardsByUser(userid: string) :Observable<Clipboards[]> {
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    }
    return this.http.get<Clipboards[]>(`${this.baseUrlUser}/${userid}`, httpOptions);
  }

  // getClipboardsByUser(refresh: boolean): Observable<Clipboards[]> {
  //   return this.http.get<Clipboards[]>(`${this.baseUrlUser}/5`);
  // }


  getClipboardPastes()
  {

  }
}
  