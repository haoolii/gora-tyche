import React, { useState } from 'react'
import { styled } from 'styletron-react';
import { Layout } from './Layout';
import { WorkSpace } from './WorkSpace';
import { Toolbar } from './Toolbar';
import { motion } from "framer-motion"
import { v4 as uuidv4 } from 'uuid';

const GoraBase = styled('div', { 
  className: 'gora',
  width: '960px',
  height: '700px',
  background: '#fff',
  border: '2px solid #E2E2E2',
  overflow: 'hidden',
  boxShadow: ''
})

const Main = styled('div', {
  position: 'relative',
  width: '960px',
  height: '600px',
  borderTop: '3px solid #eee',
  borderBottom: '3px solid #eee',
})

const Footer = styled('div', {
  position: 'relative',
  width: '960px',
  height: '50px',
  overflow: 'hidden'
})

const Header = styled('div', {
  position: 'relative',
  width: '960px',
  height: '50px',
  overflow: 'hidden'
})


export const Gora = () => {
  const [loading, setLoading] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: '9b1deb4d-3b7d-4bad-9bdd-2b0d7b3dcb6d',
      title: 'Demand discuss',
      start: new Date('2021/01/10'),
      end: new Date('2021/02/25'),
      ganttColor: '#535FCF',
      taskColor: null
    },
    {
      id: '65a24b75-ab5b-409b-a6ca-acc133de3684',
      title: 'Analysis and design',
      start: new Date('2021/01/30'),
      end: new Date('2021/03/10'),
      ganttColor: '#FFCF70',
      taskColor: null
    },
    {
      id: 'a9349099-14b6-416c-8e9e-588fef98856c',
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
    setTasks([...tasks, { ...event.target, id: uuidv4()}])
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
    <motion.div 
      initial={{ rotate: 90, scale: 0 }}
      animate={{ rotate: 0, scale: 1 }}
      transition={{
        type: "spring",
        stiffness: 260,
        damping: 20
      }}
    >
      <GoraBase>
        <Header>
        <Toolbar loading={loading} onCreate={handleCreate}/>
        </Header>
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
        </Footer>
      </GoraBase>
    </motion.div>
  )
}

