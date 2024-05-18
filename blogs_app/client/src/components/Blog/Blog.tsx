import { Stack } from "@mui/material";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import useUser from "../../contexts/user-context/useUser";
import Post from "../../models/Post";
import PostService from "../../services/Post.service";
import CreatePost from "../Post/CreatePost";
import PostGrid from "../Post/PostGrid";
import Divider from "@mui/material/Divider";

export default function Blog() {
  const [posts, setPosts] = useState<Post[]>([]);
  const { user } = useUser();
  const { userId } = useParams();

  useEffect(() => {
    PostService.listByAuthor(userId ?? "")
      .then((posts) => setPosts(posts))
      .catch((error) => {
        toast.error(error.message);
      });
  }, [userId]);

  const handleDeletePost = (postId: string) => {
    PostService.delete(postId)
      .then(() => {
        setPosts(posts.filter((post) => post._id !== postId));
        toast.success("Successfully deleted");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const handleCreatePost = (post: Post) => {
    PostService.create(post)
      .then((newPost) => {
        setPosts([newPost, ...posts]);
        toast.success("Successfully created");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  return (
    <Stack spacing={1}>
      {userId === user?.id && (
        <>
          <CreatePost onCreate={handleCreatePost} />
          <Divider component="div" role="presentation" sx={{ mt: 6 }} />
        </>
      )}
      <PostGrid posts={posts} onDelete={handleDeletePost} />
    </Stack>
  );
}
