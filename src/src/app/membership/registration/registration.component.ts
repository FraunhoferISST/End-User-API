import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CompanyData {
  legalName: string;
  shortName: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
  commercialRegistrationNumber: string;
}

@Component({
  selector: 'app-registration',
  imports: [CommonModule, FormsModule],
  templateUrl: './registration.component.html'
})
export class RegistrationComponent {
  currentStep = 1;

  // Step 1: Ecosystem selection
  selectedEcosystem: string = '';

  // Step 2: Membership type
  membershipType: 'existing' | 'new' | null = null;

  // Existing membership
  existingMembershipId: string = '';

  // New membership - Company data
  companyData: CompanyData = {
    legalName: '',
    shortName: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
    commercialRegistrationNumber: ''
  };

  // Step 5: Agreements (only for new)
  agreedToTerms  = false;
  agreedToPrivacy = false;

  // Submission state
  isSubmitting = false;
  isSubmitted = false;

  get totalSteps(): number {
    return this.membershipType === 'new' ? 5 : 3;
  }

  get steps(): { name: string; active: boolean; completed: boolean }[] {
    const baseSteps = [
      { name: 'Ecosystem', active: this.currentStep === 1, completed: this.currentStep > 1 },
      { name: 'Input', active: this.currentStep === 2, completed: this.currentStep > 2 },
    ];

    if (this.membershipType === 'new') {
      return [
        ...baseSteps,
        { name: 'Proof', active: this.currentStep === 3, completed: this.currentStep > 3 },
        { name: 'Agree', active: this.currentStep === 4, completed: this.currentStep > 4 },
        { name: 'Submit', active: this.currentStep === 5, completed: this.isSubmitted },
      ];
    }

    return [
      ...baseSteps,
      { name: 'Submit', active: this.currentStep === 3, completed: this.isSubmitted },
    ];
  }

  canProceed(): boolean {
    switch (this.currentStep) {
      case 1:
        return !!this.selectedEcosystem && this.membershipType !== null;
      case 2:
        if (this.membershipType === 'existing') {
          return !!this.existingMembershipId.trim();
        }
        return this.isCompanyDataValid();
      case 3:
        if (this.membershipType === 'existing') {
          return true; // Submit step for existing
        }
        return true; // Proof step - assume documents uploaded
      case 4:
        return this.agreedToTerms && this.agreedToPrivacy;
      default:
        return true;
    }
  }

  isCompanyDataValid(): boolean {
    return !!(
      this.companyData.legalName.trim() &&
      this.companyData.shortName.trim() &&
      this.companyData.street.trim() &&
      this.companyData.city.trim() &&
      this.companyData.postalCode.trim() &&
      this.companyData.country.trim() &&
      this.companyData.commercialRegistrationNumber.trim()
    );
  }

  nextStep(): void {
    if (this.canProceed() && this.currentStep < this.totalSteps) {
      this.currentStep++;
    }
  }

  previousStep(): void {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  isSubmitStep(): boolean {
    return (this.membershipType === 'existing' && this.currentStep === 3) ||
      (this.membershipType === 'new' && this.currentStep === 5);
  }

  async submit(): Promise<void> {
    this.isSubmitting = true;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Submitting:', {
      ecosystem: this.selectedEcosystem,
      membershipType: this.membershipType,
      ...(this.membershipType === 'existing'
          ? { membershipId: this.existingMembershipId }
          : { companyData: this.companyData }
      )
    });

    this.isSubmitting = false;
    this.isSubmitted = true;
  }

  reset(): void {
    this.currentStep = 1;
    this.selectedEcosystem = '';
    this.membershipType = null;
    this.existingMembershipId = '';
    this.companyData = {
      legalName: '',
      shortName: '',
      street: '',
      city: '',
      postalCode: '',
      country: '',
      commercialRegistrationNumber: ''
    };
    this.agreedToTerms = false;
    this.agreedToPrivacy = false;
    this.isSubmitted = false;
  }
}
