import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LocalService } from './local.service';
import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class VehicleService {

  constructor(private http: HttpClient,private localService: LocalService) { }

  getVehicles(village:any){
    let header = new HttpHeaders().set(
      "Authorization",
      "bearer " + this.localService.getData("authToken")!
    )
    .set(
      "Village-Identifier", village
    );

    return this.http.get<any>(`${environment.end_point_api}ResidentCar/GetAllByCurrentUser`,
      {headers: header}
    );
  }
}
