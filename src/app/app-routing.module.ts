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

const routes: Routes = [
  { path: '', component: RegistorComponent },
  { path: 'register', component: RegistorComponent },
  { path: 'otp', component: OtpComponent },
  { path: 'register-success', component: RegisterSuccessComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'visitor-pre-register', component: VisitorPreRegisterComponent },
  { path: 'temporary-pre-register', component: TemporaryPreRegisterComponent },
  { path: 'walk-in-register', component: WalkInRegisterComponent },
  { path: 'summary', component: SummaryComponent },
  { path: 'approve-request-vehicle', component: ApproveRequestVehicleComponent},
  { path: 'approve-temporary-pre-register', component: ApproveTemporaryPreRegisterComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
