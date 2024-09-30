import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
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
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { VehicleModalComponent } from './modals/vehicle-modal/vehicle-modal.component';
import { NgbDateCustomParserFormatter } from './date-formate/date-custom-parser-formatter.service';
import { NoEStampComponent } from './no-e-stamp/no-e-stamp.component';
import { PhoneNumberDirective } from './directive/phone-number.directive';

// Import locale data
import localeTh from '@angular/common/locales/th';
import { registerLocaleData } from '@angular/common';
import { MotocycleWalkInRegisterComponent } from './motocycle-walk-in-register/motocycle-walk-in-register.component';
import { EStampComponent } from './e-stamp/e-stamp.component';
import { EStampOutComponent } from './e-stamp-out/e-stamp-out.component';
import { EStampOutDetailComponent } from './e-stamp-out-detail/e-stamp-out-detail.component';
import { ContactSecurityGuardComponent } from './contact-security-guard/contact-security-guard.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingInterceptor } from './Interceptor/loading-interceptor.service';
import { LoadingComponent } from './loading/loading.component';
import { ContactSecurityGuardDetailComponent } from './contact-security-guard-detail/contact-security-guard-detail.component';

// Register the locale data
registerLocaleData(localeTh);

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
    ApproveTemporaryPreRegisterComponent,
    VehicleModalComponent,
    NoEStampComponent,
    PhoneNumberDirective,
    MotocycleWalkInRegisterComponent,
    EStampComponent,
    EStampOutComponent,
    EStampOutDetailComponent,
    ContactSecurityGuardComponent,
    LoadingComponent,
      ContactSecurityGuardDetailComponent
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgOtpInputModule,
    HttpClientModule,
    BrowserAnimationsModule,
  ],
  providers: [
    { provide: NgbDateParserFormatter, useClass: NgbDateCustomParserFormatter },
    { provide: HTTP_INTERCEPTORS, useClass: LoadingInterceptor, multi: true }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
