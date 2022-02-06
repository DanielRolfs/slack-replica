import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChatwindowComponent } from './chatwindow/chatwindow.component';
import { LoginComponent } from './login/login.component';
import { PasswordresetComponent } from './login/passwordreset/passwordreset.component';
import { RegisterComponent } from './login/register/register.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'passwordreset', component: PasswordresetComponent },
  { path: 'chatwindow', component: ChatwindowComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
