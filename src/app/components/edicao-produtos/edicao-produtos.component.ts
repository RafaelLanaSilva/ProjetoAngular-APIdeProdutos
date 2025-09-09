import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MensagensComponent } from '../../shared/mensagens/mensagens.component';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-edicao-produtos',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MensagensComponent
  ],
  templateUrl: './edicao-produtos.component.html',
  styleUrl: './edicao-produtos.component.css'
})
export class EdicaoProdutosComponent {


  //Atributos
  apiUrl = environment.apiProdutos; //endpoint da API
  http = inject(HttpClient); //Classe para requisições para o Backend
  route = inject(ActivatedRoute); //Classe para capturar parametros da URL
  id: string = ''; //armazenar o id obtido
  categorias: any[] = []; //Array para armazenar as categorias
  mensagem: string = ''; //Exibir mensagens na página


  //Método executado quando o componente é aberto
  ngOnInit() {
    //capturando o id do produto enviado na URL
    this.id = this.route.snapshot.paramMap.get('id') as string;
    //fazendo uma requisição GET para consultar o produto através do id
    this.http.get(`${this.apiUrl}/api/produtos/${this.id}`)
      .subscribe((response: any) => {
        //preenchendo os campos do formulário
        this.form.patchValue({
          nome : response.nome, //preenchendo o campo nome
          preco : response.preco, //preenchendo o campo preço
          quantidade : response.quantidade, //preenchendo o campo quantidade
          categoriaId : response.categoria.id //preenchendo o campo categoriaId
        });
      });

    //consultando as categorias para exibição na página
    this.http.get(`${this.apiUrl}/api/categorias`)
      .subscribe(response => {
        this.categorias = response as any[];
      });
  }

  //Estrutura do formulário
  form = new FormGroup({
    nome : new FormControl('', [
      Validators.required, Validators.minLength(6), Validators.maxLength(100)
    ]),
    preco : new FormControl('', [
      Validators.required, Validators.min(0.01), Validators.max(999999)
    ]),
    quantidade : new FormControl('', [
      Validators.required, Validators.min(0), Validators.max(9999)
    ]),
    categoriaId : new FormControl('', [
      Validators.required
    ])
  });

  //função de submit do formulário
  onSubmit() {
    this.http.put(`${this.apiUrl}/api/produtos/${this.id}`, this.form.value)
      .subscribe((response: any) => {
        this.mensagem = `Produto ${response.nome} atualizado com sucesso!`;
      });
  }

}
