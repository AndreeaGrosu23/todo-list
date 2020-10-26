import React from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";

import Todo from "./Components/Todo";

export default function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/" exact component={Todo} />
      </Switch>
    </div>
  );
}
