import { Injectable } from '@angular/core';
import { environment } from './../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthenticateService {

  constructor(private http: HttpClient) { }

  verifyLiffToken(token:any): Observable<any[]> {
    return this.http.post<any[]>(`${environment.end_point_line_api}Authenticate/verify-liff-token`,{idToken: token, clientId:environment.client_id});
  }

  requestOtp(phoneNumber:any){
    return this.http.post<any[]>(`${environment.end_point_line_api}Authenticate/otp`,{phoneNumber: phoneNumber});
  }
  verifyOtp(phoneNumber:any,token:any,otp:any){
    return this.http.post<any[]>(`${environment.end_point_line_api}Authenticate/validate-otp`,{phoneNumber: phoneNumber,otpToken:token,otp:otp});
  }
}


