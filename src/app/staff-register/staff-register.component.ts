import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import liff from '@line/liff';
import { environment } from '../../environments/environment';
import { AuthenticateService } from '../../services/authenticate.service';
import { LocalService } from '../../services/local.service';

@Component({
  selector: 'app-staff-register',
  templateUrl: './staff-register.component.html',
  styleUrl: './staff-register.component.scss'
})
export class StaffRegisterComponent {
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
      this.authenticateService.verifyLiffToken(this.idToken).subscribe((data: any) => {
        if(data.data.isRegistered){
          this.localService.saveData("authToken",data.data.token);
          //this.router.navigate(['profile']);
        }
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
