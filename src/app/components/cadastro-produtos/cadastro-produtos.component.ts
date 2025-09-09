import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { MensagensComponent } from '../../shared/mensagens/mensagens.component';


@Component({
  selector: 'app-cadastro-produtos',
  imports: [
    CommonModule, //registrando a biblioteca para uso no componente
    FormsModule,
    ReactiveFormsModule,
    MensagensComponent
  ],
  templateUrl: './cadastro-produtos.component.html',
  styleUrl: './cadastro-produtos.component.css'
})
export class CadastroProdutosComponent {


  //Atributos do componente
  apiUrl = environment.apiProdutos; //URL da API
  http = inject(HttpClient); //Injeção do HttpClient
  categorias: any[] = []; //Array para armazenar as categorias
  mensagem: string = ''; //Mensagem de erro ou sucesso

  //Formulário para cadastro de produtos
  form = new FormGroup ({
    nome: new FormControl('', [
      Validators.required, Validators.minLength(6), Validators.maxLength(100)]),
    preco: new FormControl('', [
      Validators.required, Validators.min(0.01), Validators.max(999999)]),
    quantidade: new FormControl('', [
      Validators.required, Validators.min(0), Validators.max(9999)]),
    categoriaId: new FormControl('', [
      Validators.required]),
  });

  //Função executada ao abrir o componente
  ngOnInit() {
    //Fazendo a chamada para a API
    this.http.get(this.apiUrl + "/api/categorias")
      .subscribe((response) => {
        //Armazenando a resposta da API no array de categorias
        this.categorias = response as any[];
      });
  }

  //função para capturar o evento de submit do formulário
  onSubmit(){
    this.http.post(this.apiUrl + "/api/produtos", this.form.value)
      .subscribe((response: any) => { //Aguarda a resposta da API
        this.mensagem = `Produto ${response.nome} cadastrado com sucesso!` as any;
        this.form.reset(); //Resetando o formulário
      });
  }

}

