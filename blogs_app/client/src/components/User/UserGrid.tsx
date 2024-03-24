import User from '../../models/User';
import UserCard from './UserCard';
import UserService from '../../services/User.service';
import { Grid } from '@mui/material';
import { useEffect, useState } from 'react';

export default function UserGrid() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    UserService.getAll().then((users) => setUsers(users));
  }, []);

  return (
    <Grid container spacing={4} justifyContent="center">
      {users.map((user) => (
        <Grid item key={user._id} xs="auto">
          <UserCard user={user} />
        </Grid>
      ))}
    </Grid>
  );
}
