import React, { useState } from 'react'

export const TaskPreview = ({ task, funcs }) => {
    const [isDetails, setIsDetails] = useState(false)
    const toggleDetails = () => {
        setIsDetails(preIsDetails => !preIsDetails)
    }

    if (!task) return <div>Loading...</div>
    return (
        <>
            <section className='task-preview' onClick={toggleDetails}>
                <section className='tp-preview'>
                    <div className='tp-title td'>{task.title}</div>
                    <div className='tp-importance td'>{task.importance}</div>
                    <div className={`tp-status td ${task.status.toLocaleLowerCase()}`}>{task.status}</div>
                    <div className='tp-triesCount td'>{task.triesCount}</div>
                    <div className='tp-action td'>{
                        task.status === 'done' && <button className='delete-btn' onClick={(ev) => funcs.onRemove(ev, task.id)}>Delete</button>
                        || (task.status === 'new' || task.status === 'fail') && <button className='run-btn' onClick={(ev) => funcs.onRun(ev, task.id)}>Retry</button>}</div>
                </section>
                {isDetails &&
                    <section className='task-details'>
                        <p className='tp-d-title'>Description:</p>
                        <p>{task.description}</p>
                        <p className='tp-d-title'>Errors:</p>
                        {task.errors.length && <p>No Errors</p> ||

                            task.errors.map(err =>
                                <div>
                                    <pre>{JSON.stringify(err, null, 2)}</pre>
                                </div>)
                        }

                    </section>

                }
            </section>
        </>
    )
}