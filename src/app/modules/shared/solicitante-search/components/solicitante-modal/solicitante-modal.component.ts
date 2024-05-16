import { Component } from '@angular/core';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';
import { SolicitanteTableComponent } from '../solicitante-table/solicitante-table.component';

@Component({
  selector: 'app-solicitante-modal',
  standalone: true,
  imports: [SolicitanteTableComponent],
  templateUrl: './solicitante-modal.component.html',
})
export class SolicitanteModalComponent {
  modal!: ModalInterface;

  ngOnInit(): void {

    const modalElement = document.getElementById('myModal')!;
    const options: ModalOptions = {
      backdrop: 'dynamic',
      //keyboard: true,
    };
    this.modal = new Modal(modalElement, options);
  }

}