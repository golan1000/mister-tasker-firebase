import React from 'react'

export const TaskPreview = ({ task }) => {
    console.log('task', task)
    if (!task) return <div>Loading...</div>
    return (
        <section>
            <div>{task.title}</div>
            <div>{task.importance}</div>
            <div>{task.status}</div>
            <div>{task.triesCount}</div>
        </section>
    )
}