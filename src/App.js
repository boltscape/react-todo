import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TaskList from './TaskList';
import TaskEdit from "./TaskEdit";

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
            <Route path='/todo' exact={true} component={TaskList}/>
            <Route path='/todo/:id' component={TaskEdit}/>
          </Switch>
        </Router>
    )
  }
}

export default App;