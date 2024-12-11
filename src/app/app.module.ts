import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { Routes, RouterModule, Router } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ConsultarProdutosComponent } from './consultar-produtos/consultar-produtos.component';
import { CadastrarProdutosComponent } from './cadastrar-produtos/cadastrar-produtos.component';
import { EditarProdutosComponent } from './editar-produtos/editar-produtos.component';

//mapear uma rota (endereco url) para cada componente
const routes: Routes = [
  { path : 'cadastrar-produtos', component : CadastrarProdutosComponent},
  { path : 'consultar-produtos', component : ConsultarProdutosComponent},
  { path : 'editar-produtos/:id', component : EditarProdutosComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    ConsultarProdutosComponent,
    CadastrarProdutosComponent,
    EditarProdutosComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes, { enableTracing: false }),
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
