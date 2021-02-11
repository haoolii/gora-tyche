import React from 'react'
import { motion } from "framer-motion"
import logo from './logo.svg';
import { ALIGN } from 'baseui/header-navigation';

export const CommingSoon = () => {
  return (
    <motion.div
      animate={{
        scale: [1, 1.12, 1]
      }}
      transition={{
        duration: 1.5,
        repeat: Infinity,
        ease: "easeOut"
      }}
      style={{
        height: 'calc(80vh - 160px)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      }}
    >
      <img
        src={logo}
        alt="logo"
        height="200"
        style={{
          maxWidth: '80%',
          maxHeight: '80%'
        }}
      />
    </motion.div>
  )
}
