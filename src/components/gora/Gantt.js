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
    const svgEl = useRef();
    const rectEl = useRef();
    const rectLeftEl = useRef();
    const rectRightEl = useRef();

    const [ganttWidth, setGanttWidth] = useState(0);
    const scaleRef = useRef(() => {});
    const [ganttPosition, setGanttPosition] = useState([0, 0]);
    // [scale(start), 0]
    // Math.abs(scale(end) - scale(start));

    const days = twoDateDurationDay(start, end);

    const handleDrag = useEventCall(
      throttle((event) => {
        const { current: scale } = scaleRef;
        const duration = end - start;
        const targetX = +d3.select(rectEl.current).attr('x') + event.dx;
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
      d3.select(rectEl.current).call(
        d3.drag().on('drag', (event) => handleDrag(event))
      );
      d3.select(rectLeftEl.current).call(
        d3.drag().on('drag', (event) => handleGrabLeftDrag(event))
      );
      d3.select(rectRightEl.current).call(
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
            ref={svgEl}
            width={svgWidth}
            height={50}
            viewBox={`0 0 ${svgWidth} 50`}
          >
            <g>
              <rect
                ref={rectEl}
                x={`${ganttPosition[0]}`}
                y={`${ganttPosition[1] + 12}`}
                cursor="move"
                width={`${ganttWidth}`}
                height="26"
                fill={ganttColor}
                rx="14"
              />
              <rect
                className="grabbar"
                x={`${ganttPosition[0]}`}
                y={`${ganttPosition[1] + 12}`}
                width="8"
                fillOpacity="0"
                height="26"
                cursor="ew-resize"
                ref={rectLeftEl}
              />
              <rect
                className="grabbar"
                x={`${ganttPosition[0] + ganttWidth - 8}`}
                y={`${ganttPosition[1] + 12}`}
                width="8"
                cursor="ew-resize"
                fillOpacity="0"
                height="26"
                ref={rectRightEl}
              />
            </g>
            <text
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
