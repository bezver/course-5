import { Button, CardActions, CardHeader, Grid } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import toast from "react-hot-toast";
import useUser from "../../contexts/user-context/useUser";
import Comment from "../../models/Comment";

interface Props {
  comment: Comment;
  onDelete: (commentId: string) => void;
}

export default function CommentCard({ comment, onDelete }: Props) {
  const { user } = useUser();
  return (
    <Card sx={{ width: "30%" }}>
      <CardHeader title={comment.author?.username} subheader={new Date(comment.createdAt!).toLocaleString("uk-UA")} />
      <CardContent>
        <Typography variant="body1" color="text.secondary" data-testid="comment-message-text">
          {comment.message}
        </Typography>
      </CardContent>
      <CardActions>
        {comment.author?._id === user?.id && (
          <Grid container>
            <Button size="small" onClick={() => onDelete(comment._id!)}>
              Delete
            </Button>
            <Button
              size="small"
              onClick={() => {
                toast.error("Not implemented");
              }}
            >
              Update
            </Button>
          </Grid>
        )}
      </CardActions>
    </Card>
  );
}
