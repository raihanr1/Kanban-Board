import {
  ACTION_LOADING,
  ACTION_CREATE_KANBAN,
  ACTION_ERROR,
  ACTION_DELETE_TASK,
  ACTION_UPDATE_STAGE_TASK,
} from '../action-type/action-type';

let initialState = {
  loading: false,
  error: null,
  board_data: [
    {
      task_stage: 'Backlog',
      task_data: [],
    },
    {
      task_stage: 'To Do',
      task_data: [],
    },
    {
      task_stage: 'Ongoing',
      task_data: [],
    },
    {
      task_stage: 'Done',
      task_data: [],
    },
  ],
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case ACTION_CREATE_KANBAN:
      let board_data = state.board_data;
      for (let i = 0; i < board_data.length; i++) {
        if (board_data[i].task_stage === 'Backlog') {
          let lastIdTask =
            board_data[i].task_data[board_data[i].task_data.length - 1]?.id;
          board_data[i].task_data.push({
            id: lastIdTask ? lastIdTask + 1 : 1,
            ...action.payload.data,
          });
        }
      }
      let isUniqueTaskName = board_data[0].task_data.filter(
        el => el.task_name === action.payload.data.task_name,
      );
      let binary = null;
      if (isUniqueTaskName.length > 1) {
        binary = Math.random().toString(2).substr(2, 8);
        board_data[0].task_data.pop();
      }
      return {
        ...state,
        loading: false,
        board_data: board_data,
        error: binary,
      };
    case ACTION_DELETE_TASK:
      let board_data_delete = state.board_data;
      for (let i = 0; i < board_data_delete.length; i++) {
        if (board_data_delete[i].task_stage === action.payload.taskStage) {
          const updateAfterDelete = board_data_delete[i].task_data.filter(
            el => el.id !== action.payload.id,
          );
          board_data_delete[i].task_data = updateAfterDelete;
        }
      }
      return {
        ...state,
        board_data: board_data_delete,
      };
    case ACTION_UPDATE_STAGE_TASK:
      let board_data_update = state.board_data;
      let findDataBeforeTaskUpdate = null;
      for (let i = 0; i < board_data_update.length; i++) {
        if (board_data_update[i].task_stage === action.payload.task_stage) {
          findDataBeforeTaskUpdate = board_data_update[i].task_data.filter(
            el => el.id === action.payload.id,
          );
          const dataUpdateStage = board_data_update[i].task_data.filter(
            el => el.id !== action.payload.id,
          );
          board_data_update[i].task_data = dataUpdateStage;
        }
      }
      for (let i = 0; i < board_data_update.length; i++) {
        if (action.payload.update_stage === board_data_update[i].task_stage) {
          board_data_update[i].task_data = [
            ...board_data_update[i].task_data,
            findDataBeforeTaskUpdate[0],
          ];
        }
      }
      return {
        ...state,
        board_data: board_data_update,
      };
    case ACTION_LOADING:
      return {
        ...state,
        loading: action.payload.loading,
      };
    case ACTION_ERROR:
      return {
        ...state,
        error: action.payload.error,
      };
    default:
      return state;
  }
}
