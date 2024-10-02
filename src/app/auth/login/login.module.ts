import { NgModule } from '@angular/core';
import { LoginComponent } from './login.component';
import { ToastrModule } from 'ngx-toastr';


@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
   LoginRoutingModule
  ],
  exports:[]
})
export class LoginRoutingModule { }
