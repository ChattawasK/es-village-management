import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class VisitorPreRegisterService {

  constructor(private http: HttpClient,private localService: LocalService) { }

  create(data:any,village:any): Observable<any[]> {
    let header = new HttpHeaders().set(
      "Authorization",
      "bearer " + this.localService.getData("authToken")!
    ).set(
      "Village-Identifier", village
    );

    return this.http.post<any[]>(`${environment.end_point_api}VisitorPreRegister`,data, {headers:header});
  }

}
