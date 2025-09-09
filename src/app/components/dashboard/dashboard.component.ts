import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Chart, ChartModule } from 'angular-highcharts';
import { environment } from '../../../environments/environment';


@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ChartModule
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {


  //Atributos
  graficoQuantidade: Chart | null = null;
  graficoPreco: Chart | null = null;


  //Injeção de dependência
  http = inject(HttpClient);


  //endereço da API
  apiUrl = environment.apiProdutos;


  //formulário
  form = new FormGroup({
    dataMin: new FormControl(''),
    dataMax: new FormControl('')
  });


  //função para capturar o evento de submit do formulário
  onSubmit() {
   
    const dataMin = this.form.value.dataMin;
    const dataMax = this.form.value.dataMax;


    this.http.get<any>(`${this.apiUrl}/api/dashboard/${dataMin}/${dataMax}`)
      .subscribe((response) => {


        const categoriaQuantidade = response.categoriaSomatorioQuantidade;
        const categoriaPreco = response.categoriaMediaPreco;


        // Montar gráfico de donut (Quantidade por categoria)
        this.graficoQuantidade = new Chart({
          chart: {
            type: 'pie'
          },
          title: {
            text: 'Quantidade por Categoria'
          },
          plotOptions: {
            pie: {
              innerSize: '60%',
              dataLabels: {
                enabled: true,
                format: '{point.name}: {point.y}'
              }
            }
          },
          series: [
            {
              name: 'Quantidade',
              type: 'pie',
              data: categoriaQuantidade.map((item: any) => [item.nomeCategoria, item.somatorioQuantidade])
            }
          ]
        });


        // Montar gráfico de colunas (Preço médio por categoria)
        this.graficoPreco = new Chart({
          chart: {
            type: 'column'
          },
          title: {
            text: 'Preço Médio por Categoria'
          },
          xAxis: {
            categories: categoriaPreco.map((item: any) => item.nomeCategoria),
            title: {
              text: 'Categoria'
            }
          },
          yAxis: {
            title: {
              text: 'Preço Médio'
            }
          },
          series: [
            {
              name: 'Preço Médio',
              type: 'column',
              data: categoriaPreco.map((item: any) => item.mediaPreco)
            }
          ]
        });
      });
  }
}




