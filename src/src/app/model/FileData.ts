import {AgreementData} from './AgreementData';
import {TransactionData} from './TransactionData';

export interface FileData {
  name: string;
  updated: Date;
  extension: string;
  size: number;
  owner: string;
  access: string;
  tags: string[];
  agreements: AgreementData[];
  transactions: TransactionData[];
}
