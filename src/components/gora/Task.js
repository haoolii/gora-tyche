import { zip } from 'ramda';
import React, { useEffect, useState } from 'react'
import { styled } from 'styletron-react';
import { Gantt } from './Gantt';
import {
  Grab,
  Overflow
} from 'baseui/icon';
import { Button, KIND, SIZE } from 'baseui/button';

const TaskBase = styled('div', {
  className: 'task',
  display: 'flex',
  width: '100%',
  height: '50px',
  borderBottom: '2px solid #eee',
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

export const Task = ({
  id,
  title,
  start,
  end,
  onChange
}) => {
  const handleChange = event => {
    onChange({
      id,
      title,
      ...event
    })
  }
  return (
    <TaskBase>
      <TaskInfo>
        <TaskGrab>
          <Grab data-movable-handle color="#707070" size={16}/>
        </TaskGrab>
        <TaskTitle>
          {title}
        </TaskTitle>
        <TaskMore>
          <Button kind={KIND.minimal} size={SIZE.compact}>
            <Overflow color="#707070" size={16}/>
          </Button>
        </TaskMore>
      </TaskInfo>
      <TaskGantt>
        <Gantt
          id={id}
          start={start}
          end={end}
          onChange={handleChange}
        ></Gantt>
      </TaskGantt>
    </TaskBase>
  )
}

