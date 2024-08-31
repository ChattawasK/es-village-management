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

  createVehicle(plateNo:any, plateProvinceId:any,village:any){
    let header = new HttpHeaders().set(
      "Authorization",
      "bearer " + this.localService.getData("authToken")!
    )
    .set(
      "Village-Identifier", village
    );

    return this.http.post<any>(`${environment.end_point_api}ResidentCar`,
      {
        plateNo:plateNo,
        plateProvinceId
      },
      {headers: header}
    );
  }

  updateVehicle(id: any, plateNo:any, plateProvinceId:any, village:any){
    let header = new HttpHeaders().set(
      "Authorization",
      "bearer " + this.localService.getData("authToken")!
    )
    .set(
      "Village-Identifier", village
    );

    return this.http.put<any>(`${environment.end_point_api}ResidentCar/`+id,
      {
        plateNo:plateNo,
        plateProvinceId
      },
      {headers: header}
    );
  }

  deleteVehicle(id:any,village:any){
    let header = new HttpHeaders().set(
      "Authorization",
      "bearer " + this.localService.getData("authToken")!
    )
    .set(
      "Village-Identifier", village
    );

    return this.http.put<any>(`${environment.end_point_api}ResidentCar/InActive/`+ id,null,
      {headers: header}
    );
  }
}
