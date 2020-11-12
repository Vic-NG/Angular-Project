import { ServicesService } from './../../services.service';
import { Component, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.css'],
  
})
export class CadastroComponent implements OnInit {
  formRegister: FormGroup;
  check: any = [];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private service: ServicesService
  ) {}

  onSubmit() {
    console.log(this.formRegister);

    if (!this.formRegister.valid) {
      console.log('formulario invalido');
      Object.keys(this.formRegister.controls).forEach((campo) => {
        console.log(campo);
        const controle = this.formRegister.get(campo);
        controle.markAsDirty();
      })
    }

    this.service.registerService(this.formRegister.value).subscribe(
      (dados) => {
        console.log(dados);
      },
      (error: any) => console.log(error)
    );
  }

  registerCancel() {
    this.router.navigateByUrl('/login');
  }

  verificaValidTouched(campo: string) {
    return (
      !this.formRegister.get(campo).valid &&
      (this.formRegister.get(campo).touched || this.formRegister.get(campo).dirty)
    );
  }

/*   verificaEmailValido() {
    var campoEmail = this.formRegister.get('email');

    if (campoEmail.errors) {
      return campoEmail.errors['email'] && campoEmail.touched;
    }
  } */

  aplicaCssErro(campo: string) {
    return {
      'has-error': this.verificaValidTouched(campo),
      'has-feedback': this.verificaValidTouched(campo),
    };
  }
  /* 
  checkPassword() {
    if (
      this.formRegister.controls.password.value !=
      this.formRegister.controls.confirmPassword.value
    ) {
      console.log('Senha não confere.');
    }
  }
 */
  ngOnInit() {
    this.formRegister = this.formBuilder.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });

    /* if (
      this.formRegister.controls.password.value !=
      this.formRegister.controls.confirmPassword.value
    ) {
      console.log('Senha não confere.');
    }
    console.log(this.formRegister.controls.password.value, this.formRegister.controls.confirmPassword.value);
   */
  }
}
