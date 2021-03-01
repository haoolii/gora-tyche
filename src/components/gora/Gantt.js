import React, {
  useRef,
  memo,
  useLayoutEffect,
  useState,
  useEffect
} from 'react';
import * as d3 from 'd3';
import { styled } from 'styletron-react';
import { motion } from 'framer-motion';
import { useEventCall, throttle, twoDateDurationDay } from './utils';

const getScale = (width, rootStart, rootEnd) => {
  return d3.scaleTime().domain([rootStart, rootEnd]).range([0, width]);
};

const GanttBase = styled('div', {
  height: '50px'
});

const svgWidth = 760;
const whileHover = { opacity: 0.7 };
const whileTap = { opacity: 0.7 };
export const Gantt = memo(
  ({ ganttColor = '#333333', start, end, rootStart, rootEnd, onChange }) => {
    const el = useRef();
    const textRef = useRef();
    const svgRef = useRef();
    const rectRef = useRef();
    const rectLeftRef = useRef();
    const rectRightRef = useRef();

    const scaleRef = useRef(() => {});

    const [ganttWidth, setGanttWidth] = useState(0);
    const [ganttPosition, setGanttPosition] = useState([0, 0]);

    const days = twoDateDurationDay(start, end);
    
    const handleDrag = useEventCall(
      throttle((event) => {
        const { current: scale } = scaleRef;
        const duration = end - start;
        const targetX = +d3.select(rectRef.current).attr('x') + event.dx;
        const newStart = scale.invert(targetX);
        const newEnd = new Date(
          new Date(scale.invert(targetX)).getTime() + duration
        );
        onChange({
          start: newStart,
          end: newEnd
        });
      })
    );

    const handleGrabLeftDrag = useEventCall(
      throttle((event) => {
        const { current: scale } = scaleRef;
        const newStart = scale.invert(event.x);
        if (scale(end) - scale(newStart) < 10) return;

        onChange({
          start: newStart,
          end: end
        });
      })
    );

    const handleGrabRightDrag = useEventCall(
      throttle((event) => {
        const { current: scale } = scaleRef;
        const newEnd = scale.invert(event.x);

        if (scale(newEnd) - scale(start) < 10) return;

        onChange({
          start: start,
          end: scale.invert(event.x)
        });
      })
    );

    useLayoutEffect(() => {
      d3.select(rectRef.current).call(
        d3.drag().on('drag', (event) => handleDrag(event))
      );
      d3.select(rectLeftRef.current).call(
        d3.drag().on('drag', (event) => handleGrabLeftDrag(event))
      );
      d3.select(rectRightRef.current).call(
        d3.drag().on('drag', (event) => handleGrabRightDrag(event))
      );
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      const scale = (scaleRef.current = getScale(svgWidth, rootStart, rootEnd));
      setGanttPosition([scale(start), 0]);
      setGanttWidth(Math.abs(scale(end) - scale(start)));
    }, [start, end, ganttColor, rootStart, rootEnd]);

    return (
      <motion.div whileHover={whileHover} whileTap={whileTap}>
        <GanttBase ref={el}>
          <svg
            ref={svgRef}
            width={svgWidth}
            height={50}
            viewBox={`0 0 ${svgWidth} 50`}
          >
            <g>
              <rect
                ref={rectRef}
                x={`${ganttPosition[0]}`}
                y={`${ganttPosition[1] + 12}`}
                cursor="move"
                width={`${ganttWidth}`}
                height="26"
                fill={ganttColor}
                rx="14"
              />
              <rect
                ref={rectLeftRef}
                className="grabbar"
                x={`${ganttPosition[0]}`}
                y={`${ganttPosition[1] + 12}`}
                width="8"
                fillOpacity="0"
                height="26"
                cursor="ew-resize"
              />
              <rect
                ref={rectRightRef}
                className="grabbar"
                x={`${ganttPosition[0] + ganttWidth - 8}`}
                y={`${ganttPosition[1] + 12}`}
                width="8"
                cursor="ew-resize"
                fillOpacity="0"
                height="26"
              />
            </g>
            <text
              ref={textRef}
              style={{ pointerEvents: 'none' }}
              fontWeight="500"
              x={`${ganttPosition[0] + ganttWidth + 4}`}
              y="30"
              cy=".65em"
            >
              {days}
            </text>
          </svg>
        </GanttBase>
      </motion.div>
    );
  }
);
