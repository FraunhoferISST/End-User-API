import { Component, inject } from '@angular/core';
import { MembershipService } from './membership.service';
import { AsyncPipe } from '@angular/common';
import { FilterInputComponent, ItemCountSelectorComponent, PaginationComponent } from '@eclipse-edc/dashboard-core';
import { map, Observable, of } from 'rxjs';
import { Membership } from './membership';
import { RegistrationComponent } from './registration/registration.component';

@Component({
  selector: 'app-membership-view',
  templateUrl: './membership-view.component.html',
  imports: [
    AsyncPipe,
    FilterInputComponent,
    ItemCountSelectorComponent,
    PaginationComponent,
    RegistrationComponent,
  ],
})
export class MembershipViewComponent {
  membershipService: MembershipService = inject(MembershipService);

  pageItemCount = 15;
  filteredMemberships$: Observable<Membership[]> = this.membershipService.memberships$;
  pageMemberships$: Observable<Membership[]> = of([]);

  constructor() {
    // this.membershipService.addMembership({
    //   ecosystem: 'Catena-X',
    //   id: 'BPMN00000000001',
    //   since: new Date(2026, 0, 1),
    //   until: new Date(2027, 5, 31),
    // });
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
    return;
  }

  removeMembership(membership: Membership) {
    this.membershipService.removeMembership(membership.ecosystem, membership.id);
  }

  protected readonly navigator = navigator;
}
