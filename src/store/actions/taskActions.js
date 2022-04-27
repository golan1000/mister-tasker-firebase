import taskService from '../../services/taskService'

export function loadTasks() {
  return async (dispatch, getState) => {
    try {
      const { filterBy } = getState().taskModule
      const tasks = await taskService.getTasks(filterBy)
      dispatch({ type: 'SET_TASKS', tasks })
    } catch (err) {
      console.log('err', err)
    }
  }
}

export function saveTask(taskToSave) {
  return async (dispatch) => {
    try {
      const task = await taskService.saveTask()
      if (taskToSave._id) dispatch({ type: 'UPDATE_TASK', task })
      else dispatch({ type: 'ADD_TASK', task })
    } catch (err) {
      console.log('err', err)
    }
  }
}

export function removeTask(taskId) {
  console.log('taskId', taskId)
  return async (dispatch) => {
    try {
      await taskService.deleteTask(taskId)
      dispatch({ type: 'REMOVE_TASK', taskId })
    } catch (err) {
      console.log('err', err)
    }
  }
}

export function setFilter(filterBy) {
  return async (dispatch) => {
    dispatch({ type: 'SET_FILTER', filterBy })
  }
}
