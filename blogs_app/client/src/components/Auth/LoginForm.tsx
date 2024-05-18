import { Visibility, VisibilityOff } from "@mui/icons-material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { Grid, IconButton, Link } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import AuthService from "../../services/Auth.service";
import { LoginService } from "../../services/Login.service";

export default function SignIn() {
  const [username, setUsername] = useState<string>("");
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    try {
      const authToken = await AuthService.login({
        username: data.get("username")?.toString(),
        password: data.get("password")?.toString(),
      });

      LoginService.login(authToken);
    } catch (error: any) {
      setErrors(Array.isArray(error.message) ? error.message : [error.message]);
    }
  };

  const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleForgotPassword = async (): Promise<void> => {
    try {
      if (username) {
        await AuthService.sendResetPasswordLink(username);
        toast.success("Reset password link sent");
      } else {
        setErrors(["Username field is empty"]);
      }
    } catch (error: any) {
      setErrors(Array.isArray(error.message) ? error.message : [error.message]);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign-In
        </Typography>
        {errors.length > 0 && (
          <Box>
            {errors.map((error) => (
              <Typography key={error} sx={{ color: "red", fontSize: 12 }}>
                • {error}
              </Typography>
            ))}
          </Box>
        )}
        <Box component="form" onSubmit={onSubmit}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            name="username"
            label="Username"
            value={username}
            onChange={onUsernameChange}
            autoFocus
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="password"
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Sign In
          </Button>
          <Grid container sx={{ mt: 1 }}>
            <Grid item xs>
              <Link variant="body2" onClick={handleForgotPassword} style={{ cursor: "pointer" }}>
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="/register" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
