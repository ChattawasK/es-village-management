import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class HouseService {

  constructor(private http: HttpClient,private localService: LocalService) { }

  get(village:any): Observable<any[]> {
    let header = new HttpHeaders().set(
      "Authorization",
      "bearer " + this.localService.getData("authToken")!
    ).set(
      "Village-Identifier", village
    );


    return this.http.post<any[]>(`${environment.end_point_api}House/Search`,{name:''}, {headers:header});
  }

}
