import { useEffect, useState } from "react";
import { Container, Typography, CircularProgress } from "@mui/material";

export default function ApiApp() {
  const [users, setUsers] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to fetch users");
        setLoading(false);
      });
  }, []);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container>
      <Typography variant="h6">Users</Typography>
      {users.map((user:any) => (
        <Typography key={user.id}>{user.name}</Typography>
      ))}
    </Container>
  );
}
