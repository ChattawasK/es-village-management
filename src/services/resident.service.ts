import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class ResidentService {

  constructor(private http: HttpClient,private localService: LocalService) { }

  getResident(village:any){
    let header = new HttpHeaders().set(
      "Authorization",
      "bearer " + this.localService.getData("authToken")!
    )
    .set(
      "Village-Identifier", village
    );

    return this.http.get<any>(`${environment.end_point_api}Resident/GetProfile`,
      {headers: header}
    );

  }


}
