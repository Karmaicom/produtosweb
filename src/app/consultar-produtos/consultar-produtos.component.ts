import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-consultar-produtos',
  templateUrl: './consultar-produtos.component.html',
  styleUrls: ['./consultar-produtos.component.css']
})
export class ConsultarProdutosComponent implements OnInit {

  produtos: any[] = [];
  mensagem_exclusao: string = '';

  constructor(private httpClient: HttpClient)
  {

  }

  ngOnInit(): void {
    // executa consulta de produtos
    this.httpClient.get<any[]>(environment.baseUrl + 'api/produtos').subscribe(
      (response) => {
        this.produtos = response["produtos"];
      },
      (error) => {
        console.error('Erro ao buscar dados:', error);
      }
    )
  }

  // funça executada ao clicar no botão excluir
  excluirProduto(idProduto: string): void {
    // solciitar que o usuário confirme a exclusão
    if (window.confirm('Deseja realmente excluir o produto?')) {
      //executar o serviço de esclusão do produto
      this.httpClient.delete(environment.baseUrl + "api/produtos/" + idProduto)
        .subscribe(
          (response:any) => {
            // armazenar a mensagem obtida na api
            this.mensagem_exclusao = response["mensagem"];

            // recarregar a tela de consulta
            this.ngOnInit();
          }
        ),
        (error) => {
          console.error('Erro ao buscar dados:', error);
        }
    }
  }

}
