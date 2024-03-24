import { Grid } from "@mui/material";
import Comment from "../../models/Comment";
import CommentCard from "./CommentCard";

interface Props {
  comments: Comment[];
  onDelete: (commentId: string) => void;
}

export default function CommentGrid({ comments, onDelete }: Props) {
  return (
    <Grid container rowSpacing={3}>
      {comments.map((comment) => (
        <Grid item key={comment._id} xs={12} display="flex" justifyContent="center">
          <CommentCard comment={comment} onDelete={onDelete} />
        </Grid>
      ))}
    </Grid>
  );
}
