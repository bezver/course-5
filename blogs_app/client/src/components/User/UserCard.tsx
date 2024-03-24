import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Avatar, CardActionArea } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import User from "../../models/User";

interface Props {
  user: User;
}

export default function UserCard({ user }: Props) {
  const avatarSize: number = 160;
  const navigate = useNavigate();

  return (
    <Card>
      <CardActionArea
        onClick={() => {
          navigate(`/blogs/${user._id}`);
        }}
      >
        <Avatar sx={{ width: avatarSize, height: avatarSize, margin: 2 }}>
          <AccountCircleIcon sx={{ fontSize: avatarSize }} />
        </Avatar>
        <CardContent>
          <Typography sx={{ display: "flex", justifyContent: "center" }} variant="h5">
            {user.username}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
