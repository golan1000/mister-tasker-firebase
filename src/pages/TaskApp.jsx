import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { TaskList } from '../cmps/TaskList'
import { loadTasks } from '../store/actions/taskActions'

export const TaskApp = () => {


  useEffect(() => {
    dispatch(loadTasks())
  }, [])
  const dispatch = useDispatch()
  const { tasks } = useSelector(state => state.taskModule)

  if (!tasks) return <div>Loading...</div>
  return (
    <section>
      <table>

        <TaskList tasks={tasks}></TaskList>
      </table>
    </section>
  )
}
