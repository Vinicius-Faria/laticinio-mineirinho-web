import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './screen/login/login.component';
import { ProdutoComponent } from './screen/produto/produto.component';
import { EntradaComponent } from './screen/entrada/entrada.component';
import { ToolbarComponent } from './screen/toolbar/toolbar.component';
import { SaidaComponent } from './screen/saida/saida.component';
import { GraficoComponent } from './screen/grafico/grafico.component';
import { RelatorioComponent } from './screen/relatorio-saida/relatorio.component';
import { RelatorioEntradaComponent } from './screen/relatorio-entrada/relatorio-entrada.component';
import { ControleEstoqueComponent } from './screen/controle-estoque/controle-estoque.component';
import { PainelControleComponent } from './screen/painel-controle/painel-controle.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: "", redirectTo: "/login", pathMatch: "full"
  },
  {
    path: 'master',
    component: ToolbarComponent,
    children:[
      {
        path: 'painel',
        component: PainelControleComponent
      },
      {
        path: 'produto',
        component: ProdutoComponent,
      },
      {
        path: 'entrada',
        component: EntradaComponent,
      },
      {
        path: 'toolbar',
        component: ToolbarComponent,
      },
      {
        path: 'saida',
        component: SaidaComponent,
      },
      {
        path: 'relatorio-saida',
        component: RelatorioComponent,
      },
      {
        path: 'grafico',
        component: GraficoComponent,
      },
      {
        path: 'relatorio-entrada',
        component: RelatorioEntradaComponent,
      },
      {
        path: 'controle-estoque',
        component: ControleEstoqueComponent,
      },
    ]
  }
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
