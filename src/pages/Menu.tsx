import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { type RootState } from '../redux/store'; 
import { addTask, deleteTask } from '../redux/slice/taskSlice';

import { 
  Box, Typography, TextField, Button, Radio, RadioGroup, 
  FormControlLabel, FormControl, FormLabel, Paper, Table, 
  TableBody, TableCell, TableContainer, TableHead, TableRow, 
  IconButton, Chip 
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';

const Menu1 = () => {
  const dispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.todo.tasks);

  const [taskName, setTaskName] = useState('');
  const [status, setStatus] = useState<'Completed' | 'Uncompleted'>('Uncompleted');

  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!taskName.trim()) return;

    dispatch(addTask({
      id: Date.now(),
      name: taskName,
      status: status
    }));

    setTaskName(''); 
    setStatus('Uncompleted');
  };

  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', mt: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', color: '#1976d2' }}>
        Task Management
      </Typography>

      <Paper elevation={3} sx={{ p: 3, mb: 4, borderRadius: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Add New Task</Typography>
        <Box component="form" onSubmit={handleAddTask} sx={{ display: 'flex', flexWrap: 'wrap', gap: 3, alignItems: 'center' }}>
          <TextField 
            label="Task Name" 
            variant="outlined" 
            size="small"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
            sx={{ flexGrow: 1, minWidth: '200px' }}
          />

          <FormControl>
            <FormLabel sx={{ fontSize: '0.8rem' }}>Status</FormLabel>
            <RadioGroup 
              row 
              value={status} 
              onChange={(e) => setStatus(e.target.value as 'Completed' | 'Uncompleted')}
            >
              <FormControlLabel value="Uncompleted" control={<Radio size="small" />} label="Uncompleted" />
              <FormControlLabel value="Completed" control={<Radio size="small" />} label="Completed" />
            </RadioGroup>
          </FormControl>

          <Button variant="contained" type="submit" sx={{ height: '40px', px: 4 }}>
            Add Task
          </Button>
        </Box>
      </Paper>

      <TableContainer component={Paper} elevation={3} sx={{ borderRadius: 2 }}>
        <Table>
          <TableHead sx={{ bgcolor: '#f5f5f5' }}>
            <TableRow>
              <TableCell sx={{ fontWeight: 'bold' }}>Task Name</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 'bold' }} align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {tasks.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} align="center">No tasks found. Add one above!</TableCell>
              </TableRow>
            ) : (
              tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>
                    <Typography sx={{ 
                      textDecoration: task.status === 'Completed' ? 'line-through' : 'none',
                      color: task.status === 'Completed' ? 'text.secondary' : 'text.primary'
                    }}>
                      {task.name}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip 
                      label={task.status} 
                      color={task.status === 'Completed' ? 'success' : 'warning'} 
                      size="small" 
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton onClick={() => dispatch(deleteTask(task.id))} color="error">
                      <DeleteIcon />
                    </IconButton>
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