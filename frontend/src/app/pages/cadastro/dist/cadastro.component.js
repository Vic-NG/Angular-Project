"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CadastroComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var CadastroComponent = /** @class */ (function () {
    function CadastroComponent(formBuilder, router, service) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.service = service;
        this.check = [];
    }
    CadastroComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.formRegister);
        if (!this.formRegister.valid) {
            console.log('formulario invalido');
            Object.keys(this.formRegister.controls).forEach(function (campo) {
                console.log(campo);
                var controle = _this.formRegister.get(campo);
                controle.markAsDirty();
            });
            return;
        }
        this.service.registerService(this.formRegister.value).subscribe(function (dados) {
            _this.router.navigateByUrl('/login');
            console.log(dados);
        }, function (error) {
            return alert(error.error.error);
        });
    };
    CadastroComponent.prototype.registerCancel = function () {
        this.router.navigateByUrl('/login');
    };
    CadastroComponent.prototype.verificaValidTouched = function (campo) {
        return (!this.formRegister.get(campo).valid &&
            (this.formRegister.get(campo).touched || this.formRegister.get(campo).dirty));
    };
    /*   verificaEmailValido() {
        var campoEmail = this.formRegister.get('email');
    
        if (campoEmail.errors) {
          return campoEmail.errors['email'] && campoEmail.touched;
        }
      } */
    CadastroComponent.prototype.aplicaCssErro = function (campo) {
        return {
            'has-error': this.verificaValidTouched(campo),
            'has-feedback': this.verificaValidTouched(campo)
        };
    };
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
    CadastroComponent.prototype.ngOnInit = function () {
        this.formRegister = this.formBuilder.group({
            name: [null, [forms_1.Validators.required]],
            email: [null, [forms_1.Validators.required, forms_1.Validators.email]],
            password: [null, [forms_1.Validators.required]]
        });
        /* if (
          this.formRegister.controls.password.value !=
          this.formRegister.controls.confirmPassword.value
        ) {
          console.log('Senha não confere.');
        }
        console.log(this.formRegister.controls.password.value, this.formRegister.controls.confirmPassword.value);
       */
    };
    CadastroComponent = __decorate([
        core_1.Component({
            selector: 'app-cadastro',
            templateUrl: './cadastro.component.html',
            styleUrls: ['./cadastro.component.css'],
            encapsulation: core_1.ViewEncapsulation.None
        })
    ], CadastroComponent);
    return CadastroComponent;
}());
exports.CadastroComponent = CadastroComponent;
