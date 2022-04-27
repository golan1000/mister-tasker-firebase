import React from 'react'
import { TaskPreview } from './TaskPreview'

export const TaskList = ({ tasks }) => {
    if (!tasks) return <div>Loading...</div>
    return (
        <section>
            <div>
                <div>title!!!!!!!!!!</div>
                <div>importance</div>
                <div>status</div>
                <div>triesCount</div>
            </div>
            {tasks.map(task =>
                <TaskPreview task={task} key={task._id} />
            )}
        </section>)
}