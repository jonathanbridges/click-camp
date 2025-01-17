import { Box, Button, Container, Typography } from "@mui/material";
import { createRoute, useNavigate } from "@tanstack/react-router";
import { rootRoute } from "./__root";

function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        height: "100vh",
        backgroundImage: "url('https://app-name-seeds.s3.us-west-1.amazonaws.com/404.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          sx={{
            color: "white",
            marginBottom: 3,
            textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
            fontWeight: "bold",
          }}
        >
          Let's get you back on track
        </Typography>
        <Button
          variant="contained"
          size="large"
          onClick={() => navigate({ to: "/" })}
          sx={{
            backgroundColor: "white",
            color: "primary.main",
            "&:hover": {
              backgroundColor: "grey.100",
            },
            padding: "12px 24px",
            fontSize: "1.2rem",
          }}
        >
          Return to Home
        </Button>
      </Container>
    </Box>
  );
}

export const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  component: NotFound,
}); 