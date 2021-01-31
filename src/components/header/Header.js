import React from 'react'
import { Axis } from './Axis';
import './header.css';

export const Header = () => {
  return (
    <div className="header">
      <div className="title">
        <h2>Fubon Data Comparison</h2>
      </div>
      <Axis />
    </div>
  )
}

