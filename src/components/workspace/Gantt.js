import React from 'react'
import * as d3 from 'd3';
import './gantt.css';


export class Gantt extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      svgWidth: 0,
      ganttWidth: 0,
      ganttPosition: [0, 0],
      scale: () => {}
    }
    this.el = React.createRef();
    this.svgEl = React.createRef();
    this.rectEl = React.createRef();
    this.rectLeftEl = React.createRef();
    this.rectRightEl = React.createRef();
  }

  updateSize() {
    if (this.el.current) {
      const svgWidth = this.el.current.getBoundingClientRect().width;
      this.setState({
        svgWidth,
        scale: this.getScale(svgWidth)
      })
    }
  }

  componentDidMount() {
    window.addEventListener('resize', () => this.updateSize());
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
    onChange({
      start: scale.invert(targetX),
      end: new Date(new Date(scale.invert(targetX)).getTime() + duration)
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

  componentWillUnmount() {
    window.removeEventListener('resize', () => this.updateSize())
  }

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
  }

  updateGantt() {
    const { scale } = this.state;
    const { start, end } = this.props;
    this.setState({
      ganttPosition: [
        scale(this.props.start),
        0
      ],
      ganttWidth: Math.abs(scale(end) - scale(start))
    })
  }

  getScale(width) {
    return d3.scaleTime()
    .domain([new Date('2021/01/01'), new Date('2021/12/31')])
    .range([0, width]);
  }

  render() {
    return (
    <div ref={this.el} className="gantt">
      <svg
        ref={this.svgEl}
        width={this.state.svgWidth}
        height={50}
        viewBox={`0 0 ${this.state.svgWidth} 50`}
      >
        <rect 
          ref={this.rectEl}
          x={`${this.state.ganttPosition[0]}`}
          y={`${this.state.ganttPosition[1]}`}
          cursor="move"
          width={`${this.state.ganttWidth}`} height="50" fill="red"
        />
        <rect
          className="grabbar"
          x={`${this.state.ganttPosition[0]}`}
          y={`${this.state.ganttPosition[1]}`}
          width="4"
          fill="blue"
          height="50"
          cursor="ew-resize"
          ref={this.rectLeftEl}
        />
        <rect
        className="grabbar"
          x={`${this.state.ganttPosition[0] + this.state.ganttWidth - 4}`}
          y={`${this.state.ganttPosition[1]}`}
          width="4"
          cursor="ew-resize"
          fill="blue"
          height="50"
          ref={this.rectRightEl}
        />
      </svg>
    </div>
    );
  }
}