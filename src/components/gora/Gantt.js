import React from 'react'
import * as d3 from 'd3';
import { styled } from 'styletron-react';
import { motion } from "framer-motion"
import { twoDateDurationDay } from './utils';

const GanttBase = styled('div', {
  height: '50px'
})

export class Gantt extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      svgWidth: 0,
      ganttWidth: 0,
      ganttPosition: [0, 0],
      scale: () => {},
      ganttColor: props.ganttColor ? props.ganttColor : '#333333'
    }
    this.el = React.createRef();
    this.svgEl = React.createRef();
    this.rectEl = React.createRef();
    this.rectLeftEl = React.createRef();
    this.rectRightEl = React.createRef();
  }

  updateSize() {
    if (this.el.current) {
      this.setState({
        svgWidth: 760,
        scale: this.getScale(760, this.props.rootStart, this.props.rootEnd)
      })
    }
  }

  componentDidMount() {
    this.updateSize();

    d3.select(this.rectEl.current)
      .call(
        d3.drag()
          .on('drag', event => this.drag(event))
      )
    d3.select(this.rectLeftEl.current)
      .call(
        d3.drag()
          .on('drag', event => this.grabLeftdrag(event))
      )
    d3.select(this.rectRightEl.current)
      .call(
        d3.drag()
          .on('drag', event => this.grabRightdrag(event))
      )
  }

  drag(event) {
    const { start, end, onChange } = this.props;
    const { scale } = this.state;
    const duration = end - start;
    const targetX = +d3.select(this.rectEl.current).attr("x") + event.dx;
    const newStart = scale.invert(targetX);
    const newEnd = new Date(new Date(scale.invert(targetX)).getTime() + duration);
    onChange({
      start: newStart,
      end: newEnd
    })
  }

  grabLeftdrag(event) {
    const { end, onChange } = this.props;
    const { scale } = this.state;
    const newStart = scale.invert(event.x);

    if (scale(end) - scale(newStart) < 10) return;

    onChange({
      start: newStart,
      end: end
    })
  }

  grabRightdrag(event) {
    const { start, onChange } = this.props;
    const { scale } = this.state;
    const newEnd = scale.invert(event.x);

    if (scale(newEnd) - scale(start) < 10) return;

    onChange({
      start: start,
      end: scale.invert(event.x)
    })
  }

  componentWillUnmount() {}

  componentDidUpdate(preProps, preState) {
    if (preState.scale !== this.state.scale) {
      this.updateGantt();
    }

    if (preProps.start !== this.props.start) {
      this.updateGantt();
    }

    if (preProps.end !== this.props.end) {
      this.updateGantt();
    }

    if (preProps.ganttColor !== this.props.ganttColor) {
      this.updateGantt();
    }

    if (preProps.rootStart !== this.props.rootStart) {
      this.updateSize();
      this.updateGantt();
    }

    if (preProps.rootEnd !== this.props.rootEnd) {
      this.updateSize();
      this.updateGantt();
    }

  }

  updateGantt() {
    const { scale } = this.state;
    const { start, end, ganttColor } = this.props;
    this.setState({
      ganttPosition: [
        scale(this.props.start),
        0
      ],
      ganttWidth: Math.abs(scale(end) - scale(start)),
      ganttColor
    })
  }

  getScale(width, rootStart, rootEnd) {
    return d3.scaleTime()
    .domain([rootStart, rootEnd])
    .range([0, width]);
  }

  render() {
    const { start, end } = this.props;
    const days = twoDateDurationDay(start, end);
    return (
      <motion.div
        whileHover={{ opacity: 0.7 }}
        whileTap={{ opacity: 0.7 }}>
        <GanttBase ref={this.el}>
          <svg
            ref={this.svgEl}
            width={this.state.svgWidth}
            height={50}
            viewBox={`0 0 ${this.state.svgWidth} 50`}
          >
            <g>
              <rect
                ref={this.rectEl}
                x={`${this.state.ganttPosition[0]}`}
                y={`${this.state.ganttPosition[1] + 12}`}
                cursor="move"
                width={`${this.state.ganttWidth}`} height="26" fill={this.state.ganttColor}
                rx="14"
              />
              <rect
                className="grabbar"
                x={`${this.state.ganttPosition[0]}`}
                y={`${this.state.ganttPosition[1] + 12}`}
                width="8"
                fillOpacity="0"
                height="26"
                cursor="ew-resize"
                ref={this.rectLeftEl}
              />
              <rect
                className="grabbar"
                x={`${this.state.ganttPosition[0] + this.state.ganttWidth - 8}`}
                y={`${this.state.ganttPosition[1] + 12}`}
                width="8"
                cursor="ew-resize"
                fillOpacity="0"
                height="26"
                ref={this.rectRightEl}
              />
            </g>
            <text style={{pointerEvents: 'none'}} fontWeight="500" x={`${this.state.ganttPosition[0] + this.state.ganttWidth + 4}`} y="30" cy=".65em">{days}</text>
          </svg>
        </GanttBase>
        </motion.div>
    );
  }
}