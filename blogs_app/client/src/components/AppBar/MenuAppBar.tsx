import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import BookIcon from "@mui/icons-material/Book";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import PeopleIcon from "@mui/icons-material/People";
import { Divider, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import AppBar from "@mui/material/AppBar";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useUser from "../../contexts/user-context/useUser";
import { LoginService } from "../../services/Login.service";

export default function MenuAppBar() {
  const { user } = useUser();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const onMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const onMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar>
      <Toolbar>
        <IconButton size="medium" edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }} onClick={onMenuClick}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }} data-testid="app-name">
          Blogs
        </Typography>
      </Toolbar>
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={onMenuClose}>
        <MenuItem
          onClick={() => {
            onMenuClose();
            navigate(`/blogs/${user?.id}`);
          }}
          data-testid="my-blog-menu-item"
        >
          <ListItemIcon>
            <BookIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>My Blog</ListItemText>
        </MenuItem>
        <MenuItem
          onClick={() => {
            onMenuClose();
            navigate("/users");
          }}
        >
          <ListItemIcon>
            <PeopleIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Users</ListItemText>
        </MenuItem>
        <Divider />
        <MenuItem
          onClick={() => {
            onMenuClose();
            navigate("/profile");
          }}
          data-testid="profile-menu-item"
        >
          <ListItemIcon>
            <AssignmentIndIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Profile</ListItemText>
        </MenuItem>
        <MenuItem onClick={LoginService.logout}>
          <ListItemIcon>
            <LogoutIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText>Sign Out</ListItemText>
        </MenuItem>
      </Menu>
    </AppBar>
  );
}
