import mongoose from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Post {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "Post", auto: true })
  _id: string;

  @Prop({ required: true })
  message: string;

  @Prop({ default: Date.now })
  createdAt: Date;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true })
  author: string;
}

export const PostSchema = SchemaFactory.createForClass(Post).set("toJSON", {
  transform: function (_, ret) {
    delete ret.__v;
    return ret;
  },
});
