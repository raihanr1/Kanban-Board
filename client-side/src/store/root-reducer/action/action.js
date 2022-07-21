import {
  ACTION_LOADING,
  ACTION_CREATE_KANBAN,
  ACTION_DELETE_TASK,
  ACTION_UPDATE_STAGE_TASK,
} from '../action-type/action-type';

function handleLoading(dispatch) {
  dispatch({
    type: ACTION_LOADING,
    payload: {
      loading: true,
    },
  });
}

export function createNewTask(data) {
  return (dispatch, getState) => {
    handleLoading(dispatch);
    dispatch({
      type: ACTION_CREATE_KANBAN,
      payload: {
        data,
      },
    });
  };
}

export function deleteTask(taskStage, id) {
  return (dispatch, getState) => {
    dispatch({
      type: ACTION_DELETE_TASK,
      payload: {
        taskStage,
        id,
      },
    });
  };
}

export function updateTaskStage(task_stage, id, update_stage) {
  return (dispatch, getState) => {
    dispatch({
      type: ACTION_UPDATE_STAGE_TASK,
      payload: {
        task_stage,
        id,
        update_stage,
      },
    });
  };
}
