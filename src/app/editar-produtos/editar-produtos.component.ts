import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router'; // pegar texto da url

@Component({
  selector: 'app-editar-produtos',
  templateUrl: './editar-produtos.component.html',
  styleUrls: ['./editar-produtos.component.css']
})
export class EditarProdutosComponent implements OnInit {

  mensagem_edicao: string = '';
  produto: any;

  // injeção de dependência
  constructor(private httpClient: HttpClient,
              private activateRoute: ActivatedRoute)
  { }

  // estrutura do formulário
  formEdicao = new FormGroup({
    // campo oculto para armazenar o id do produto
    idProduto : new FormControl('', [Validators.required]),
    nome : new FormControl('', [Validators.required]),
    preco : new FormControl('', [Validators.required]),
    quantidade : new FormControl('', [Validators.required])
  });

  // acessar os elementos do formulário na página html
  get form(): any {
    return this.formEdicao.controls;
  }

  // ao executar o component, pega o id do produto da url e consulta no banco de dados
  ngOnInit(): void {

    // captura o id do produto da url
    const idProduto = this.activateRoute.snapshot.paramMap.get('id');

    // verificar no banco de dados se o produto existe e
    // trazer os dados para prencher os campos do formulário
    this.httpClient.get(environment.baseUrl + "api/produtos/" + idProduto)
        .subscribe(
          (response:any) => {
            this.produto = response["produto"];

            //preenche o formulario com os dados do produto
            this.formEdicao.patchValue(response["produto"]);

            console.log(this.produto);
          },
          (error) => {
            console.error('Erro ao buscar dados:', error);
          }
        );

  }

  // função executada no submit do formulário
  onSubmit(): void {

    console.log(this.formEdicao.value);

    this.mensagem_edicao = "Processando, por favor aguarde...";

    // requisição http post para o serviço de cadastro de produto da API
    this.httpClient.put(environment.baseUrl + "api/produtos", this.formEdicao.value)
        .subscribe(
          (response:any) => {
            //armazenar a mensagem obtida da api
            this.mensagem_edicao = response["mensagem"];

            // limpar campos do formulário
            this.formEdicao.reset;

            console.log(response["mensagem"]);
          },
          (error) => {
            this.mensagem_edicao = "Status: " + error["status"] + " | " + "Error: " + error["statusText"];
            console.error('Erro ao buscar dados:', error);
          }
        );
  }
}
