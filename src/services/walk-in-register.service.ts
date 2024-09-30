import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class WalkInRegisterService {

  constructor(private http: HttpClient,private localService: LocalService) { }

  create(data:any,id:any,village:any): Observable<any> {
    let header = new HttpHeaders().set(
      "Authorization",
      "bearer " + this.localService.getData("authToken")!
    ).set(
      "Village-Identifier", village
    ).set(
      "peopleRegistrationId", id
    );
    return this.http.put<any>(`${environment.end_point_api}WalkInVisitor/`+id,data, {headers:header});
  }

  motocycleWalking(data:any,village:any): Observable<any> {
    let header = new HttpHeaders().set(
      "Authorization",
      "bearer " + this.localService.getData("authToken")!
    ).set(
      "Village-Identifier", village
    );
    return this.http.post<any>(`${environment.end_point_api}WalkInVisitor`,data, {headers:header});
  }

  get(id:any,village:any){
    let header = new HttpHeaders().set(
      "Authorization",
      "bearer " + this.localService.getData("authToken")!
    ).set(
      "Village-Identifier", village
    );
    return this.http.get<any>(`${environment.end_point_api}WalkInVisitor/`+id,{headers:header});
  }

  updateImage(data:any,village:any,id:any): Observable<any[]> {
    let header = new HttpHeaders().set(
      "Authorization",
      "bearer " + this.localService.getData("authToken")!
    ).set(
      "Village-Identifier", village
    ).set(
      "peopleRegistrationId", id
    );
    return this.http.put<any[]>(`${environment.end_point_api}WalkInVisitor/image/`+id,data, {headers:header});
  }

  residentApproved(id:any,village:any){
    let header = new HttpHeaders().set(
      "Authorization",
      "bearer " + this.localService.getData("authToken")!
    ).set(
      "Village-Identifier", village
    );
    return this.http.put<any>(`${environment.end_point_api}WalkInVisitor/ResidentAppprovedByPeopleRegistrationId/`+id,null,{headers:header});
  }

  residentRejected(id:any,village:any){
    let header = new HttpHeaders().set(
      "Authorization",
      "bearer " + this.localService.getData("authToken")!
    ).set(
      "Village-Identifier", village
    );
    return this.http.put<any>(`${environment.end_point_api}WalkInVisitor/ResidentRejectedByPeopleRegistrationId/`+id,{remark:""},{headers:header});
  }

  searchDelivery(hourseName:any,village:any){
    let header = new HttpHeaders().set(
      "Authorization",
      "bearer " + this.localService.getData("authToken")!
    ).set(
      "Village-Identifier", village
    );
    return this.http.post<any[]>(`${environment.end_point_api}WalkInVisitor/DeliveryWalkIn/Search`,{hourseName:hourseName},{headers:header});
  }

}
