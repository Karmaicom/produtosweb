import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.css']
})
export class CadastrarProdutosComponent implements OnInit {

  // injeção de dependência
  constructor(private httpClient : HttpClient) { }

  // estrutura do formulário
  formCadastro = new FormGroup({
    nome : new FormControl('', [Validators.required]),
    preco : new FormControl('', [Validators.required]),
    quantidade : new FormControl('', [Validators.required])
  });

  // acessar os elementos do formulário na página html
  get form(): any {
    return this.formCadastro.controls;
  }

  ngOnInit(): void {
  }

  // função executada no submit do formulário
  onSubmit(): void {
    alert('Teste!');
  }

}
