import { Component, inject } from '@angular/core';
import { FilterInputComponent, ItemCountSelectorComponent, PaginationComponent } from '@eclipse-edc/dashboard-core';
import { from, map, Observable, of } from 'rxjs';
import { FileData } from '../../model/FileData';
import { FileService } from '../file.service';
import { AsyncPipe, DatePipe } from '@angular/common';

@Component({
  selector: 'app-files-view',
  imports: [FilterInputComponent, ItemCountSelectorComponent, PaginationComponent, AsyncPipe, DatePipe],
  templateUrl: './files-view.component.html',
})
export class FilesViewComponent {
  fileService: FileService = inject(FileService);

  pageItemCount = 50;
  files$: Observable<FileData[]> = from(this.fileService.getFiles());
  filteredFiles$: Observable<FileData[]> = this.files$;
  pageFiles$: Observable<FileData[]> = of([]);

  paginationEvent(pageItems: FileData[]) {
    this.pageFiles$ = of(pageItems);
  }

  filter(searchText: string) {
    if (searchText) {
      const lower = searchText.toLowerCase();
      this.filteredFiles$ = this.files$.pipe(
        map(files =>
          files.filter(file => file.name.toLowerCase().includes(lower) || file.extension.toLowerCase().includes(lower)),
        ),
      );
    } else {
      this.filteredFiles$ = this.files$;
    }
  }
}
