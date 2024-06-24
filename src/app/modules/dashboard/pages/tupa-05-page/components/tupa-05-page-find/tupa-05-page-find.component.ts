import { NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DashboardHeaderComponent } from 'src/app/modules/dashboard/components/dashboard-header/dashboard-header.component';
import { Tupa05TabContainerComponent } from 'src/app/modules/dev-03/tupa-05/components/tupa-05-tab-container/tupa-05-tab-container.component';
import { ExpedienteEntityInterface } from 'src/app/modules/shared/expediente/interfaces/expediente-entity.interface';
import { ExpedienteFindService } from 'src/app/modules/shared/expediente/services/expediente-find.service';
import { ContentLoadingComponent } from 'src/app/shared/components/content-loading/content-loading.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tupa-05-page-find',
  templateUrl: './tupa-05-page-find.component.html',
  standalone: true,
  imports: [NgIf, DashboardHeaderComponent, Tupa05TabContainerComponent, ContentLoadingComponent],
  providers: [ExpedienteFindService],
})
export class Tupa05PageFindComponent implements OnInit {
  constructor(public service: ExpedienteFindService) {}

  private route = inject(ActivatedRoute);
  expediente!: ExpedienteEntityInterface;

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      this.service
        .fetch(params.get('id')!)
        .then((data) => {
          this.expediente = data;
        })
        .catch(() => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se encontró el expediente!!!',
          });
        });
    });
  }
}
