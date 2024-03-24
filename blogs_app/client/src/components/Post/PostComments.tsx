import { Card, CardContent, CardHeader, Grid, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Comment from "../../models/Comment";
import Post from "../../models/Post";
import CommentService from "../../services/Comment.service";
import PostService from "../../services/Post.service";
import CommentGrid from "../Comment/CommentGrid";
import CreateComment from "../Comment/CreateComment";

export default function PostComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [post, setPost] = useState<Post>();

  const { postId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    PostService.getById(postId!)
      .then((post) => {
        setPost(post);
        CommentService.getAllForPost(postId!).then((comments) => setComments(comments));
      })
      .catch((error) => {
        toast.error(error.message);
        navigate("/users");
      });
  }, [postId, navigate]);

  const handleDeleteComment = (commentId: string) => {
    CommentService.delete(commentId)
      .then(() => {
        setComments(comments.filter((comment) => comment._id !== commentId));
        toast.success("Successfully deleted");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleCreateComment = (comment: Comment) => {
    CommentService.create(comment)
      .then((newComment) => {
        setComments([newComment, ...comments]);
        toast.success("Successfully created");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Stack spacing={2}>
      <Grid container justifyContent="center">
        <Card sx={{ width: "30%" }}>
          <CardHeader title={post?.author?.username} subheader={new Date(post?.createdAt!).toLocaleString("uk-UA")} />
          <CardContent>
            <Typography variant="body2" color="text.secondary">
              {post?.message}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
      <CreateComment postId={post?._id!} onCreate={handleCreateComment} />
      <CommentGrid comments={comments} onDelete={handleDeleteComment} />
    </Stack>
  );
}
