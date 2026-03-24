import { Injectable, signal } from '@angular/core';
import { DonationPayment } from '../interfaces/donation-payment';

export interface DonationRecord {
  id: string;
  amount: number;
  createdAt: Date;
  receiptUrl?: string;
}

@Injectable({
  providedIn: 'root',
})
export class DonationsService {
   private history = signal<DonationRecord[]>([]);

  getHistory(): DonationRecord[] {
    return this.history();
  }

  processDonation(payment: DonationPayment): Promise<DonationRecord> {
    return new Promise((resolve) => {
      setTimeout(() => {
        const record: DonationRecord = {
          id: Date.now().toString(),
          amount: payment.amount,
          createdAt: new Date(),
          receiptUrl: `/recibos/${Date.now()}`,
        };
        this.history.update(h => [record, ...h]);
        resolve(record);
      }, 1200);
    });
  }
}
