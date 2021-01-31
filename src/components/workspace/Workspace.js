import React, { useState } from 'react'
import { Task } from './Task';
import './workspace.css';

export const Workspace = () => {
  const [tasks, setTasks] = useState([1, 2, 3, 4, 5]);
  return (
    <div className="workspace">
        <div className="work-list">
          {
            tasks.map(task => <Task />)
          }
        </div>
      </div>
  )
}

