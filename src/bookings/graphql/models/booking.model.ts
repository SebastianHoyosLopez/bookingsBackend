import { ObjectType, Field } from "@nestjs/graphql";

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

  @Field()
  description: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;

  @Field({ nullable: true })
  deletedAt?: Date;
}