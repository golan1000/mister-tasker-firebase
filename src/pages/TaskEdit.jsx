import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveTask, removeTask, addTask, loadTasks, getEmptyTask, getTaskById } from '../store/actions/taskActions';
import taskService from '../services/taskService';
import { firebaseService } from '../services/firebase.service';
import { useForm } from '../hooks/useForm';

export const TaskEdit = () => {
  // const [task1, setTask1] = useState(null);
  const params = useParams();

  const [task, handleChange, setTask] = useForm(null);
  const { tasks } = useSelector((state) => state.taskModule);
  const dispatch = useDispatch();

  const onSaveTask = async (ev) => {
    ev.preventDefault();
    if (task.id) {
      console.log('save!');
      dispatch(saveTask(task));
    } else {
      console.log('create!');
      dispatch(addTask(task));
    }
  };

  const onLoadTasks = async () => {
    dispatch(loadTasks());
  };
  // const loadTask = async (id = null) => {
  //   if (task) {
  //     console.log('there is already a task');

  //     return;
  //   }
  //   console.log('ID FROM LOAD TASK =', id);
  //   if (!id) {
  //     this.task = taskService.getEmptyTask();
  //   }

  //   if (id) {
  //     try {
  //       await firebaseService.initFirebase();
  //       let task = await firebaseService.getDocument('tasks', id);
  //       console.log('tasks from edit=', task);
  //       if (task) {
  //         setTask(task);
  //       } else {
  //         console.log('TASK ID NOT FOUND!');
  //       }
  //     } catch (err) {
  //       console.log('TASK ID NOT FOUND!');
  //       console.log('error=', err);
  //     }
  //   }
  // };

  const loadTask = async (id = null) => {
    if (task) {
      console.log('there is already a task');

      return;
    }
    console.log('ID FROM LOAD TASK =', id);
    if (!id) {
      setTask(taskService.getEmptyTask());
    }

    if (id) {
      try {
        await firebaseService.initFirebase();
        let task = await firebaseService.getDocument('tasks', id);
        if (task) {
          setTask(task);
        } else {
        }
      } catch (err) {
        console.log('error=', err);
      }
    }
  };

  const test1 = () => {
    console.log('curr task =', task);
    console.log('curr tasks =', tasks);
  };
  useEffect(() => {
    const { id } = params;

    loadTask(id);
    // eslint-disable-next-line
  }, []);

  if (!task) return <div>no task</div>;
  return (
    <div>
      <div></div>
      <form>
        <div>
          <div>TaskEdit</div>
          <div>
            <label>Title:</label>
            <input onChange={handleChange} type="text" name="title" value={task.title ? task.title : ''} />
          </div>
          <div>
            <label>Status:</label>
            <input onChange={handleChange} type="text" name="status" value={task.status} />
          </div>
          <div>
            <label>Description:</label>
            <input onChange={handleChange} type="text" name="description" value={task.description} />
          </div>
          <div>
            <label>Importance:</label>
            <input onChange={handleChange} type="text" name="importance" value={task.importance ? task.importance : ''} />
          </div>
          <div>
            <label>CreatedAt</label>
            <input onChange={handleChange} type="text" name="createdAt" value={task.createdAt ? task.createdAt : ''} />
          </div>
          <div>
            <label>LastTriedAt</label>
            <input onChange={handleChange} type="text" name="lastTriedAt" value={task.lastTriedAt ? task.lastTriedAt : ''} />
          </div>
          <div>
            <label>TriesCount</label>
            <input onChange={handleChange} type="text" name="triesCount" value={task.triesCount ? task.triesCount : ''} />
          </div>
          <div>
            <label>DoneAt</label>
            <input onChange={handleChange} type="text" name="doneAt" value={task.doneAt ? task.doneAt : ''} />
          </div>
          <button onClick={onSaveTask}>Save</button>
        </div>
      </form>
    </div>
  );
};
