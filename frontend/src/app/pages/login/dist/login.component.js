"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginComponent = void 0;
var core_1 = require("@angular/core");
var forms_1 = require("@angular/forms");
var LoginComponent = /** @class */ (function () {
    function LoginComponent(formBuilder, router, service) {
        this.formBuilder = formBuilder;
        this.router = router;
        this.service = service;
        this.check = [];
    }
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log(this.login);
        if (!this.login.valid) {
            console.log('formulario invalido');
            Object.keys(this.login.controls).forEach(function (campo) {
                console.log(campo);
                var controle = _this.login.get(campo);
                controle.markAsDirty();
            });
            return;
        }
        this.service.loginApplication(this.login.value).subscribe(function (dados) {
            _this.router.navigateByUrl('/home');
            console.log(dados);
        }, function (error) { return alert(error.error.error); });
    };
    LoginComponent.prototype.verificaValidTouched = function (campo) {
        return (!this.login.get(campo).valid &&
            (this.login.get(campo).touched || this.login.get(campo).dirty));
    };
    LoginComponent.prototype.aplicaCssErro = function (campo) {
        return {
            'has-error': this.verificaValidTouched(campo),
            'has-feedback': this.verificaValidTouched(campo)
        };
    };
    LoginComponent.prototype.ngOnInit = function () {
        this.login = this.formBuilder.group({
            email: [null, [forms_1.Validators.required, forms_1.Validators.email]],
            password: [null, [forms_1.Validators.required]]
        });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'app-login',
            templateUrl: './login.component.html',
            styleUrls: ['./login.component.css']
        })
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
