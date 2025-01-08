import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { PaymentService } from '../../services/payment.service';
import { PaymentCreateInput } from '../inputs/payment-create.input';
import { PaymentModel } from '../models/payment.model';
import { PaymentUpdateInput } from '../inputs/paymet-update.input';

@Resolver(() => PaymentModel)
export class PaymentResolver {
  constructor(private readonly paymentService: PaymentService) {}

  @Query(() => [PaymentModel])
  getPayments() {
    return this.paymentService.getPayments();
  }

  @Mutation(() => PaymentModel)
  createPayment(@Args('input') input: PaymentCreateInput) {
    return this.paymentService.createPayment(input);
  }

  @Mutation(() => PaymentModel)
  updatePayment(@Args('id') id: string, @Args('input') input: PaymentUpdateInput) {
    return this.paymentService.updatePayment(id, input);
  }
} 