import React from 'react'
import { styled } from 'styletron-react';
import { Axis } from './Axis';

const LayoutBase = styled('div', {
  className: 'layoutBase',
  position: 'absolute',
  width: '960px',
  height: '600px',
  display: 'flex', 
  zIndex: 0,
  background: '#fff'
})

const Info = styled('div', {
  className: 'info',
  width: '200px',
  height: '600px',
  borderRight: '2px solid #eee',
  boxSizing: 'border-box'
})

const Title = styled('div', {
  className: 'title',
  width: '200px',
  height: '50px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  borderBottom: '2px solid #eee',
  boxSizing: 'border-box'
})

export const Layout = () => {
  return (
    <LayoutBase>
      <Info>
        <Title>
          <h3>測試用Gora</h3>
        </Title>
      </Info>
      <Axis width={760} height={600}/>
    </LayoutBase>
  )
}

