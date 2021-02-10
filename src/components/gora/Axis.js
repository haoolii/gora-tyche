import React, { useRef, useEffect, useState } from 'react';
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
  const [axises, setAxises] = useState([]);
  const [bandWidth, setBandWidth] = useState(0);

  useEffect(() => {
    const scale = d3.scaleTime()
                .domain([new Date('2021/01/01'), new Date('2021/12/31')])
                .range([0, width])
    const ticks = scale.ticks(d3.timeMonth.every(1));
    setAxises(ticks.map(tick => ({
      time: d3.timeFormat("%Y/%m")(tick),
      x: scale(tick)
    })))
  }, [width]);

  useEffect(() => {
    setBandWidth(d3.scaleBand().domain(axises.map(axis => axis.x)).range([0, width]).bandwidth());
  }, [axises])

  return (
    <AxisBase>
      <Header></Header>
      <svg
        ref={svgEl}
        width={width}
        height={height}
        style={{position: 'absolute', top: 0}}
      >
        <g transform="translate(0, 0)">
        {
          axises.map((axis, index) =>
          <g key={index}>
            <line
              x1={axis.x}
              x2={axis.x}
              y1={0}
              y2={600}
              strokeWidth="2"
              stroke="#eee"
            >
            </line>
            <text x={axis.x + (bandWidth / 2)} y={30} fontSize="12" textAnchor="middle">
                {axis.time}
              {/* <LabelSmall>
              </LabelSmall> */}
            </text>
          </g>
          )
        }
        </g>
      </svg>
    </AxisBase>
  )
}