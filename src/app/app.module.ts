import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RegistorComponent } from './registor/registor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnlyNumber } from './directive/only-number.directive';
import { OtpComponent } from './otp/otp.component';
import { NgOtpInputModule } from 'ng-otp-input';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { ProfileComponent } from './profile/profile.component';
import { VisitorPreRegisterComponent } from './visitor-pre-register/visitor-pre-register.component';
import { TemporaryPreRegisterComponent } from './temporary-pre-register/temporary-pre-register.component';
import { WalkInRegisterComponent } from './walk-in-register/walk-in-register.component';
import { SummaryComponent } from './summary/summary.component';
import { ApproveRequestVehicleComponent } from './approve-request-vehicle/approve-request-vehicle.component';
import { RejectRequestVehicleComponent } from './modals/reject-request-vehicle/reject-request-vehicle.component';
import { ApproveTemporaryPreRegisterComponent } from './approve-temporary-pre-register/approve-temporary-pre-register.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistorComponent,
    OnlyNumber,
    OtpComponent,
      RegisterSuccessComponent,
      ProfileComponent,
      VisitorPreRegisterComponent,
      TemporaryPreRegisterComponent,
      WalkInRegisterComponent,
      SummaryComponent,
      ApproveRequestVehicleComponent,
      RejectRequestVehicleComponent,
      ApproveTemporaryPreRegisterComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgOtpInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
