import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistorComponent } from './registor/registor.component';
import { OtpComponent } from './otp/otp.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { ProfileComponent } from './profile/profile.component';
import { VisitorPreRegisterComponent } from './visitor-pre-register/visitor-pre-register.component';
import { TemporaryPreRegisterComponent } from './temporary-pre-register/temporary-pre-register.component';
import { WalkInRegisterComponent } from './walk-in-register/walk-in-register.component';
import { SummaryComponent } from './summary/summary.component';
import { ApproveRequestVehicleComponent } from './approve-request-vehicle/approve-request-vehicle.component';
import { ApproveTemporaryPreRegisterComponent } from './approve-temporary-pre-register/approve-temporary-pre-register.component';
import { NoEStampComponent } from './no-e-stamp/no-e-stamp.component';
import { MotocycleWalkInRegisterComponent } from './motocycle-walk-in-register/motocycle-walk-in-register.component';
import { EStampComponent } from './e-stamp/e-stamp.component';
import { EStampOutComponent } from './e-stamp-out/e-stamp-out.component';
import { EStampOutDetailComponent } from './e-stamp-out-detail/e-stamp-out-detail.component';
import { ContactSecurityGuardComponent } from './contact-security-guard/contact-security-guard.component';
import { ContactSecurityGuardDetailComponent } from './contact-security-guard-detail/contact-security-guard-detail.component';
import { StaffRegisterComponent } from './staff-register/staff-register.component';

const routes: Routes = [
  { path: '', component: RegistorComponent },
  { path: 'register', component: RegistorComponent },
  { path: 'register-security-guard', component: StaffRegisterComponent },
  { path: 'otp', component: OtpComponent },
  { path: 'register-success', component: RegisterSuccessComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'visitor-pre-register', component: VisitorPreRegisterComponent },
  { path: 'temporary-pre-register', component: TemporaryPreRegisterComponent },
  { path: 'walk-in-register', component: MotocycleWalkInRegisterComponent },
  { path: 'walk-in-register/:id', component: WalkInRegisterComponent },
  { path: 'e-stamp/:id', component: EStampComponent },
  { path: 'no-e-stamp/:id', component: NoEStampComponent },
  { path: 'e-stamp-out', component: EStampOutComponent },
  { path: 'e-stamp-out/:id', component: EStampOutDetailComponent },
  { path: 'summary/:id', component: SummaryComponent },
  { path: 'contact-security-guard', component: ContactSecurityGuardComponent },
  { path: 'contact-security-guard/:id', component: ContactSecurityGuardDetailComponent },
  { path: 'approve-request-add-vehicle/:id', component: ApproveRequestVehicleComponent},
  { path: 'approve-request-edit-vehicle/:id', component: ApproveRequestVehicleComponent},
  { path: 'approve-temporary-pre-register/:id', component: ApproveTemporaryPreRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
