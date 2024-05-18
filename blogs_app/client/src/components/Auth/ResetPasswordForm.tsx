import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Box, Button, Container, CssBaseline, IconButton, TextField, Typography } from "@mui/material";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import AuthService from "../../services/Auth.service";
import { LoginService } from "../../services/Login.service";

export default function ResetPasswordForm() {
  const navigate = useNavigate();
  const { resetToken } = useParams();

  const [isConfirmationError, setIsConfirmationError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [errors, setErrors] = useState<string[]>([]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    setIsConfirmationError(false);
    setErrors([]);

    if (data.get("password")?.toString() !== data.get("confirmPassword")?.toString()) {
      setIsConfirmationError(true);
      return;
    }

    try {
      if (resetToken) {
        AuthService.resetPassword(resetToken, data.get("password")?.toString() ?? "")
          .then((authToken) => {
            LoginService.login(authToken);
            toast.success("Reset password success");
          })
          .catch((error) => {
            toast.error(error.message);
          });
      } else {
        navigate("/login");
      }
    } catch (error: any) {
      setErrors(Array.isArray(error.message) ? error.message : [error.message]);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 12,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography component="h1" variant="h5">
          Reset Password
        </Typography>
        {errors.length > 0 && (
          <Box>
            {errors.map((error) => (
              <Typography key={error} sx={{ color: "red", fontSize: 14 }}>
                • {error}
              </Typography>
            ))}
          </Box>
        )}
        <Box component="form" onSubmit={handleSubmit}>
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
            Reset
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
