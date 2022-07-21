import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

export default function AlertDialog({ open, handleClose, task_name }) {
  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{'Delete Task'}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Do You Really Want To Delete {task_name} Task?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose('Cancel')}>Cancel</Button>
          <Button onClick={() => handleClose('Delete')} autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
