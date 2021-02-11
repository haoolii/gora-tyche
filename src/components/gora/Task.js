import { zip } from 'ramda';
import React, { useEffect, useState } from 'react'
import { styled } from 'styletron-react';
import { Gantt } from './Gantt';
import {
  Grab,
  Overflow
} from 'baseui/icon';
import { Button, KIND, SIZE, SHAPE } from 'baseui/button';
import { LabelMedium, LabelSmall } from 'baseui/typography';
import { TaskModal } from './TaskModal';

const TaskBase = styled('div', {
  className: 'task',
  display: 'flex',
  width: '100%',
  height: '50px',
  borderTop: '1px solid #eee',
  borderBottom: '1px solid #eee',
  zIndex: -1
})

const TaskInfo = styled('div', {
  className: 'taskInfo',
  width: '198px',
  height: '50px',
  background: '#fff',
  display: 'flex',
  alignItems: 'center',
  marginRight: '2px'
})

const TaskGrab = styled('div', {
  padding: '0 12px',
  cursor: 'grabbing'
})

const TaskTitle = styled('div', {
  width: '100%'
})

const TaskMore = styled('div')

const TaskGantt = styled('div', {
  className: 'taskGantt',
  width: '760px',
  height: '50px'
})

const TaskColor = styled('div', props => ({
  position: 'absolute',
  top: 0,
  left: 0,
  opacity: 0.2,
  background: props.$taskColor ? props.$taskColor : 'none',
  width: '100%',
  height: '100%',
  zIndex: -1
}))

export const Task = ({
  id,
  title,
  start,
  end,
  days,
  onChange,
  ganttColor,
  taskColor,
  onEdit,
  onDelete,
  rootStart,
  rootEnd
}) => {
  const handleChange = event => {
    onChange({
      id,
      title,
      ganttColor,
      taskColor,
      ...event
    })
  }
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
    <TaskBase>
      <TaskInfo>
        <TaskGrab data-movable-handle>
          <Grab color="#707070" size={16}/>
        </TaskGrab>
        <TaskTitle>
          <LabelSmall>
            {title}
          </LabelSmall>
        </TaskTitle>
        <TaskMore>
          <Button kind={KIND.minimal} size={SIZE.compact} shape={SHAPE.circle} onClick={() => setIsOpen(true)}>
            <Overflow color="#707070" size={16}/>
          </Button>
        </TaskMore>
      </TaskInfo>
      <TaskGantt>
        <Gantt
          id={id}
          rootStart={rootStart}
          rootEnd={rootEnd}
          start={start}
          end={end}
          days={days}
          onChange={handleChange}
          ganttColor={ganttColor}
        ></Gantt>
      </TaskGantt>
      <TaskColor $taskColor={taskColor}></TaskColor>
    </TaskBase>
    <TaskModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        onSubmit={onEdit}
        onDelete={onDelete}
        task={{
          id,
          title,
          start,
          end,
          onChange,
          ganttColor,
          taskColor,
        }}
      />
    </>
  )
}

