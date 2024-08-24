import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LocalService } from './local.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient,private localService: LocalService) { }

  register(phoneNumber:any,otpToken:any,lineUid:any,villageShortName:any): Observable<any[]> {
    let header = new HttpHeaders().set(
      "Authorization",
      "bearer " + this.localService.getData("authToken")!
    );

    return this.http.post<any[]>(`${environment.end_point_line_api}Customers/register`,
      {
        phoneNumber: phoneNumber,
        otpToken: otpToken,
        lineUid: lineUid,
        villageShortName: villageShortName
      },
      {headers: header}
    );
  }
}
