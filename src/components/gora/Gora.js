import React from 'react'
import { styled } from 'styletron-react';
import { Layout } from './Layout';
import { WorkSpace } from './WorkSpace';

const GoraBase = styled('div', { 
  className: 'gora',
  position: 'relative',
  width: '960px',
  height: '600px',
  background: '#eee',
  border: '1px solid #eee'
})

export const Gora = () => {
  return (
    <GoraBase>
      <Layout />
      <WorkSpace />
    </GoraBase>
  )
}

