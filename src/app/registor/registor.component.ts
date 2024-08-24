import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import liff from '@line/liff';
import { AuthenticateService } from '../../services/authenticate.service';
import { environment } from './../../environments/environment';
import { LocalService } from '../../services/local.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registor',
  templateUrl: './registor.component.html',
  styleUrls: ['./registor.component.scss']
})
export class RegistorComponent implements OnInit {
  form = new FormGroup({
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.minLength(10)
    ])
  });

  title : string | null = 'angular-line-login';
  idToken : string | null = '';
  displayName : string | null = '';
  pictureUrl : string | undefined = '';
  statusMessage : string | undefined = '';
  userId : string | null = '';

  constructor(private  authenticateService: AuthenticateService,
    private localService: LocalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initLine();
  }

  initLine(): void {
    liff.init({ liffId: environment.line_apiKey }, () => {
      if (liff.isLoggedIn()) {
        this.runApp();
      } else {
        liff.login();
      }
    }, err => console.error(err));
  }

  runApp(): void {
    const idToken = liff.getIDToken();
    this.idToken = idToken;
    liff.getProfile().then(profile => {
      this.localService.saveData("lineUserId",profile.userId)
      this.localService.saveData("idToken",idToken)
      this.userId = profile.userId;
      this.authenticateService.verifyLiffToken(this.idToken).subscribe((data: any[]) => {
        console.log(data);
      });
    }).catch(err => console.error(err));
  }

  logout(): void {
    liff.logout();
    window.location.reload();
  }

  onSubmit() {
    this.authenticateService.requestOtp(this.form.controls.phoneNumber.value).subscribe((data: any) => {
      if(data.isSuccess == true){
        this.localService.saveData("phoneNumber",this.form.controls.phoneNumber.value)
        this.localService.saveData("otpToken",data.data.otpToken);
        this.router.navigate(['otp']);
      }
    });
  }

}
