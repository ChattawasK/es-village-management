import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class TemporaryPreRegisterService {

  constructor(private http: HttpClient,private localService: LocalService) { }

  create(data:any,village:any): Observable<any[]> {
    let header = new HttpHeaders().set(
      "Authorization",
      "bearer " + this.localService.getData("authToken")!
    ).set(
      "Village-Identifier", village
    );

    return this.http.post<any[]>(`${environment.end_point_api}TemporaryPreRegister`,data, {headers:header});
  }

  get(id:any,village:any): Observable<any> {
    let header = new HttpHeaders().set(
      "Authorization",
      "bearer " + this.localService.getData("authToken")!
    ).set(
      "Village-Identifier", village
    );

    return this.http.get<any>(`${environment.end_point_api}TemporaryPreRegister/`+id, {headers:header});
  }

  approve(id:any,village:any){
    let header = new HttpHeaders().set(
      "Authorization",
      "bearer " + this.localService.getData("authToken")!
    )
    .set(
      "Village-Identifier", village
    );

    return this.http.put<any>(`${environment.end_point_api}TemporaryPreRegister/JuristicAppprovedByPeopleRegistrationId/`+id,
      {headers: header}
    );

  }

  reject(id:any,village:any,data:any){
    let header = new HttpHeaders().set(
      "Authorization",
      "bearer " + this.localService.getData("authToken")!
    )
    .set(
      "Village-Identifier", village
    );

    return this.http.put<any>(`${environment.end_point_api}TemporaryPreRegister/JuristicAppprovedByPeopleRegistrationId/`+id,
      data,{headers: header}
    );

  }

}
