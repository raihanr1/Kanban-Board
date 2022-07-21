import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import Stack from '@mui/material/Stack';
import { useDispatch } from 'react-redux';
import AlertDialog from './alert-dialog';
import {
  deleteTask,
  updateTaskStage,
} from '../store/root-reducer/action/action';

export function KanbanCard({ data }) {
  const [taskStage, setTaskStage] = React.useState('');
  const [id, setId] = React.useState(null);
  const [openConfirmation, setOpenConfirmation] = React.useState(false);

  const dispatch = useDispatch();

  const onDeleteTaskConfirmation = (task_stage, id) => {
    setTaskStage(task_stage);
    setId(id);
    setOpenConfirmation(true);
  };

  const onDeleteTask = action => {
    if (action === 'Delete') {
      dispatch(deleteTask(taskStage, id));
      setTaskStage('');
      setId(null);
    }
    setOpenConfirmation(false);
  };

  const handleUpdateTaskStage = (action, task_stage, id) => {
    let update_stage = '';

    if (task_stage === 'Backlog' && action === 'Forward') {
      update_stage = 'To Do';
    } else if (task_stage === 'To Do' && action === 'Forward') {
      update_stage = 'Ongoing';
    } else if (task_stage === 'Ongoing' && action === 'Forward') {
      update_stage = 'Done';
    } else if (task_stage === 'To Do' && action === 'Back') {
      update_stage = 'Backlog';
    } else if (task_stage === 'Ongoing' && action === 'Back') {
      update_stage = 'To Do';
    } else {
      update_stage = 'Ongoing';
    }

    dispatch(updateTaskStage(task_stage, id, update_stage));
  };
  return (
    <Box sx={{ width: '100%' }}>
      <AlertDialog
        open={openConfirmation}
        handleClose={onDeleteTask}
        task_name={data.task_name}
      />
      <Stack spacing={2}>
        <Card sx={{ minWidth: 240 }}>
          <CardContent>
            <Typography variant="h5" component="div">
              {data.task_name}
            </Typography>
            <Typography sx={{ mb: 1.5 }} color="text.secondary">
              Task List :
            </Typography>
            {data.task_list.length
              ? data.task_list.map((el, i) => {
                  return (
                    <Typography variant="body2" key={i}>
                      {i + 1}. {el.task}
                    </Typography>
                  );
                })
              : 'Empty Task List'}
          </CardContent>
          <CardActions>
            <div style={{ display: 'inline-flex' }}>
              {data.task_stage === 'Backlog' ? null : (
                <Button
                  size="small"
                  startIcon={<ArrowBackIcon />}
                  onClick={() =>
                    handleUpdateTaskStage('Back', data.task_stage, data.id)
                  }
                />
              )}

              {data.task_stage === 'Done' ? null : (
                <Button
                  size="small"
                  startIcon={<ArrowForwardIcon />}
                  onClick={() =>
                    handleUpdateTaskStage('Forward', data.task_stage, data.id)
                  }
                />
              )}
              <Button
                size="small"
                startIcon={<DeleteIcon />}
                onClick={() =>
                  onDeleteTaskConfirmation(data.task_stage, data.id)
                }
              />
            </div>
          </CardActions>
        </Card>
      </Stack>
    </Box>
  );
}
