import React, { useState } from 'react'
import { styled } from 'styletron-react';
import { Layout } from './Layout';
import { WorkSpace } from './WorkSpace';
import { Toolbar } from './Toolbar';

const GoraBase = styled('div', { 
  className: 'gora',
  width: '960px',
  height: '650px',
  background: '#fff',
  border: '2px solid #E2E2E2',
  overflow: 'hidden',
  boxShadow: ''
})

const Main = styled('div', {
  position: 'relative',
  width: '960px',
  height: '600px'
})

const Footer = styled('div', {
  position: 'relative',
  width: '960px',
  height: '50px',
  overflow: 'hidden'
})

export const Gora = () => {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 0,
      title: 'Demand discuss',
      start: new Date('2021/01/10'),
      end: new Date('2021/02/25'),
      ganttColor: '#535FCF',
      taskColor: null
    },
    {
      id: 1,
      title: 'Analysis and design',
      start: new Date('2021/01/30'),
      end: new Date('2021/03/10'),
      ganttColor: '#FFCF70',
      taskColor: null
    },
    {
      id: 2,
      title: 'Implementation',
      start: new Date('2021/02/20'),
      end: new Date('2021/04/15'),
      ganttColor: '#B18977',
      taskColor: null
    }
  ]);

  const handleChange = (e) => {
    setTasks(tasks.map(task => task.id === e.id ? e : {...task}));
  }

  const handleCreate = (event) => {
    setLoading(true);
    setTasks([...tasks, { ...event.target, id: tasks.length}])
    event.close();
    setTimeout(() => setLoading(false), 500); 
  }

  const handleEdit = event => {
    setLoading(true);
    setTasks(tasks.map(task => {
      if (task.id === event.target.id) {
        return {...event.target};
      }
      return task;
    }))
    event.close();
    setTimeout(() => setLoading(false), 500); 
  }

  const handleDelete = event => {
    setLoading(true);
    setTasks(tasks.filter(task => task.id !== event.target.id))
    event.close();
    setTimeout(() => setLoading(false), 500); 
  }

  return (
    <GoraBase>
      <Main>
        <Layout />
        <WorkSpace
          tasks={tasks}
          setTasks={setTasks}
          handleChange={handleChange}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Main>
      <Footer>
        <Toolbar loading={loading} onCreate={handleCreate}/>
      </Footer>
    </GoraBase>
  )
}

