import { LoginServiceService } from './../../login-service.service'
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import {FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  login: FormGroup;
  check: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private service: LoginServiceService
  ) {}

  onSubmit() {
    console.log(this.login);

    if (!this.login.valid) {
      console.log('formulario invalido');
      Object.keys(this.login.controls).forEach((campo) => {
        console.log(campo);
        const controle = this.login.get(campo);
        controle.markAsDirty();
      })
    }

    this.service.loginApplication(this.login.value).subscribe(
      (dados) => {
        console.log(dados);
      },
      (error: any) => console.log(error)
    );
  }

  verificaValidTouched(campo: string) {
    return (
      !this.login.get(campo).valid &&
      (this.login.get(campo).touched || this.login.get(campo).dirty)
    );
  }

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo),
    };
  }

  ngOnInit() {
    this.login = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

}
