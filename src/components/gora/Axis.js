import React, { useRef, useEffect } from 'react';
import { styled } from 'styletron-react';
import * as d3 from 'd3';

const AxisBase = styled('div', {
  className: 'axis',
  width: '760px',
  height: '600px'
})

const Header = styled('div', {
  width: '760px',
  height: '50px',
  borderBottom: '2px solid #eee',
  boxSizing: 'border-box'
})
export const Axis = ({
  width,
  height
}) => {
  const svgEl = useRef();

  useEffect(() => {
    const x = d3.scaleTime()
                .domain([new Date('2021/01/01'), new Date('2021/12/31')])
                .range([0, width - 2]).nice();
    const axis = d3.axisTop(x).tickSize(-height)
    d3.select(svgEl.current).select('g').call(axis)

  }, [width])

  return (
    <AxisBase>
      <Header></Header>
      <svg
        ref={svgEl}
        width={width}
        height={height}
        style={{position: 'absolute', top: 0}}
      >
        <g transform="translate(0, 30)"></g>
      </svg>
    </AxisBase>
  )
}