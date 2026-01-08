import { Component, inject } from '@angular/core';
import { MembershipService } from '../membership.service';
import { AsyncPipe, DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import {
  FilterInputComponent,
  ItemCountSelectorComponent,
  ModalAndAlertService,
  PaginationComponent,
} from '@eclipse-edc/dashboard-core';
import { map, Observable, of } from 'rxjs';
import { RegistrationComponent } from '../registration/registration.component';
import { Membership } from '../../model/Membership';

@Component({
  selector: 'app-membership-view',
  templateUrl: './membership-view.component.html',
  imports: [
    AsyncPipe,
    FilterInputComponent,
    ItemCountSelectorComponent,
    PaginationComponent,
    RegistrationComponent,
    DatePipe,
    NgClass,
    TitleCasePipe,
  ],
})
export class MembershipViewComponent {
  membershipService: MembershipService = inject(MembershipService);
  modalService: ModalAndAlertService = inject(ModalAndAlertService);

  pageItemCount = 15;
  filteredMemberships$: Observable<Membership[]> = this.membershipService.memberships$;
  pageMemberships$: Observable<Membership[]> = of([]);

  constructor() {
    // this.seedMemberships();
  }

  private seedMemberships(): void {
    const ecosystems = ['catena-X', 'gaia-X', 'manufacturing-X', 'mobility-X', 'energy-X'];
    const status = ['pending', 'active', 'expired'];

    for (let i = 0; i < 3; i++) {
      const randomEcosystem = ecosystems[Math.floor(Math.random() * ecosystems.length)];
      const randomStatus = status[Math.floor(Math.random() * status.length)];
      const randomId = 'BPMN' + Math.random().toString(36).substring(2, 11).toUpperCase().padEnd(11, '0');
      const startYear = 2024 + Math.floor(Math.random() * 3);
      const startMonth = Math.floor(Math.random() * 12);
      const startDay = 1 + Math.floor(Math.random() * 28);
      const endYear = startYear + 1 + Math.floor(Math.random() * 2);
      const endMonth = Math.floor(Math.random() * 12);
      const endDay = 1 + Math.floor(Math.random() * 28);

      this.membershipService.addMembership({
        ecosystem: randomEcosystem,
        id: randomId,
        status: randomStatus,
        since: new Date(startYear, startMonth, startDay),
        until: new Date(endYear, endMonth, endDay),
      });
    }
  }

  paginationEvent(pageItems: Membership[]) {
    this.pageMemberships$ = of(pageItems);
  }

  filter(searchText: string) {
    if (searchText) {
      const lower = searchText.toLowerCase();
      this.filteredMemberships$ = this.membershipService.memberships$.pipe(
        map(memberships =>
          memberships.filter(
            membership =>
              membership.id.toLowerCase().includes(lower) || membership.ecosystem.toLowerCase().includes(lower),
          ),
        ),
      );
    } else {
      this.filteredMemberships$ = this.membershipService.memberships$;
    }
  }

  addMembership() {
    this.modalService.openModal(RegistrationComponent);
  }

  removeMembership(membership: Membership) {
    this.membershipService.removeMembership(membership.ecosystem, membership.id);
  }

  protected readonly navigator = navigator;
}
