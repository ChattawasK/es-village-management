import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class ResidentCarService {

  constructor(private http: HttpClient,private localService: LocalService) { }

  getResidentCar(id:any,village:any){
    let header = new HttpHeaders().set(
      "Authorization",
      "bearer " + this.localService.getData("authToken")!
    )
    .set(
      "Village-Identifier", village
    );

    return this.http.get<any>(`${environment.end_point_api}ResidentCar/`+id,
      {headers: header}
    );

  }

  approve(id:any,village:any){
    let header = new HttpHeaders().set(
      "Authorization",
      "bearer " + this.localService.getData("authToken")!
    )
    .set(
      "Village-Identifier", village
    );

    return this.http.get<any>(`${environment.end_point_api}ResidentCar/Approve/`+id,
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

    return this.http.put<any>(`${environment.end_point_api}ResidentCar/reject/`+id,
      data,{headers: header}
    );

  }

}
