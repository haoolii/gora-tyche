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
})

export const WorkSpace = ({
  tasks,
  setTasks,
  handleChange,
  handleEdit,
  handleDelete
}) => {

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
                  days={value.days}
                  onChange={handleChange}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  ganttColor={value.ganttColor}
                  taskColor={value.taskColor}
                />
              </div>
            }
          />
    </WorkSpaceBase>
  )
}