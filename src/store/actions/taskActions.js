import taskService from '../../services/taskService'

export function loadTasks() {
  return async (dispatch, getState) => {
    try {
      const { filterBy } = getState().taskModule
      const tasks = await taskService.getTasks(filterBy)
      dispatch({ type: 'SET_CONTACTS', tasks })
    } catch (err) {
      console.log('err', err)
    }
  }
}

export function saveContact(taskToSave) {
  return async (dispatch) => {
    try {
      const task = await taskService.saveContact()
      if (taskToSave._id) dispatch({ type: 'UPDATE_CONTACT', task })
      else dispatch({ type: 'ADD_CONTACT', task })
    } catch (err) {
      console.log('err', err)
    }
  }
}

export function removeContact(taskId) {
  return async (dispatch) => {
    try {
      await taskService.deleteContact(taskId)
      dispatch({ type: 'REMOVE_CONTACT', taskId })
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
