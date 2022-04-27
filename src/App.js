import React from 'react'
import './App.css';
import { HashRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import { TaskApp } from './pages/TaskApp';
import { TaskEdit } from './pages/TaskEdit';

function App() {
  return (
    <Router>
      <div className="App">
        {/* <TaskApp></TaskApp> */}
        <Switch>
          <Route path='/edit/:id?' component={TaskEdit} />
          <Route path='/' component={TaskApp} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;
