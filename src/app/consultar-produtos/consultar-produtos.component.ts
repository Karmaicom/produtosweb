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

}
