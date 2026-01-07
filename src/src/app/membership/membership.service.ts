import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Membership } from '../model/Membership';

@Injectable({
  providedIn: 'root'
})
export class MembershipService {

  private readonly _memberships = new BehaviorSubject<Map<string, Membership>>(new Map());

  public readonly memberships$: Observable<Membership[]> = this._memberships.pipe(
    map(m => Array.from(m.values()))
  );

  private getKey(ecosystem: string, id: string): string {
    return `${ecosystem}:${id}`;
  }

  public addMembership(membership: Membership) {
    const key = this.getKey(membership.ecosystem, membership.id);
    const updated = new Map(this._memberships.getValue());
    updated.set(key, membership); // Automatically prevents duplicates
    this._memberships.next(updated);
  }

  public removeMembership(ecosystem: string, id: string) {
    const key = this.getKey(ecosystem, id);
    const updated = new Map(this._memberships.getValue());
    updated.delete(key);
    this._memberships.next(updated);
  }

  public hasMembership(ecosystem: string, id: string): boolean {
    return this._memberships.getValue().has(this.getKey(ecosystem, id));
  }

  public getMembership(ecosystem: string, id: string): Membership | undefined {
    return this._memberships.getValue().get(this.getKey(ecosystem, id));
  }
}
