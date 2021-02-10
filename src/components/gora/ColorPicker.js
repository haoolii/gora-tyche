import React, { useState } from 'react';
import { styled } from 'styletron-react';

const ColorsContainer = styled('div', {
  display: 'flex',
  width: '100%',
  margin: '0 -4px',
  flexWrap: 'wrap'
})

const ColorContainer = styled('div', {
  padding: '4px'
})

const Color = styled('div', props => ({
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  background: props.$color ? props.$color : '#eee',
  cursor: 'pointer',
  opacity: props.$isActive ? 1 : 0.4,
  ":hover": {
    opacity: 0.8
  },
  transition: '0.4s'
}))

export const ColorPicker = ({
  onChange,
  value
}) => {
  const [colorList, setColorList] = useState([
    {
      name: '#535FCF',
      color: '#535FCF'
    },
    {
      name: '#5B91F5',
      color: '#5B91F5'
    },
    {
      name: '#06C167',
      color: '#06C167'
    },
    {
      name: '#FFCF70',
      color: '#FFCF70'
    },
    {
      name: '#FA9269',
      color: '#FA9269'
    },
    {
      name: '#E85C4A',
      color: '#E85C4A'
    },
    {
      name: '#B18977',
      color: '#B18977'
    },
    {
      name: '#8FA3AD',
      color: '#8FA3AD'
    }
  ]);

  return (
    <ColorsContainer>
    {
      colorList.map((color, index) =>
        <ColorContainer key={index}>
          <Color 
            $color={color.color}
            $isActive={value === color.color}
            onClick={event => onChange(color.color === value ? '' : color.color)}
          />
        </ColorContainer>
      )
    }
    </ColorsContainer>
  )
}