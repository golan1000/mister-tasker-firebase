import React from 'react'
import { TaskPreview } from './TaskPreview'

export const TaskList = ({ tasks, funcs }) => {
    if (!tasks) return <div>Loading...</div>
    return (
        <section className='task-list'>
            <div className='thead'>
                <div className='td'>Title</div>
                <div className='td'>Importance</div>
                <div className='td'>Status</div>
                <div className='td'>Tries Count</div>
                <div className='td'>Actions</div>
            </div>
            {tasks.map(task =>
                <TaskPreview task={task} funcs={funcs} key={task.id} />
            )}
        </section>)
}