import { Routes } from '@angular/router';
import { CadastroProdutosComponent } from './components/cadastro-produtos/cadastro-produtos.component';
import { ConsultaProdutosComponent } from './components/consulta-produtos/consulta-produtos.component';
import { EdicaoProdutosComponent } from './components/edicao-produtos/edicao-produtos.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';


export const routes: Routes = [
    {
        path: 'cadastro-produtos',
        component: CadastroProdutosComponent
    },
    {
        path: 'consulta-produtos',
        component: ConsultaProdutosComponent
    },
    {
        path: 'edicao-produtos/:id',
        component: EdicaoProdutosComponent
    },
    {
        path: 'dashboard',
        component: DashboardComponent
    },
    {
        path: '', pathMatch: 'full', //mapeamento da página inicial do projeto
        redirectTo: 'dashboard' //redireciona para o dashboard
    }
];




