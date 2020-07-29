import { FormDebugComponent } from './form-debug/form-debug.component';
import { CampoControlErroComponent } from './campo-control-erro/campo-control-erro.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';



@NgModule({
  declarations: [
    CampoControlErroComponent,
    FormDebugComponent,

  ],
  imports: [CommonModule],
  exports: [CampoControlErroComponent, FormDebugComponent],
})
export class SharedModule { }
