import { LocalService } from './local.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProvinceService {

  constructor(private http: HttpClient, private localService: LocalService) {}

  getProvinces(){
    let header = new HttpHeaders().set(
      "Authorization",
      "bearer " + this.localService.getData("authToken")!
    )
    .set(
      "Village-Identifier", this.localService.getData('villageShortName')!
    );

    return this.http.get<any>(`${environment.end_point_api}Province`,
      {headers: header}
    );
  }

}
