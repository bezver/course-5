import { HttpException } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AuthGuard } from "../../../src/auth/auth.guard";
import { CommentController } from "../../../src/comment/comment.controller";
import { CommentService } from "../../../src/comment/comment.service";
import { PostService } from "../../../src/post/post.service";
import { UserService } from "../../../src/user/user.service";

describe("CommentController", () => {
  let controller: CommentController;
  let commentService: CommentService;
  let userService: UserService;
  let postService: PostService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CommentController],
      providers: [
        {
          provide: CommentService,
          useValue: {
            listComments: jest.fn(),
            listCommentsForPost: jest.fn(),
            getCommentById: jest.fn(),
            createComment: jest.fn(),
            updateComment: jest.fn(),
            deleteComment: jest.fn(),
          },
        },
        {
          provide: UserService,
          useValue: {
            getById: jest.fn(),
          },
        },
        {
          provide: PostService,
          useValue: {
            getById: jest.fn(),
          },
        },
      ],
    })
      .overrideGuard(AuthGuard)
      .useValue({
        canActivate: () => Promise.resolve(true),
      })
      .compile();

    controller = module.get<CommentController>(CommentController);
    commentService = module.get<CommentService>(CommentService);
    userService = module.get<UserService>(UserService);
    postService = module.get<PostService>(PostService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });

  describe("list", () => {
    it("should list comments if no postId is provided", async () => {
      const mockedComments = [{}, {}];
      // @ts-expect-error Mocked service
      commentService.listComments.mockResolvedValue(mockedComments);

      const result = await controller.list(null);

      expect(result).toEqual(mockedComments);
      expect(commentService.listComments).toHaveBeenCalled();
    });

    it("should list comments for a valid postId", async () => {
      const postId = "621b8ff21c8e915f151b4d23";
      const mockedComments = [{}, {}];
      // @ts-expect-error Mocked service
      postService.getById.mockResolvedValue({});
      // @ts-expect-error Mocked service
      commentService.listCommentsForPost.mockResolvedValue(mockedComments);

      const result = await controller.list(postId);

      expect(postService.getById).toHaveBeenCalledWith(postId);
      expect(commentService.listCommentsForPost).toHaveBeenCalledWith(postId);
      expect(result).toEqual(mockedComments);
    });

    it("should throw 400 error if postId is invalid", async () => {
      const invalidPostId = "invalidPostId";
      const errorMessage = "Invalid post id";
      await expect(controller.list(invalidPostId)).rejects.toThrow(new HttpException(errorMessage, 400));
    });

    it("should throw 404 error if post is not found", async () => {
      const postId = "621b8ff21c8e915f151b4d23";
      const errorMessage = "Post not found";
      // @ts-expect-error Mocked service
      postService.getById.mockResolvedValue(null);

      await expect(controller.list(postId)).rejects.toThrow(new HttpException(errorMessage, 404));
    });
  });

  describe("getById", () => {
    it("should get comment by id", async () => {
      const mockedComment = {};
      // @ts-expect-error Mocked service
      commentService.getCommentById.mockResolvedValue(mockedComment);

      const result = await controller.getById("621b8ff21c8e915f151b4d23");

      expect(result).toEqual(mockedComment);
      expect(commentService.getCommentById).toHaveBeenCalledWith("621b8ff21c8e915f151b4d23");
    });

    it("should throw 400 error if commentId is invalid", async () => {
      const invalidId = "invalidId";
      await expect(controller.getById(invalidId)).rejects.toThrow(new HttpException("Invalid comment id", 400));
    });

    it("should throw 404 error if comment is not found", async () => {
      const commentId = "621b8ff21c8e915f151b4d23";
      const errorMessage = "Comment not found";
      // @ts-expect-error Mocked service
      commentService.getCommentById.mockResolvedValue(null);

      await expect(controller.getById(commentId)).rejects.toThrow(new HttpException(errorMessage, 404));
    });
  });

  describe("create", () => {
    it("should create a new comment", async () => {
      const mockedCommentDto = { message: "test", post: "postId", author: "me" };
      const mockedRequest = { user: { id: "userId" } };
      // @ts-expect-error Mocked service
      userService.getById.mockResolvedValue({});
      // @ts-expect-error Mocked service
      commentService.createComment.mockResolvedValue({});

      const result = await controller.create(mockedRequest, mockedCommentDto);

      expect(result).toEqual({});
      expect(userService.getById).toHaveBeenCalledWith("userId");
      expect(commentService.createComment).toHaveBeenCalledWith({ author: "userId", ...mockedCommentDto });
    });
  });
});
