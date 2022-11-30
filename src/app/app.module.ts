import { DEFAULT_CURRENCY_CODE, LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './screen/login/login.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProdutoComponent } from './screen/produto/produto.component';
import { MatCardModule} from '@angular/material/card';
import { EntradaComponent } from './screen/entrada/entrada.component';
import { MatButtonToggleModule} from '@angular/material/button-toggle';
import { ToolbarComponent } from './screen/toolbar/toolbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { SaidaComponent } from './screen/saida/saida.component';
import { MatSelectModule } from '@angular/material/select';
import ptBr from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { GraficoComponent } from './screen/grafico/grafico.component';
import { RelatorioComponent } from './screen/relatorio-saida/relatorio.component';
import { RelatorioEntradaComponent } from './screen/relatorio-entrada/relatorio-entrada.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ControleEstoqueComponent } from './screen/controle-estoque/controle-estoque.component';

registerLocaleData(ptBr);
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProdutoComponent,
    EntradaComponent,
    ToolbarComponent,
    SaidaComponent,
    RelatorioComponent,
    GraficoComponent,
    RelatorioEntradaComponent,
    ControleEstoqueComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    NgbModule,
    MatCardModule,
    MatButtonToggleModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    MatCheckboxModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'pt' },    
    { provide: DEFAULT_CURRENCY_CODE, useValue: 'BRL' },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
