import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface FileMetadata {
  useCase: string;
}

interface ShareSettings {
  partner: string;
}

@Component({
  selector: 'app-upload',
  imports: [CommonModule, FormsModule],
  templateUrl: './upload.component.html',
})
export class UploadComponent {
  currentStep = 1;
  totalSteps = 4;

  // Step 1: File selection
  selectedFile: File | null = null;
  isDragOver = false;

  // Step 2: Metadata (Use Case)
  metadata: FileMetadata = {
    useCase: '',
  };

  // Step 3: Share settings (optional)
  shareSettings: ShareSettings = {
    partner: '',
  };

  // Submission state
  isSubmitting = false;
  isSubmitted = false;

  private useCaseNames: Record<string, string> = {
    'quality-management': 'Quality Management',
    'supply-chain': 'Supply Chain',
    traceability: 'Traceability',
    sustainability: 'Sustainability',
    'demand-forecasting': 'Demand Forecasting',
  };

  private partnerNames: Record<string, string> = {
    'partner-a': 'Partner A GmbH',
    'partner-b': 'Partner B AG',
    'partner-c': 'Partner C Ltd.',
    'partner-d': 'Partner D S.A.',
  };

  get steps(): { name: string; active: boolean; completed: boolean }[] {
    return [
      { name: 'File', active: this.currentStep === 1, completed: this.currentStep > 1 },
      { name: 'Details', active: this.currentStep === 2, completed: this.currentStep > 2 },
      { name: 'Share', active: this.currentStep === 3, completed: this.currentStep > 3 },
      { name: 'Overview', active: this.currentStep === 4, completed: this.isSubmitted },
    ];
  }

  get willShare(): boolean {
    return !!this.shareSettings.partner;
  }

  canProceed(): boolean {
    switch (this.currentStep) {
      case 1:
        return this.selectedFile !== null;
      case 2:
        return !!this.metadata.useCase;
      case 3:
        // Share step is optional - can always proceed
        return true;
      default:
        return true;
    }
  }

  onDragOver(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = true;
  }

  onDragLeave(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;
  }

  onDrop(event: DragEvent): void {
    event.preventDefault();
    event.stopPropagation();
    this.isDragOver = false;

    const files = event.dataTransfer?.files;
    if (files && files.length > 0) {
      this.setFile(files[0]);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.setFile(input.files[0]);
    }
  }

  private setFile(file: File): void {
    this.selectedFile = file;
  }

  clearFile(): void {
    this.selectedFile = null;
  }

  formatFileSize(bytes: number): string {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  }

  getUseCaseName(key: string): string {
    return this.useCaseNames[key] || key;
  }

  getPartnerName(key: string): string {
    return this.partnerNames[key] || key;
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

  skipShare(): void {
    this.shareSettings.partner = '';
    this.currentStep = 4;
  }

  async submit(): Promise<void> {
    this.isSubmitting = true;

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Here you would call your file service to upload the file
    console.log('Uploading file:', {
      file: this.selectedFile,
      metadata: this.metadata,
      shareSettings: this.willShare ? this.shareSettings : null,
    });

    this.isSubmitting = false;
    this.isSubmitted = true;
  }

  reset(): void {
    this.currentStep = 1;
    this.selectedFile = null;
    this.isDragOver = false;
    this.metadata = {
      useCase: '',
    };
    this.shareSettings = {
      partner: '',
    };
    this.isSubmitted = false;
  }
}
