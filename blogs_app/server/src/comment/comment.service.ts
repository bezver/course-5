import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Comment } from "src/_schemas/Comment.schema";
import { Post } from "src/_schemas/Post.schema";
import { User } from "src/_schemas/User.schema";
import { CommentDto } from "./models/CommentDto";
import { CreateCommentDto } from "./models/CreateCommentDto";

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<Comment>,
    @InjectModel(Post.name) private postModel: Model<Post>,
  ) {}

  async listComments(): Promise<Comment[]> {
    return this.commentModel.find().sort({ createdAt: "desc" }).populate("author").exec();
  }

  async listCommentsForPost(postId: string): Promise<Comment[]> {
    return this.commentModel.find({ post: postId }).sort({ createdAt: "desc" }).populate("author").exec();
  }

  async getCommentById(id: string): Promise<Comment> {
    return this.commentModel.findById(id).populate("author").exec();
  }

  async createComment(createCommentDto: CreateCommentDto): Promise<Comment> {
    const post = await this.postModel.findById(createCommentDto.post);
    if (!post) {
      throw new Error("Post not found");
    }

    const comment = new this.commentModel(createCommentDto);
    const createdComment = await comment.save();
    return createdComment.populate("author");
  }

  async updateComment(id: string, commentDto: CommentDto, currentUser: User): Promise<Comment> {
    const comment = await this.commentModel.findById(id);
    if (!comment) {
      throw new Error("Comment not found");
    }

    if (comment.author.toString() !== currentUser._id.toString()) {
      throw new Error("Cannot update this comment");
    }

    return this.commentModel
      .findByIdAndUpdate(id, commentDto, {
        new: true,
      })
      .exec();
  }

  async deleteComment(id: string, currentUser: User): Promise<Comment> {
    const comment = await this.commentModel.findById(id);
    if (!comment) {
      throw new Error("Comment not found");
    }

    if (comment.author.toString() !== currentUser._id.toString()) {
      throw new Error("Cannot update this comment");
    }

    return this.commentModel.findByIdAndDelete(id).exec();
  }
}
