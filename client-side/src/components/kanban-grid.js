import * as React from 'react';
import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { KanbanCard } from './card';
import { useSelector } from 'react-redux';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const KanbanRow = () => {
  const { board_data } = useSelector(state => state.user);
  return (
    <React.Fragment>
      {board_data.map((el, i) => {
        return (
          <Grid item xs={3} key={i}>
            <Item>
              {el.task_stage}
              {el.task_stage === 'Backlog'
                ? ' [0]'
                : el.task_stage === 'To Do'
                ? ' [1]'
                : el.task_stage === 'Ongoing'
                ? ' [2]'
                : ' [3]'}
            </Item>
            <Box
              sx={{
                marginTop: '5%',
                height: '700px',
                overflow: 'auto',
              }}
            >
              {el.task_data?.length
                ? el.task_data.map((task, j) => {
                    return (
                      <Box
                        sx={{
                          marginTop: '5%',
                        }}
                        key={j}
                      >
                        <KanbanCard
                          key={j}
                          data={{ ...task, task_stage: el.task_stage }}
                        />
                      </Box>
                    );
                  })
                : null}
            </Box>
          </Grid>
        );
      })}
    </React.Fragment>
  );
};

export function KanbanGrid() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid container item spacing={3}>
          <KanbanRow />;
        </Grid>
      </Grid>
    </Box>
  );
}
