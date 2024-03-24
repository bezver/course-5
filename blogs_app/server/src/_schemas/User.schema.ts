import mongoose from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class User {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', auto: true })
  _id: string;

  @Prop({ unique: true, required: true })
  username: string;

  @Prop({ required: true })
  passwordHash: string;

  @Prop({ unique: true, required: true })
  email: string;

  @Prop({ required: true, default: false })
  verified: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User).set('toJSON', {
  transform: function (_, ret) {
    delete ret.passwordHash;
    delete ret.email;
    delete ret.verified;
    delete ret.__v;
    return ret;
  }
});
