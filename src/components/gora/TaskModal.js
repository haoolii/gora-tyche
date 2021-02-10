import React, { useState, useEffect } from 'react';
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE
} from "baseui/modal";
import { KIND as ButtonKind } from "baseui/button";
import { FormControl } from "baseui/form-control";
import { Input } from "baseui/input";
import { DatePicker } from "baseui/datepicker";
import { ColorPicker } from './ColorPicker';

export const TaskModal = ({
  task,
  isOpen,
  setIsOpen,
  onSubmit,
  onDelete
}) => {
  const [id, setId] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [title, setTitle] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [ganttColor, setGanttColor] = useState('');
  const [taskColor, setTaskColor] = useState('');

  useEffect(() => {
    if (!task) return;
    setId(task.id);
    setTitle(task.title);
    setStart(task.start);
    setEnd(task.end);
    setGanttColor(task.ganttColor);
    setTaskColor(task.taskColor);
  }, [task])

  useEffect(() => {
    setIsValid(!(title && start && end && ganttColor))
  }, [title, start, end, ganttColor])

  const handleSubmit = event => onSubmit({
    target: {
      id: id,
      title: title,
      start: new Date(start),
      end: new Date(end),
      ganttColor: ganttColor,
      taskColor: taskColor
    },
    close: () => {
      setGanttColor('');
      setEnd('');
      setTitle('');
      setStart('');
      setTaskColor('');
      setIsOpen(false);
    }
  })

  const handleDelete = event => onDelete({
    target: {
      id: id,
      title: title,
      start: new Date(start),
      end: new Date(end),
      ganttColor: ganttColor,
      taskColor: taskColor
    },
    close: () => {
      setGanttColor('');
      setEnd('');
      setTitle('');
      setStart('');
      setTaskColor('');
      setIsOpen(false);
    }
  })

  return (
    <Modal
        closeable
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.alertdialog}
      >
        <ModalHeader>
          { task ? 'Edit Task' : 'Create Task' }
        </ModalHeader>
        <ModalBody>
          <FormControl label="Task">
            <Input value={title} onChange={event => setTitle(event.currentTarget.value)}/>
          </FormControl>
          <FormControl label="Start">
            <DatePicker value={start} onChange={event => setStart(event.date)}/>
          </FormControl>
          <FormControl label="End">
          <DatePicker value={end} onChange={event => setEnd(event.date)} />
          </FormControl>
          <FormControl label="Color">
            <ColorPicker onChange={color => setGanttColor(color)} value={ganttColor} />
          </FormControl>
          <FormControl label="Background Clor">
            <ColorPicker onChange={color => setTaskColor(color)} value={taskColor} />
          </FormControl>
        </ModalBody>
        <ModalFooter style={{ display: 'flex' }}>
          {
            task ?
            <ModalButton overrides={{
                BaseButton: {
                  style: ({ $theme }) => ({
                    background: $theme.colors.negative
                  })
                }
              }}
              onClick={handleDelete}
            >
              Delete
            </ModalButton> : ''
          }
          
          <div style={{ flex: '1 1 auto'}}></div>
          <ModalButton kind={ButtonKind.tertiary} onClick={() => setIsOpen(false)}>
            Cancel
          </ModalButton>
          <ModalButton disabled={isValid} onClick={handleSubmit}>
          { task ? 'Save' : 'Create' }
          </ModalButton>
        </ModalFooter>
      </Modal>
  )
}

