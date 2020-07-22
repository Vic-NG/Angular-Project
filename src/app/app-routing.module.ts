import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';



const routes: Routes = [
  {path:'login',  component:LoginComponent},
  {path:'login', loadChildren: () => import('./pages/cadastro/cadastro.module').then(m => m.CadastroModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
