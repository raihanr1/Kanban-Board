import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useDispatch, useSelector } from 'react-redux';
import { createNewTask } from '../store/root-reducer/action/action';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function FormDialogKanban() {
  const [open, setOpen] = React.useState(false);
  const [openInputList, setOpenInputList] = React.useState(false);
  const [newList, setNewList] = React.useState('');
  const [board, setBoard] = React.useState({
    task_name: '',
    task_list: [],
  });
  const { loading, error } = useSelector(state => state.user);

  const dispatch = useDispatch();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setBoard({
      task_name: '',
      task_list: [],
    });
    setOpen(false);
  };

  const handleClickOpenCreateList = () => {
    setOpenInputList(true);
  };

  const handleCloseCreateList = action => {
    if (action === 'add' && newList) {
      setBoard({
        ...board,
        task_list: [
          ...board.task_list,
          {
            task: newList,
          },
        ],
      });
    }
    setNewList('');
    setOpen(true);
    setOpenInputList(false);
  };

  const handleDataSubmit = () => {
    dispatch(createNewTask(board));
    setBoard({
      task_name: '',
      task_list: [],
    });
    setOpen(false);
  };

  React.useEffect(() => {
    if (open && openInputList) {
      setOpen(false);
    }
  }, [open, openInputList]);

  React.useEffect(() => {
    if (error) {
      toast('Task Name Is Unique', {
        type: 'error',
      });
    }
  }, [error]);
  return (
    <div>
      <center>
        <Button
          size="small"
          startIcon={<AddIcon />}
          onClick={handleClickOpen}
        />
        Otto Digital Kanban Board
      </center>
      <ToastContainer />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create New Board</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Name"
            fullWidth
            variant="standard"
            value={board.task_name}
            onChange={e => setBoard({ ...board, task_name: e.target.value })}
          />
          <Button
            sx={{
              marginTop: '20px',
            }}
            size="small"
            variant="text"
            startIcon={<AddIcon />}
            onClick={handleClickOpenCreateList}
          >
            Task List
          </Button>
          <List
            sx={{
              width: '100%',
              maxWidth: 360,
              bgcolor: 'background.paper',
              position: 'relative',
              overflow: 'auto',
              maxHeight: 300,
              '& ul': { padding: 0 },
            }}
            subheader={<li />}
          >
            <li>
              <ul>
                {board.task_list.map((data, i) => (
                  <ListItem key={i}>
                    <ListItemText primary={`${i + 1}. ${data.task}`} />
                  </ListItem>
                ))}
              </ul>
            </li>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            onClick={handleDataSubmit}
            disabled={!board.task_name ? true : false}
          >
            {loading ? 'load' : 'Submit'}
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={openInputList} onClose={handleCloseCreateList}>
        <DialogTitle>Add List Task</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Task Name"
            fullWidth
            variant="standard"
            value={newList}
            onChange={e => setNewList(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleCloseCreateList('cancel')}>
            Cancel
          </Button>
          <Button onClick={() => handleCloseCreateList('add')}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
