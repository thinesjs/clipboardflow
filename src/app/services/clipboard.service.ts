import { Injectable } from '@angular/core';
import { ConfigurationsService } from './configurations.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Observable, from, map, switchMap } from 'rxjs';
import { AddClipboard, ClipboardPastes, Clipboards } from '../interfaces/clipboards';
import { AuthService } from './auth.service';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {
  
  baseUrlByUser = 'https://clipboardflow.tjsserver.xyz/api/clipboard/user'; 
  baseUrlGetClipboard = 'https://clipboardflow.tjsserver.xyz/api/clipboard';

  token = null;
  userid = null;

  constructor(
    private readonly platform: Platform,
    private http: HttpClient,
    private network: ConfigurationsService,
    private storage: Storage,
    private authService: AuthService,
  ) { this.loadTokens(); }

  async loadTokens() {
    this.token = await this.authService.getToken();
    this.userid = await this.authService.getUserID();
  }

  getClipboardsByUser() :Observable<Clipboards[]> {
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    }
    return this.http.get<Clipboards[]>(`${this.baseUrlByUser}/${this.userid}`, httpOptions);
  }

  getClipboardPastes(clipboardId :string):Observable<ClipboardPastes[]> {
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    }
    return this.http.get<ClipboardPastes[]>(`${this.baseUrlGetClipboard}/${clipboardId}`, httpOptions);
  }
}
  