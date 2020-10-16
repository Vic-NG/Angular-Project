import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';



const routes: Routes = [
  {path:'', component:LoginComponent, pathMatch:'full'},
  //{path:'login', component:LoginComponent, pathMatch:'full'},
  {path:'cadastro', component:CadastroComponent},
  //{path:'login', loadChildren: () => import('./pages/cadastro/cadastro.module').then(m => m.CadastroModule)},
  {path:'**', redirectTo:'login'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
