import { Component, OnInit } from '@angular/core';
import { Modal } from 'flowbite';
import type { ModalOptions, ModalInterface } from 'flowbite';

@Component({
  selector: 'app-solicitante-modal',
  standalone: true,
  imports: [],
  templateUrl: './solicitante-modal.component.html',
})
export class SolicitanteModalComponent implements OnInit {
  modal!: ModalInterface;

  ngOnInit(): void {
    const modalElement = document.getElementById('myModal')!;
    const options: ModalOptions = {
      backdrop: 'dynamic',
      //keyboard: true,
    };
    this.modal = new Modal(modalElement, options);
  }

  open(): void {
    this.modal.show();
  }

  close(): void {
    this.modal.hide();
  }
}