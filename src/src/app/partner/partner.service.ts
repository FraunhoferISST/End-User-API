import { Injectable } from '@angular/core';
import { Partner } from '../model/Partner';

@Injectable({
  providedIn: 'root'
})
export class PartnerService {
  getPartners(): Promise<Partner[]> {
    const examplePartner1: Partner = {
      name: "Example GmbH",
      vat: "DE123456789",
      country: "DE",
      sector: "Nutrition"
    };

    const examplePartner2: Partner = {
      name: "SomeCorp Ltd.",
      vat: "US99999123",
      country: "US",
      sector: "Cleaning"
    };

    const partners: Partner[] = [examplePartner1, examplePartner2];

    return Promise.resolve(partners);
  }
}
