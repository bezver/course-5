import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import Post from "../../models/Post";

interface Props {
  onCreate: (post: Post) => void;
}

export default function CreatePost({ onCreate }: Props) {
  const [content, setContent] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (content.trim() !== "") {
      onCreate({ message: content });
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
            label="Share your thoughts :)"
            variant="outlined"
            value={content}
            onChange={(event) => setContent(event.target.value)}
          />
        </Grid>
        <Grid item xs={1}>
          <Button type="submit" variant="contained" color="primary">
            Post
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
}
