import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../redux/store'; 
import { addTask, deleteTask } from '../redux/slice/taskSlice';

import { 
  Box, Typography, TextField, Button, Radio, RadioGroup, 
  FormControlLabel, FormControl, FormLabel, Paper, Table, 
  TableBody, TableCell, TableContainer, TableHead, TableRow, 
  IconButton, Chip, Tooltip, Zoom
} from '@mui/material';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import AssignmentIcon from '@mui/icons-material/Assignment';

const Menu1 = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.todo.tasks);

  const [form, setForm] = useState({ name: '', status: 'Uncompleted' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;

    dispatch(addTask({
      id: Date.now(),
      name: form.name.trim(),
      status: form.status as 'Completed' | 'Uncompleted'
    }));

    setForm({ name: '', status: 'Uncompleted' }); 
  };

  const handleDelete = (id: number) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      dispatch(deleteTask(id));
    }
  };

  return (
    <Box sx={{ maxWidth: 900, mx: 'auto' }}>
      <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', gap: 2 }}>
        <AssignmentIcon color="primary" sx={{ fontSize: 40 }} />
        <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: -0.5 }}>
          Tasks
        </Typography>
      </Box>

      <Paper elevation={0} sx={{ p: 3, mb: 4, borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <Typography variant="subtitle2" sx={{ mb: 2, color: 'text.secondary', fontWeight: 600 }}>
          CREATE NEW TASK
        </Typography>
        <Box component="form" onSubmit={handleAddTask} sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'flex-end' }}>
          <TextField 
            label="What needs to be done?" 
            variant="standard" 
            name="name"
            value={form.name}
            onChange={handleInputChange}
            sx={{ flexGrow: 1, minWidth: '250px' }}
          />

          <FormControl component="fieldset">
            <FormLabel sx={{ fontSize: '0.75rem', fontWeight: 700 }}>PRIORITY STATUS</FormLabel>
            <RadioGroup row name="status" value={form.status} onChange={handleInputChange}>
              <FormControlLabel value="Uncompleted" control={<Radio size="small" />} label="Pending" />
              <FormControlLabel value="Completed" control={<Radio size="small" />} label="Done" />
            </RadioGroup>
          </FormControl>

          <Button 
            variant="contained" 
            type="submit" 
            disableElevation
            sx={{ height: 42, px: 4, borderRadius: 2, fontWeight: 600 }}
          >
            Add Task
          </Button>
        </Box>
      </Paper>

      <TableContainer component={Paper} elevation={0} sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}>
        <Table>
          <TableHead sx={{ bgcolor: 'grey.50' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>TASK DESCRIPTION</TableCell>
              <TableCell sx={{ fontWeight: 700, color: 'text.secondary' }}>STATUS</TableCell>
              <TableCell align="right" sx={{ fontWeight: 700, color: 'text.secondary' }}>ACTIONS</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} sx={{ py: 10, textAlign: 'center' }}>
                  <Typography variant="body1" color="text.disabled">
                    Your task list is empty. Start by adding one above!
                  </Typography>
                </TableCell>
              </TableRow>
            ) : (
              tasks.map((task) => (
                <TableRow key={task.id} hover>
                  <TableCell>
                    <Typography sx={{ 
                      fontWeight: 500,
                      textDecoration: task.status === 'Completed' ? 'line-through' : 'none',
                      color: task.status === 'Completed' ? 'text.disabled' : 'text.primary'
                    }}>
                      {task.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={task.status} 
                      size="small"
                      color={task.status === 'Completed' ? 'success' : 'primary'}
                      variant={task.status === 'Completed' ? 'filled' : 'outlined'}
                      sx={{ fontWeight: 600, fontSize: '0.7rem' }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Tooltip title="Delete Task" TransitionComponent={Zoom} arrow>
                      <IconButton onClick={() => handleDelete(task.id)} size="small" sx={{ color: 'error.light' }}>
                        <DeleteOutlineIcon fontSize="small" />
                      </IconButton>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Menu1;