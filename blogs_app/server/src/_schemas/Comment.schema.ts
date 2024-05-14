import mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Comment {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Comment", auto: true })
  _id: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Post" })
  post: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User" })
  author: string;
}

export const CommentSchema = SchemaFactory.createForClass(Comment).set("toJSON", {
  transform: function (_, ret) {
    delete ret.__v;
    return ret;
  },
});
