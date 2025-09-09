import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-mensagens',
  imports: [
    CommonModule
  ],
  templateUrl: './mensagens.component.html',
  styleUrl: './mensagens.component.css'
})
export class MensagensComponent {

  @Input() //definir que o valor desta variável será passado pelos demais compoentes
  mensagem: string = ''; //mensagem exibida pelo componente

}
