import { Module } from '@nestjs/common';
import { PaymentService } from './services/payment.service';
import { PaymentResolver } from './graphql/resolvers/payment.resolver';

@Module({
  providers: [PaymentService, PaymentResolver]
})
export class PaymentsModule { }
