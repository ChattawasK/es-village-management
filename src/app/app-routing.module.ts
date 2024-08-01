import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistorComponent } from './registor/registor.component';
import { OtpComponent } from './otp/otp.component';
import { RegisterSuccessComponent } from './register-success/register-success.component';
import { ProfileComponent } from './profile/profile.component';
import { VisitorPreRegisterComponent } from './visitor-pre-register/visitor-pre-register.component';

const routes: Routes = [
  { path: '', component: RegistorComponent },
  { path: 'register', component: RegistorComponent },
  { path: 'otp', component: OtpComponent },
  { path: 'register-success', component: RegisterSuccessComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'visitor-pre-register', component: VisitorPreRegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
