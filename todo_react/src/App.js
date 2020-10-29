import React from 'react';
import './App.css';
import { Switch, Route } from "react-router-dom";

import Todo from "./Components/Todos/Todo";
import Navbar from "./Components/Navbar/Navbar";

export default function App() {
  return (
    <div className="App">
      <Navbar />
      <Switch>
        <Route path="/" exact component={Todo} />
      </Switch>
    </div>
  );
}
