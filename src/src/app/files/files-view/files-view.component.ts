import { Component, inject } from '@angular/core';
import {
  FilterInputComponent,
  ItemCountSelectorComponent,
  ModalAndAlertService,
  PaginationComponent,
} from '@eclipse-edc/dashboard-core';
import { from, map, Observable, of } from 'rxjs';
import { FileData } from '../../model/FileData';
import { FileService } from '../file.service';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { UploadComponent } from '../upload/upload.component';

@Component({
  selector: 'app-files-view',
  imports: [FilterInputComponent, ItemCountSelectorComponent, PaginationComponent, AsyncPipe, DatePipe, NgClass],
  templateUrl: './files-view.component.html',
})
export class FilesViewComponent {
  fileService: FileService = inject(FileService);
  modalService: ModalAndAlertService = inject(ModalAndAlertService);

  pageItemCount = 50;
  files$: Observable<FileData[]> = from(this.fileService.getFiles());
  filteredFiles$: Observable<FileData[]> = this.files$;
  pageFiles$: Observable<FileData[]> = of([]);

  selectedFile?: FileData;

  paginationEvent(pageItems: FileData[]) {
    this.pageFiles$ = of(pageItems);
  }

  filter(searchText: string) {
    if (searchText) {
      const lower = searchText.toLowerCase();
      this.filteredFiles$ = this.files$.pipe(
        map(files =>
          files.filter(
            file =>
              file.name.toLowerCase().includes(lower) ||
              file.extension.toLowerCase().includes(lower) ||
              file.owner.toLowerCase().includes(lower),
          ),
        ),
      );
    } else {
      this.filteredFiles$ = this.files$;
    }
  }

  selectFile(file: FileData) {
    this.selectedFile = file;
  }

  backToList() {
    this.selectedFile = undefined;
  }

  formatFileSize(bytes: number, decimals = 2): string {
    if (bytes === 0) return '0 Bytes';
    if (bytes < 0) return 'Invalid size';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    const size = bytes / Math.pow(k, i);

    return `${parseFloat(size.toFixed(decimals))} ${sizes[i]}`;
  }

  uploadFile(): void {
    this.modalService.openModal(UploadComponent);
  }
}
