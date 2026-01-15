import { Component, inject } from '@angular/core';
import {
  FilterInputComponent,
  ItemCountSelectorComponent,
  ModalAndAlertService,
  PaginationComponent,
} from '@eclipse-edc/dashboard-core';
import {from, map, Observable, of} from 'rxjs';
import { Partner } from '../../model/Partner';
import { PartnerService } from '../partner.service';
import { AsyncPipe } from '@angular/common';
import {ConnectComponent} from '../connect/connect.component';

@Component({
  selector: 'app-partner-view',
  imports: [
    FilterInputComponent, ItemCountSelectorComponent, PaginationComponent, AsyncPipe
  ],
  templateUrl: './partner-view.component.html',
})
export class PartnerViewComponent {
  partnerService: PartnerService = inject(PartnerService);
  modalService: ModalAndAlertService = inject(ModalAndAlertService);

  pageItemCount = 10;
  partners$: Observable<Partner[]> = from(this.partnerService.getPartners());
  filteredPartners$: Observable<Partner[]> = this.partners$;
  pagePartners$: Observable<Partner[]> = of([]);

  selectedPartner?: Partner;

  paginationEvent(pageItems: Partner[]) {
    this.pagePartners$ = of(pageItems);
  }

  filter(searchText: string) {
    if (searchText) {
      const lower = searchText.toLowerCase();
      this.filteredPartners$ = this.partners$.pipe(
        map(files =>
          files.filter(
            file =>
              file.name.toLowerCase().includes(lower) ||
              file.country.toLowerCase().includes(lower) ||
              file.sector.toLowerCase().includes(lower),
          ),
        ),
      );
    } else {
      this.filteredPartners$ = this.partners$;
    }
  }

  selectPartner(partner: Partner) {
    this.selectedPartner = partner;
  }

  backToList() {
    this.selectedPartner = undefined;
  }

  addPartner(): void {
    this.modalService.openModal(ConnectComponent)
  }
}
