import React, { useRef, useState, useEffect, useLayoutEffect } from 'react'
import * as d3 from 'd3';
import './axis.css';
export const Axis = () => {
  const el = useRef();
  const [svgWidth, setSvgWidth] = useState(0);
  const [ganttWidth, setWidthWidth] = useState(0);

  useLayoutEffect(() => {
    function updateSize() {
      setSvgWidth(el.current.getBoundingClientRect().width)
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    const x = d3.scaleTime()
                .domain([new Date('2021/01/01'), new Date('2021/12/31')])
                .range([0, svgWidth]);
    const aixs = d3.axisTop(x);
    d3.select(el.current)
      .select('g')
      .call(aixs)
  }, [svgWidth])


  return (
    <div className="axis">
      <svg
        ref={el}
        width={svgWidth}
        height={65}
        viewBox={`0 0 ${svgWidth} 65`}
      >
        <g transform={`translate(${0}, ${65})`} className="heeelo"></g>
      </svg>
    </div>
  )
}

