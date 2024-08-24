import { LocalService } from './local.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VillageService {

  constructor(private http: HttpClient,private localService: LocalService) { }

  getVillages(): Observable<any[]> {
    let header = new HttpHeaders().set(
      "Authorization",
      "bearer " + this.localService.getData("authToken")!
    );

    return this.http.get<any[]>(`${environment.end_point_line_api}Village`, {headers:header});
  }
}
