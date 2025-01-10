import { Injectable } from '@nestjs/common';
import { PaymentCreateInput } from '../graphql/inputs/payment-create.input';
import { PaymentUpdateInput } from '../graphql/inputs/paymet-update.input';

@Injectable()
export class PaymentService {
  private payments = [];

  createPayment(input: PaymentCreateInput) {
    const newPayment = { ...input, createdAt: new Date() };
    if (!newPayment.paymentDate) {
      newPayment.paymentDate = new Date();
    }
    this.payments.push(newPayment);
    return newPayment;
  }

  updatePayment(id: string, input: PaymentUpdateInput) {
    const paymentIndex = this.payments.findIndex(payment => payment.id === id);
    if (paymentIndex === -1) {
      throw new Error('Payment not found');
    }
    this.payments[paymentIndex] = { ...this.payments[paymentIndex], ...input, updatedAt: new Date() };
    return this.payments[paymentIndex];
  }

  getPayments() {
    return this.payments;
  }
}