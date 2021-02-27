import React, { useRef, memo } from 'react';
import { styled } from 'styletron-react';
import * as d3 from 'd3';

const TICK_FN_FACTORY = {
  YEAR: {
    tickFn: d3.timeYear.every(1),
    timeFormatFn: d3.timeFormat('%Y')
  },
  MONTH: {
    tickFn: d3.timeMonth.every(1),
    timeFormatFn: d3.timeFormat('%Y/%m')
  },
  DAY: {
    tickFn: d3.timeDay.every(1),
    timeFormatFn: d3.timeFormat('%Y/%m/%d')
  }
};

const AxisBase = styled('div', {
  className: 'axis',
  width: '760px',
  height: '600px'
});

const Header = styled('div', {
  width: '760px',
  height: '50px',
  borderBottom: '2px solid #eee',
  boxSizing: 'border-box'
});
export const Axis = memo(({ rootStart, rootEnd, width, height, type }) => {
  const svgEl = useRef();
  const { axises, bandWidth } = (() => {
    const scale = d3
      .scaleTime()
      .domain([rootStart, rootEnd])
      .range([0, width])
      .nice();

    const { tickFn, timeFormatFn } = TICK_FN_FACTORY[type || 'MONTH'];
    const ticks = scale.ticks(tickFn);
    const axises = ticks.map((tick) => ({
      time: timeFormatFn(tick),
      x: scale(tick)
    }));

    return {
      axises,
      bandWidth: d3
        .scaleBand()
        .domain(axises.map((axis) => axis.x))
        .range([0, width])
        .bandwidth()
    };
  })();

  return (
    <AxisBase>
      <Header></Header>
      <svg
        ref={svgEl}
        width={width}
        height={height}
        style={{ position: 'absolute', top: 0 }}
      >
        <g transform="translate(0, 0)">
          {axises.map((axis, index) => (
            <g key={index}>
              <line
                x1={axis.x}
                x2={axis.x}
                y1={0}
                y2={600}
                strokeWidth="2"
                stroke="#eee"
              ></line>
              <text
                x={axis.x + bandWidth / 2}
                y={30}
                fontSize="12"
                textAnchor="middle"
              >
                {axis.time}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </AxisBase>
  );
});
