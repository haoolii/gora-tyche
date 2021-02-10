import React, { useState }from 'react'
import { styled } from 'styletron-react';
import { Task } from './Task';
import { List, arrayMove } from 'react-movable';

const WorkSpaceBase = styled('div', {
  className: 'workspace',
  position: 'absolute',
  zIndex: 0,
  top: '50px',
  width: '960px',
  height: '550px',
  overflow: 'hidden'
  // border: '2px solid #eee'
})

export const WorkSpace = () => {
  const [tasks, setTasks] = useState([
    {
      id: 0,
      title: '需求訪談',
      start: new Date('2021/01/02'),
      end: new Date('2021/01/17'),
    },
    {
      id: 1,
      title: '需求分析與設計',
      start: new Date('2021/01/10'),
      end: new Date('2021/02/30'),
    },
    {
      id: 2,
      title: '雛型確認',
      start: new Date('2021/02/25'),
      end: new Date('2021/03/30'),
    }
  ]);

  const handleChange = (e) => {
    setTasks(tasks.map(task => task.id === e.id ? e : {...task}));
  }

  return (
    <WorkSpaceBase>
      <List
            values={tasks}
            onChange={({ oldIndex, newIndex }) =>
              setTasks(arrayMove(tasks, oldIndex, newIndex))
            }
            lockVertically
            renderList={({ children, props, isDragged}) => <div {...props}>{children}</div>}
            renderItem={({ value, props, isDragged, isSelected }) =>
              <div {...props}>
                <Task
                  id={value.id}
                  key={value.id}
                  title={value.title}
                  start={value.start}
                  end={value.end}
                  onChange={handleChange}
                />
              </div>
            }
          />
    </WorkSpaceBase>
  )
}