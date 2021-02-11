import React, { useState, useRef, useEffect } from 'react'
import { styled } from 'styletron-react';
import { Layout } from './Layout';
import { WorkSpace } from './WorkSpace';
import { Toolbar } from './Toolbar';
import { motion } from "framer-motion"
import { Summary } from './Summary';
import { v4 as uuidv4 } from 'uuid';
import { toPng, toBlob } from 'html-to-image';
import Check from 'baseui/icon/check';
import {
  useSnackbar,
  DURATION,
} from 'baseui/snackbar';
import { twoDateDurationDay } from './utils';
import { Drawer, ANCHOR } from "baseui/drawer";
import { Setting } from './Setting';

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
  height: '45px',
  overflow: 'hidden'
})

const Header = styled('div', {
  position: 'relative',
  width: '960px',
  height: '50px',
  overflow: 'hidden'
})


export const Gora = () => {
  const el = useRef();
  const {enqueue} = useSnackbar();
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('GORA');
  const [unit, setUnit] = useState(2000);
  const [day, setDay] = useState(0);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
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

  // 計算各task時間
  useEffect(() => {
    Promise.resolve().then(() => {
      setDay(tasks.reduce((acc, curr) => acc + twoDateDurationDay(curr.start, curr.end), 0));
    })
  }, [tasks])

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

  const handleDownloadPng = event => {
    toPng(el.current)
      .then(function (dataUrl) {
        enqueue({
          message: 'Download Success!!',
          startEnhancer: ({size}) => <Check size={size} />
        }, DURATION.medium)
        const a = document.createElement('a');
        a.href = dataUrl;
        a.download = 'Gora';
        a.click();
      })
      .catch(function (error) {
        console.error('oops, something went wrong!', error);
      });
  }

  const handleSetting = event => {
    setIsDrawerOpen(true);
    console.log('handleSetting', event);
  }

  return (
    <>
      <motion.div
        ref={el}
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
            <Toolbar 
              loading={loading}
              onCreate={handleCreate}
              onDownloadPNG={handleDownloadPng}
              onSetting={() => setIsDrawerOpen(true)}
            />
          </Header>
          <Main>
            <Layout title={title} />
            <WorkSpace
              tasks={tasks}
              setTasks={setTasks}
              handleChange={handleChange}
              handleEdit={handleEdit}
              handleDelete={handleDelete}
            />
          </Main>
          <Footer>
            <Summary day={day} unit={unit} />
          </Footer>
        </GoraBase>
      </motion.div>

      <Drawer
        isOpen={isDrawerOpen}
        autoFocus
        onClose={() => setIsDrawerOpen(false)}
        anchor={ANCHOR.right}
      >
        <Setting
          onSubmit={({ title, unit }) => {
            setTitle(title);
            setUnit(unit);
            setIsDrawerOpen(false)
          }}
          setting={{
            title,
            unit
          }}
          onClose={() => setIsDrawerOpen(false)}
        />
      </Drawer>
    </>
  )
}

