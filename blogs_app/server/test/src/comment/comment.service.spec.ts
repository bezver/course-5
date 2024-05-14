import { getModelToken } from "@nestjs/mongoose";
import { Test, TestingModule } from "@nestjs/testing";
import { Comment } from "../../../src/_schemas/Comment.schema";
import { Post } from "../../../src/_schemas/Post.schema";
import { CommentService } from "../../../src/comment/comment.service";
import { createUserMock } from "../../utils";

const createMockMongooseModel = () => {
  const mockMongooseModel = function () {
    return mockMongooseModel;
  };

  mockMongooseModel.find = jest.fn();
  mockMongooseModel.findById = jest.fn();
  mockMongooseModel.findByIdAndUpdate = jest.fn();
  mockMongooseModel.findByIdAndDelete = jest.fn();
  mockMongooseModel.save = jest.fn();

  return mockMongooseModel;
};

describe("CommentService", () => {
  let service: CommentService;
  const mockCommentModel = createMockMongooseModel();
  const mockPostModel = createMockMongooseModel();

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CommentService,
        {
          provide: getModelToken(Comment.name),
          useValue: mockCommentModel,
        },
        {
          provide: getModelToken(Post.name),
          useValue: mockPostModel,
        },
      ],
    }).compile();

    service = module.get<CommentService>(CommentService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("listComments", () => {
    it("should return an array of comments", async () => {
      const mockComments = [{}, {}] as Comment[];
      mockCommentModel.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(mockComments),
          }),
        }),
      });

      const result = await service.listComments();

      expect(result).toEqual(mockComments);
    });
  });

  describe("listCommentsForPost", () => {
    it("should return an array of comments for the specified post", async () => {
      const postId = "postId";
      const mockComments = [{}, {}] as Comment[];
      mockCommentModel.find.mockReturnValue({
        sort: jest.fn().mockReturnValue({
          populate: jest.fn().mockReturnValue({
            exec: jest.fn().mockResolvedValue(mockComments),
          }),
        }),
      });

      const result = await service.listCommentsForPost(postId);

      expect(mockCommentModel.find).toHaveBeenCalledWith({ post: postId });
      expect(result).toEqual(mockComments);
    });
  });

  describe("getCommentById", () => {
    it("should return an comment", async () => {
      const commentId = "commentId";
      const mockComment = { _id: commentId, author: "test-user", message: "comment text" } as Comment;
      mockCommentModel.findById.mockReturnValue({
        populate: jest.fn().mockReturnValue({
          exec: jest.fn().mockResolvedValue(mockComment),
        }),
      });

      const result = await service.getCommentById(commentId);

      expect(result).toEqual(mockComment);
      expect(mockCommentModel.findById).toHaveBeenCalledWith(commentId);
    });
  });

  describe("createComment", () => {
    it("should create a new comment", async () => {
      const createCommentDto = { message: "test", post: "postId", author: "me" };
      const mockPost = { _id: "postId" };
      mockPostModel.findById.mockResolvedValue(mockPost);
      const mockSavedComment = { _id: "commentId", ...createCommentDto };
      mockCommentModel.save.mockReturnValue({
        populate: jest.fn().mockResolvedValue(mockSavedComment),
      });

      const result = await service.createComment(createCommentDto);

      expect(mockPostModel.findById).toHaveBeenCalledWith(createCommentDto.post);
      expect(result).toEqual(mockSavedComment);
    });

    it("should throw an error if post is not found", async () => {
      const createCommentDto = { message: "test", post: "postId", author: "me" };
      mockPostModel.findById.mockResolvedValue(null);

      await expect(service.createComment(createCommentDto)).rejects.toThrow("Post not found");
      expect(mockPostModel.findById).toHaveBeenCalledWith(createCommentDto.post);
    });
  });

  describe("updateComment", () => {
    it("should update a comment", async () => {
      const id = "commentId";
      const commentDto = { message: "Updated comment", post: "postId" };
      const currentUser = createUserMock("userId");
      const mockComment = { _id: id, author: currentUser._id } as Comment;
      mockCommentModel.findById.mockResolvedValue(mockComment);
      mockCommentModel.findByIdAndUpdate.mockReturnValue({
        exec: jest.fn().mockResolvedValue({ ...mockComment, ...commentDto }),
      });

      const result = await service.updateComment(id, commentDto, currentUser);

      expect(mockCommentModel.findById).toHaveBeenCalledWith(id);
      expect(mockCommentModel.findByIdAndUpdate).toHaveBeenCalledWith(id, commentDto, { new: true });
      expect(result).toEqual({ ...mockComment, ...commentDto });
    });

    it("should throw an error if comment is not found", async () => {
      const id = "commentId";
      const commentDto = { message: "Updated comment", post: "postId" };
      const currentUser = createUserMock("userId");
      mockCommentModel.findById.mockReturnValue(null);

      await expect(service.updateComment(id, commentDto, currentUser)).rejects.toThrow("Comment not found");
      expect(mockCommentModel.findById).toHaveBeenCalledWith(id);
    });

    it("should throw an error if user is not authorized to update the comment", async () => {
      const id = "commentId";
      const commentDto = { message: "Updated comment", post: "postId" };
      const currentUser = createUserMock("userId");
      const mockComment = { _id: id, author: "anotherUserId" } as Comment;
      mockCommentModel.findById.mockResolvedValue(mockComment);

      await expect(service.updateComment(id, commentDto, currentUser)).rejects.toThrow("Cannot update this comment");
      expect(mockCommentModel.findById).toHaveBeenCalledWith(id);
    });
  });

  describe("deleteComment", () => {
    it("should delete a comment", async () => {
      const id = "commentId";
      const currentUser = createUserMock("userId");
      const mockComment = { _id: id, author: currentUser._id } as Comment;
      mockCommentModel.findById.mockResolvedValue(mockComment);
      mockCommentModel.findByIdAndDelete.mockReturnValue({
        exec: jest.fn().mockResolvedValue(mockComment),
      });

      const result = await service.deleteComment(id, currentUser);

      expect(mockCommentModel.findById).toHaveBeenCalledWith(id);
      expect(mockCommentModel.findByIdAndDelete).toHaveBeenCalledWith(id);
      expect(result).toEqual(mockComment);
    });

    it("should throw an error if comment is not found", async () => {
      const id = "commentId";
      const currentUser = createUserMock("userId");
      mockCommentModel.findById.mockResolvedValue(null);

      await expect(service.deleteComment(id, currentUser)).rejects.toThrow("Comment not found");
      expect(mockCommentModel.findById).toHaveBeenCalledWith(id);
      expect(mockCommentModel.findByIdAndDelete).not.toHaveBeenCalled();
    });

    it("should throw an error if user is not authorized to delete the comment", async () => {
      const id = "commentId";
      const currentUser = createUserMock("userId");
      const mockComment = { _id: id, author: "anotherUserId" } as Comment;
      mockCommentModel.findById.mockResolvedValue(mockComment);

      await expect(service.deleteComment(id, currentUser)).rejects.toThrow("Cannot update this comment");
      expect(mockCommentModel.findById).toHaveBeenCalledWith(id);
      expect(mockCommentModel.findByIdAndDelete).not.toHaveBeenCalled();
    });
  });
});
