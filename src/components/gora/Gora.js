import React from 'react'
import { Toolbar } from '../toolbar';
import { Workspace } from '../workspace';
import { Header } from '../header';
import './gora.css';

export const Gora = () => {
  return (
    <div className="gora">
      <Header />
      <Workspace />
      <Toolbar />
    </div>
  )
}

