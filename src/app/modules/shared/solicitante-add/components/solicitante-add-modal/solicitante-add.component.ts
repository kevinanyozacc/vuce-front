import { Component } from '@angular/core';
import { Modal, ModalInterface, ModalOptions } from 'flowbite';


@Component({
  selector: 'app-solicitante-add-modal',
  standalone: true,
  imports: [],
  templateUrl: './solicitante-add.component.html',
})
export class SolicitanteAddModalComponent {
  modal!: ModalInterface;

  ngOnInit(): void {

    const modalElement = document.getElementById('myModal2')!;
    const options: ModalOptions = {
      backdrop: 'dynamic',
      //keyboard: true,
    };
    this.modal = new Modal(modalElement, options);
  }
}
