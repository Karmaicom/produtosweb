import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-cadastrar-produtos',
  templateUrl: './cadastrar-produtos.component.html',
  styleUrls: ['./cadastrar-produtos.component.css']
})
export class CadastrarProdutosComponent implements OnInit {

  mensagem_cadastro: string = '';

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

    this.mensagem_cadastro = "Processando, por favor aguarde...";

    // requisição http post para o serviço de cadastro de produto da API
    this.httpClient.post(environment.baseUrl + "api/produtos", this.formCadastro.value)
        .subscribe(
          response => {
            //armazenar a mensagem obtida da api
            this.mensagem_cadastro = response["mensagem"];

            // limpar campos do formulário
            this.formCadastro.reset;

            console.log(response["mensagem"]);
          },
          (error) => {
            console.error('Erro ao buscar dados:', error);
          }
        );
  }

}
