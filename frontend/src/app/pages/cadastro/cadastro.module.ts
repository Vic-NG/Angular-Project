import { AuthInterceptor } from './../../guard/auth.interceptor';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RegisterService } from '../../services/register.service';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CadastroRoutingModule } from './cadastro-routing.module';
import { CadastroComponent } from './cadastro.component';

@NgModule({
  declarations: [CadastroComponent],
  imports: [
    CommonModule,
    CadastroRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
  ],
  providers: [RegisterService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
})
export class CadastroModule { }
