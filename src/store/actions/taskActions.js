import taskService from '../../services/taskService'
import { firebaseService } from '../../services/firebase.service'
export function loadTasks() {
  console.log('load tasks actions')
  return async (dispatch, getState) => {
    try {
      await firebaseService.initFirebase()
      let tasks = await firebaseService.getDocuments('tasks', {})
      console.log('bla=', tasks)
      const { filterBy } = getState().taskModule
      // const tasks = await taskService.getTasks(filterBy)
      dispatch({ type: 'SET_TASKS', tasks })
    } catch (err) {
      console.log('err', err)
    }
  }
}

export function saveTask(taskToSave) {
  return async (dispatch) => {
    try {
      await firebaseService.initFirebase()
      let task = await firebaseService.saveDocument(
        'tasks',
        taskToSave,
        taskToSave.id,
      )
      // const task = await taskService.saveTask()
      dispatch({ type: 'UPDATE_TASK', task })
      // else dispatch({ type: 'ADD_TASK', task })
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
export function getTaskById(taskId) {
  console.log('STORE GET BY ID TASK')
  return async (dispatch) => {
    try {
      console.log('STORE GET BY ID=', taskId)
      await firebaseService.initFirebase()
      let task = await firebaseService.getDocument('tasks', taskId)
      console.log('task=', task)
      dispatch({ type: 'GET_BY_ID_CONTACT', taskId })
      return task
    } catch (err) {
      console.log('err=', err)
      throw new Error('not found')
    }
  }
}

export function getEmptyTask() {
  console.log('STORE GET EMPTY TASK')
  return () => {
    try {
      const emptyTask = taskService.getEmptyTask()
      return emptyTask
    } catch (err) {
      console.log('err=', err)
    }
  }
}
export function addTask(taskToSave) {
  return async (dispatch) => {
    try {
      await firebaseService.initFirebase()
      let task = await firebaseService.addDocument('tasks', taskToSave)
      // const task = await taskService.saveTask()
      // if (taskToSave._id) dispatch({ type: 'UPDATE_TASK', task })
      dispatch({ type: 'ADD_TASK', task })
    } catch (err) {
      console.log('err', err)
    }
  }
}
