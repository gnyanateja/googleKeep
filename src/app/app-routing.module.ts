import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { Registerpart2Component } from './registerpart2/registerpart2.component';
import { InboxComponent } from './inbox/inbox.component';
import { ForgotOtpComponent } from './forgot-otp/forgot-otp.component';

const routes: Routes = [
  { path:  'login', component:  LoginComponent},
  { path:  'register', component:  RegisterComponent},
  { path:  'otp', component:  Registerpart2Component},
  { path:  'inbox', component:  InboxComponent},
  { path:  'forgot', component: ForgotOtpComponent},
  {path : '', redirectTo: 'login', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
