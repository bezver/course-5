import { Container, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { Outlet } from "react-router-dom";
import MenuAppBar from "./AppBar/MenuAppBar";

// Configure here
const theme = createTheme({});

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <div className="App">
        <MenuAppBar />
        <Container maxWidth="xl" sx={{ marginTop: 12 }}>
          <Outlet />
        </Container>
      </div>
    </ThemeProvider>
  );
}
