import { Injectable } from '@angular/core';
import { FileData } from '../model/FileData';

@Injectable({
  providedIn: 'root',
})
export class FileService {

  getFiles(): Promise<FileData[]> {
    const extensions = ['pdf', 'docx', 'xlsx', 'txt', 'jpg', 'png', 'csv', 'pptx'];

    const files: FileData[] = Array.from({ length: 100 }, (_, i) => ({
      name: `file_${i + 1}`,
      updated: new Date(Date.now() - Math.random() * 10000000000),
      extension: extensions[Math.floor(Math.random() * extensions.length)],
      size: Math.floor(Math.random() * 10000000)
    }));

    return Promise.resolve(files);
  }

}
