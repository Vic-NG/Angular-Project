"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.LoginServiceService = void 0;
var core_1 = require("@angular/core");
var LoginServiceService = /** @class */ (function () {
    function LoginServiceService(http) {
        this.http = http;
        this.url = 'http://localhost:3000/users';
    }
    LoginServiceService.prototype.loginApplication = function (x) {
        return this.http.post(this.url + "/auth", x, { headers: { 'Content-type': 'application/json' } });
    };
    LoginServiceService = __decorate([
        core_1.Injectable({
            providedIn: 'root'
        })
    ], LoginServiceService);
    return LoginServiceService;
}());
exports.LoginServiceService = LoginServiceService;
