import Comment from "../../models/Comment";
import React, { useState } from "react";
import { Box, Button, Grid, TextField } from "@mui/material";

interface Props {
  postId: string;
  onCreate: (comment: Comment) => void;
}

export default function CreateComment({ postId, onCreate }: Props) {
  const [content, setContent] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (content.trim() !== "") {
      const comment = { post: postId, message: content };
      onCreate(comment);
      setContent("");
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Grid container columnSpacing={2} alignItems="flex-end" justifyContent="center">
        <Grid item xs={4}>
          <TextField
            fullWidth
            multiline
            rows={4}
            label="Please grace us with your invaluable insight"
            variant="outlined"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </Grid>
        <Grid item xs={1}>
          <Button type="submit" variant="contained" color="primary">
            Comment
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
