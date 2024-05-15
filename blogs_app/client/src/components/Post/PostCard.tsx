import { Button, CardActions, CardHeader, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import useUser from "../../contexts/user-context/useUser";
import Post from "../../models/Post";

interface Props {
  post: Post;
  onDelete: (postId: string) => void;
}

export default function PostCard({ post, onDelete }: Props) {
  const { user } = useUser();
  const navigate = useNavigate();

  return (
    <Card sx={{ width: "50%" }}>
      <CardHeader title={post.author?.username} subheader={new Date(post.createdAt!).toLocaleString("uk-UA")} />
      <CardContent>
        <Typography variant="body2" color="text.secondary" data-testid="post-message">
          {post.message}
        </Typography>
      </CardContent>
      <CardActions>
        {post.author?._id === user?.id && (
          <Grid container>
            <Button size="small" onClick={() => onDelete(post._id!)}>
              Delete
            </Button>
          </Grid>
        )}
        <Grid container justifyContent="flex-end" flex={1}>
          <Button
            size="small"
            onClick={() => {
              navigate(`/posts/${post._id}/comments`);
            }}
          >
            Comments
          </Button>
        </Grid>
      </CardActions>
    </Card>
  );
}
