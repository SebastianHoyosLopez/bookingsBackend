import { ObjectType, Field } from "@nestjs/graphql";

@ObjectType()
export class PaymentModel {
  @Field()
  id: string;

  @Field()
  code: string;

  @Field()
  amount: number;

  @Field()
  currency: string;

  @Field()
  paymentMethod: string;

  @Field()
  paymentStatus: string;
  
}
