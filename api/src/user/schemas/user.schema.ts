import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ type: String, required: true, unique: true })  email;
  @Prop({ type: String, required: true })  password;
  @Prop({ type: String, required: true })  first_name;
  @Prop({ type: String, required: true })  last_name;
  @Prop({ type: String })  patronymic;
  @Prop({ type: Object })  roles;
  // @Prop({ type: String, required: true })  ouqRole;
  // @Prop({ type: String, required: true })  role;
}

export const UserSchema = SchemaFactory.createForClass(User);