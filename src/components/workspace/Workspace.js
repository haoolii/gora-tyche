import React, { useState, Fragment } from 'react'
import { Task } from './Task';
import './workspace.css';
import { List, arrayMove } from 'react-movable';

export const Workspace = () => {
  const [tasks, setTasks] = useState([
    {
      id: 0,
      taskName: '需求訪談',
      start: new Date('2021/01/02'),
      end: new Date('2021/01/17'),
    },
    {
      id: 1,
      taskName: '需求分析與設計',
      start: new Date('2021/01/10'),
      end: new Date('2021/02/30'),
    },
    {
      id: 2,
      taskName: '雛型確認',
      start: new Date('2021/02/25'),
      end: new Date('2021/03/30'),
    }
  ]);

  const handleChange = (e) => {
    setTasks(tasks.map(task => task.id === e.id ? e : {...task}));
  }
  
  return (
    <div className="workspace">
        <div className="work-list">
        <List
          values={tasks}
          onChange={({ oldIndex, newIndex }) =>
            setTasks(arrayMove(tasks, oldIndex, newIndex))
          }
          lockVertically
          renderList={({ children, props }) => <ul {...props}>{children}</ul>}
          renderItem={({ value, props, isDragged, isSelected  }) =>
            <div {...props}>
              <Task
                id={value.id}
                onChange={handleChange}
                key={value.id}
                taskName={value.taskName}
                start={value.start}
                end={value.end}
                isDragged={isDragged}
                isSelected={isSelected}
              />
            </div>
          }
        />
          {/* {
            tasks.map((task, index) => <
              Task 
              key={task.id}
              taskName={task.taskName}
              start={task.start}
              end={task.end}
            />)
          } */}
        </div>
        {JSON.stringify(tasks)}
      </div>
  )
}

