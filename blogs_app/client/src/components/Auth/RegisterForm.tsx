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
import { useNavigate } from "react-router-dom";
import AuthService from "../../services/Auth.service";

export default function SignUp() {
  const navigate = useNavigate();

  const [isConfirmationError, setIsConfirmationError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<string[]>([]);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setIsConfirmationError(false);
    setErrors([]);

    if (data.get("password")?.toString() !== data.get("confirmPassword")?.toString()) {
      setIsConfirmationError(true);
      return;
    }

    try {
      await AuthService.register({
        username: data.get("username")?.toString(),
        email: data.get("email")?.toString(),
        password: data.get("password")?.toString(),
      });

      navigate("/login");
      toast.success("Account confirmation link sent");
    } catch (error: any) {
      setErrors(["Register error"]);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1 }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign-Up
        </Typography>
        {errors.length > 0 && (
          <Box>
            {errors.map((error, index) => (
              <Typography key={index} sx={{ color: "red", fontSize: 14 }}>
                • {error}
              </Typography>
            ))}
          </Box>
        )}
        <Box component="form" onSubmit={onSubmit}>
          <TextField margin="normal" required fullWidth id="username" name="username" label="Username" autoFocus />
          <TextField margin="normal" required fullWidth id="email" name="email" label="Email" type="email" />
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
          <TextField
            margin="normal"
            required
            fullWidth
            id="confirmPassword"
            name="confirmPassword"
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            InputProps={{
              endAdornment: (
                <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                  {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              ),
            }}
            error={isConfirmationError}
            helperText={isConfirmationError ? "Password and Confirm Password does not match" : null}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>
            Sign Up
          </Button>

          <Grid item sx={{ mt: 1, textAlign: "right" }}>
            <Link href="/login" variant="body2">
              Already have an account? Sign In
            </Link>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
