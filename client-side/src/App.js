import React from 'react';
import './App.css';
import { KanbanGrid } from './components/kanban-grid';
import CssBaseline from '@mui/material/CssBaseline';
import Container from '@mui/material/Container';
import FormDialogKanban from './components/dialog-form';

function App() {
  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="lg">
        <div
          style={{
            marginTop: '50px',
            fontSize: '20px',
          }}
        >
          <FormDialogKanban />
        </div>

        <div
          style={{
            marginTop: '5%',
          }}
        >
          <KanbanGrid />
        </div>
      </Container>
    </React.Fragment>
  );
}

export default App;
