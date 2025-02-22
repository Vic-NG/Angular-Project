import { Router } from '@angular/router';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { LoginService } from '../../services/login-service.service';

import { faDoorOpen } from '@fortawesome/free-solid-svg-icons';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'], 
  encapsulation: ViewEncapsulation.None
 
})
export class LoginComponent implements OnInit {
  
  login: FormGroup;
  faDoorOpen = faDoorOpen;
  
  constructor(
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    private router: Router,
    private service: LoginService
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
      return;
    } 

    this.service.loginApplication(this.login.value).subscribe(
      (dados:any) => {
        if (!dados?.token) return;
        localStorage.setItem('token', dados.token);
        localStorage.setItem('user',JSON.stringify(dados.user));
        this.router.navigateByUrl('/home');
        console.log(dados);
      },
      (error: any) =>  this.toastr.error(error.error.message)
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
    localStorage.clear();
    this.login = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }
}
