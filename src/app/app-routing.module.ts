import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './screen/login/login.component';
import { ProdutoComponent } from './screen/produto/produto.component';
import { EntradaComponent } from './screen/entrada/entrada.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: "", redirectTo: "/login", pathMatch: "full"
  },
  {
    path: 'produto',
    component: ProdutoComponent,
  },
  {
    path: 'entrada',
    component: EntradaComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
