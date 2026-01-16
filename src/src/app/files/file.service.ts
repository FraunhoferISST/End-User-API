import { Injectable } from '@angular/core';
import { FileData } from '../model/FileData';

@Injectable({
  providedIn: 'root',
})
export class FileService {
  getFiles(): Promise<FileData[]> {
    const extensions = ['pdf', 'docx', 'xlsx', 'txt', 'jpg', 'png', 'csv', 'pptx'];
    const owner = ['My Company', 'Company A', 'Company B', 'Company C'];
    const useCases = ['traceability', 'sustainability', 'quality-management', 'supply-chain', 'demand-forecasting'];
    const access = ['Yes', 'No', 'Pending'];

    const files: FileData[] = Array.from({ length: 100 }, (_, i) => ({
      name: `file_${i + 1}`,
      updated: new Date(Date.now() - Math.random() * 10000000000),
      extension: extensions[Math.floor(Math.random() * extensions.length)],
      size: Math.floor(Math.random() * 10000000),
      owner: owner[Math.floor(Math.random() * owner.length)],
      tags: [useCases[Math.floor(Math.random() * useCases.length)]],
      access: access[Math.floor(Math.random() * access.length)],
      agreements: [],
      transactions: []
    }));

    // access only relevant for files owned by others
    for (let i = 0; i < files.length; i++) {
      if (files[i].owner === 'My Company') {
        files[i].access = '-';
      }
    }

    return Promise.resolve(files);
  }
}
