import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar, Box, Paper, Typography } from "@mui/material";
import useUser from "../../contexts/user-context/useUser";

export default function UserProfile() {
  const avatarSize: number = 200;
  const { user } = useUser();

  return (
    <Paper
      sx={{
        padding: 4,
        margin: "auto",
        maxWidth: 300,
      }}
      elevation={2}
    >
      <Avatar sx={{ width: avatarSize, height: avatarSize, margin: "auto" }}>
        <AccountCircleIcon sx={{ fontSize: avatarSize }} />
      </Avatar>
      <Box textAlign="center" mt={6}>
        <Typography variant="h6">{user?.username}</Typography>
      </Box>
    </Paper>
  );
}
