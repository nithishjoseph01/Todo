import { Container, Box, Typography, Button } from "@mui/material";

export default function Dashboard() {
  return (
    <Container>
      <Typography variant="h5">Dashboard</Typography>

      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Box sx={{ border: "1px solid #ccc", p: 2, flex: 1 }}>
          <Typography>Total Users</Typography>
          <Typography variant="h6">120</Typography>
        </Box>

        <Box sx={{ border: "1px solid #ccc", p: 2, flex: 1 }}>
          <Typography>Total Orders</Typography>
          <Typography variant="h6">45</Typography>
        </Box>
      </Box>

      <Button sx={{ mt: 2 }} variant="contained">
        Refresh
      </Button>
    </Container>
  );
}
