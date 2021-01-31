import React from 'react'
import './task.css';
import { Gantt } from './Gantt';

export const Task = ({
  id,
  taskName,
  start,
  end,
  onChange
}) => {
  
  const handleChange = (e) => {
    onChange({
      id,
      taskName,
      start: e.start,
      end: e.end
    })
  }
  return (
    <div className="task">
      <div className="task-name" data-movable-handle>{ taskName }</div>
      <div className="task-gantt">
        <Gantt
          start={start}
          end={end}
          onChange={handleChange}
        />
      </div>
    </div>
  )
}

