import { ObjectType, Field } from "@nestjs/graphql";
import { PaymentModel } from "src/payments/graphql/models/payment.model";

@ObjectType()
export class BookingModel {
  @Field()
  id: string;

  @Field()
  code: string;

  @Field()
  date: Date;

  @Field()
  status: string;

  @Field()
  isActive: boolean;

  @Field({ nullable: true })
  description?: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;

  @Field()
  location: string;

  @Field()
  time: string;

  @Field(() => [PaymentModel], { nullable: true })
  payments?: PaymentModel[];
}