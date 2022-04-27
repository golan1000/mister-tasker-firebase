import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TaskList } from '../cmps/TaskList'
import { loadTasks, removeTask } from '../store/actions/taskActions'

export const TaskApp = () => {


  // useEffect(() => {
  //   dispatch(loadTasks())
  // }, [])
  const dispatch = useDispatch()
  const { tasks } = useSelector(state => state.taskModule)

  const onRemoveTask = (ev, taskId) => {
    ev.stopPropagation()
    console.log('taskId', taskId)
    dispatch(removeTask(taskId))
  }

  const onRunTask = (ev, taskId) => {
    ev.stopPropagation()
    console.log(taskId)
  }

  if (!tasks) return <div>Loading...</div>
  return (
    <section className='task-app container'>

      <TaskList tasks={tasks} funcs={{ onRemove: onRemoveTask, onRun: onRunTask }}></TaskList>
    </section>
  )
}
