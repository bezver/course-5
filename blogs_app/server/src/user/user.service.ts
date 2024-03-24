import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/_schemas/User.schema";
import { CreateUserDto } from "./models/CreateUserDto";
import { UpdateUserDto } from "./models/UpdateUserDto";

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private readonly userModel: Model<User>) {}

  async list(): Promise<User[]> {
    return this.userModel.find().exec();
  }

  async getById(id: string): Promise<User> {
    return this.userModel.findById(id).exec();
  }

  async getByName(username: string): Promise<User> {
    return this.userModel.findOne({ username }).exec();
  }

  async getOne(options: { [key: string]: any }): Promise<User> {
    return this.userModel.findOne(options).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = new this.userModel(createUserDto);
    return user.save();
  }

  async update(id: string, userDto: UpdateUserDto): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, userDto, { new: true }).exec();
  }
}
