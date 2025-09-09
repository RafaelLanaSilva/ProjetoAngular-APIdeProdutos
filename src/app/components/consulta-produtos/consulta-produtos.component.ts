import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { environment } from '../../../environments/environment';
import { MensagensComponent } from '../../shared/mensagens/mensagens.component';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-consulta-produtos',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MensagensComponent,
    RouterLink
  ],
  templateUrl: './consulta-produtos.component.html',
  styleUrl: './consulta-produtos.component.css'
})
export class ConsultaProdutosComponent {


  //Atributos
  apiUrl = environment.apiProdutos;
  http = inject(HttpClient);
  produtos: any[] = [];
  mensagem: string = '';


  form = new FormGroup({
    dataMin : new FormControl(''),
    dataMax : new FormControl('')
  });


  onSubmit() {


    const dataMin = this.form.value.dataMin;
    const dataMax = this.form.value.dataMax;


    this.http.get(`${this.apiUrl}/api/produtos/${dataMin}/${dataMax}`)
      .subscribe((response) => {
        this.produtos = response as any[];
      })
  }

  onDelete(id: string) {

    if(confirm('Deseja realmente excluir o produto selecionado?')) {

      this.http.delete(`${this.apiUrl}/api/produtos/${id}`)
        .subscribe((response: any) => {
          this.mensagem = `Produto ${response.nome}, excluído com sucesso.`;
          this.onSubmit();
        })
    }
  }

}
