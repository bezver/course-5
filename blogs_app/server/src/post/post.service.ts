import { CreatePostDto } from "./models/CreatePostDto";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Post } from "src/_schemas/Post.schema";
import { PostDto } from "./models/PostDto";
import { User } from "src/_schemas/User.schema";

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private readonly postModel: Model<Post>) {}

  async listPosts(): Promise<Post[]> {
    return this.postModel.find().sort({ createdAt: "desc" }).populate("author").exec();
  }

  async listPostsByAuthor(userId: string): Promise<Post[]> {
    return this.postModel.find({ author: userId }).sort({ createdAt: "desc" }).populate("author").exec();
  }

  async getById(id: string): Promise<Post> {
    return this.postModel.findById(id).populate("author").exec();
  }

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const post = new this.postModel(createPostDto);
    const createdPost = await post.save();
    return createdPost.populate("author");
  }

  async update(id: string, postDto: PostDto, currentUser: User): Promise<Post> {
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new Error("Post not found");
    }

    if (post.author.toString() !== currentUser._id.toString()) {
      throw new Error("You cannot update this post");
    }

    return this.postModel.findByIdAndUpdate(id, postDto, { new: true }).populate("author").exec();
  }

  async delete(id: string, currentUser: User): Promise<Post> {
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new Error("Post not found");
    }

    if (post.author.toString() !== currentUser._id.toString()) {
      throw new Error("You cannot delete this post");
    }

    return this.postModel.findByIdAndDelete(id).populate("author").exec();
  }
}
