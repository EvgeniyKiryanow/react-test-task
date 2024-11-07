import React from 'react';
import './App.scss';
import 'bootstrap/dist/css/bootstrap.css';
import Header from "./components/Header";
import TaskManager from "./components/TaskManager";

function App() {
  return (
    <div className="App">
      <Header name={"Task manager"}/>
      <TaskManager/>
    </div>
  );
}

export default App;
