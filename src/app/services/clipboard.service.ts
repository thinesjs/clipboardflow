import { Injectable } from '@angular/core';
import { ConfigurationsService } from './configurations.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { Observable, from, map, switchMap } from 'rxjs';
import { AddClipboard, Clipboards } from '../interfaces/clipboards';
import { AuthService } from './auth.service';
import { Platform } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ClipboardService {
  
  baseUrlByUser = 'https://clipboardflow.tjsserver.xyz/api/clipboard/user'; 
  baseUrlAddClipboard = 'https://clipboardflow.tjsserver.xyz/api/clipboard/' //post payload - title
  baseUrlAddPaste = 'https://clipboardflow.tjsserver.xyz/api/clipboard/{id}' //post payload  - text

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

  addClipboard(title: string) :Observable<AddClipboard> {
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    }
    const params = {
      'title': `${title}`,
    };
    return this.http.post<AddClipboard>(`${this.baseUrlAddClipboard}`, httpOptions);
  }

  getClipboardsByUser() :Observable<Clipboards[]> {
    const httpOptions = {
      headers: {
        'Authorization': `Bearer ${this.token}`
      }
    }
    return this.http.get<Clipboards[]>(`${this.baseUrlByUser}/${this.userid}`, httpOptions);
  }

  getClipboardPastes()
  {

  }
}
  