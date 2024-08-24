import { LocalService } from './../../services/local.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthenticateService } from '../../services/authenticate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss']
})
export class OtpComponent implements OnInit {

  otp: string | undefined | null;
  showOtpComponent = true;

  intervalId: any;
  timeLeft: number = 60; // Set the countdown time in seconds

  config = {
    allowNumbersOnly: true,
    length: 6,
    isPasswordInput: true,
    disableAutoFocus: false,
    placeholder: '',
    inputClass: 'otp-input-2'
  };

  @ViewChild('ngOtpInput', { static: false}) ngOtpInput: any;

  constructor(private authenticateService:AuthenticateService,
    private localService: LocalService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.startCountdown();
  }

  ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  startCountdown() {
    this.intervalId = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        clearInterval(this.intervalId);
        this.onCountdownEnd();
      }
    }, 1000);
  }

  onCountdownEnd() {
    // Handle the end of the countdown
    console.log('Countdown finished');
  }


  onOtpChange(otp: string | undefined) {
    this.otp = otp;
  }

  setVal(val: any) {
    this.ngOtpInput.setValue(val);
  }

  toggleDisable(){
    if(this.ngOtpInput.otpForm){
      if(this.ngOtpInput.otpForm.disabled){
        this.ngOtpInput.otpForm.enable();
      }else{
        this.ngOtpInput.otpForm.disable();
      }
    }
  }

  onConfigChange() {
    this.showOtpComponent = false;
    this.otp = null;
    setTimeout(() => {
      this.showOtpComponent = true;
    }, 0);
  }

  validateOtp(){
    this.authenticateService.verifyOtp(
      this.localService.getData("phoneNumber"),
      this.localService.getData("otpToken"),
      this.otp).subscribe((data: any) => {
        if(data.isSuccess){
          this.router.navigate(['register-success']);
          this.localService.saveData("authToken",data.data.authToken);
        }
      });
  }

}
