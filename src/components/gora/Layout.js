import React from 'react'
import { styled } from 'styletron-react';
import { Axis } from './Axis';
import {HeadingXSmall, LabelLarge} from 'baseui/typography';
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
  padding: '0 22px',
  borderBottom: '2px solid #eee',
  boxSizing: 'border-box'
})

export const Layout = ({
  rootStart,
  rootEnd,
  title,
  type
}) => {
  return (
    <LayoutBase>
      <Info>
        <Title>
          {title}
        </Title>
      </Info>
      <Axis
        rootStart={rootStart}
        rootEnd={rootEnd}
        width={760}
        height={600}
        type={type}
      />
    </LayoutBase>
  )
}

