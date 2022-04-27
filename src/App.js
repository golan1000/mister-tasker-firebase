import React, { useEffect } from 'react'
import './assets/scss/global.scss';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { TaskApp } from './pages/TaskApp';
import { TaskEdit } from './pages/TaskEdit';
import { firebaseService } from './services/firebase.service';
import taskService from './services/taskService';
import { useDispatch } from 'react-redux';
import { loadTasks } from './store/actions/taskActions';

function App() {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadTasks())

    // firebaseService.initFirebase()
    // firebaseService.subscribe('tasks',  print)

    print1()
  }, [])

  async function print1() {
    await firebaseService.initFirebase()
    // let bla = await firebaseService.getDocuments('tasks', {})
    // console.log("bla=", bla)
    // const tasks = await taskService.query()
    // console.log('tasks', tasks)
  }


  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path='/edit/:id?' component={TaskEdit} />
          <Route path='/' component={TaskApp} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
