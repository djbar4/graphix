import React, { Component } from 'react';
import * as d3 from 'd3';
import styles from '../styles.module.css';
import { addDefaultNodeAttributes } from './node-attributes';

import tooltipFuncs from './tooltip';
import dragFuncs from './node-drag';

const simulation = d3.forceSimulation().alpha(0);
const linkGen = d3.linkVertical();

class Graph extends Component {
  constructor(props) {
    super(props);
    console.log('🚀 ~ props', props);

    this.containerRefs = React.createRef();
    this.forceTick = this.forceTick.bind(this);
    simulation.on('tick', this.forceTick);
  }

  componentDidMount() {
    this.container = d3.select(this.containerRefs.current);
    this.calculateLinks();
    this.renderLinks();
    this.renderNodes();
    this.renderTexts();
    this.setSimulation();
    tooltipFuncs.createTooltip();
  }

  setSimulation() {
    simulation.nodes(this.props.nodes)
      .force('link', d3.forceLink(this.props.edges).id(d => d.id))
      .restart();
  }

  calculateLinks() {
    this.calcEdges = this.props.edges.reduce((arr, curr) => {
      const source = [curr.source.x + (this.props.nodeWidth / 2), curr.source.y + (this.props.nodeHeight / 2)];
      const target = [curr.target.x + (this.props.nodeWidth / 2), curr.target.y + (this.props.nodeHeight / 2)];
      arr.push({ source: source, target: target });
      return arr;
    }, []);
  }

  renderLinks() {
    this.lines = this.container.selectAll('path')
      .data(this.calcEdges)
      .join('path')
      .attrs({
        class: 'edge',
        fill: 'none',
        stroke: 'black',
        'stroke-width': 2,
        oppacity: 0,
        d: linkGen
      });
    console.log('rendered link');
  }

  renderNodes() {
    this.nodes = this.container.selectAll('.nodes')
      .data(this.props.nodes, d => d.id)
      .enter()
      .append('g')
      .attr('class', 'nodeGroup')
      .attr('id', d => `${d.id}_group`)
      .append('rect');

    addDefaultNodeAttributes(this.nodes, this.props);

    this.nodes.call(d3.drag().on('start', dragFuncs.dragStarted)
      .on('drag', (event, d) => {
        dragFuncs.dragged(event, d, simulation);
      })
      .on('end', dragFuncs.dragEnded));

    this.nodes.on('click', tooltipFuncs.displayTooltip);
  }

  renderTexts() {
    this.texts = this.container.selectAll('.nodeGroup')
      .append('text')
      .text(d => d.name)
      .attrs({
        id: d => d.id + '_text'
      });
  }

  // Tick tock
  forceTick() {
    console.log('tiktok');
    this.nodes.attrs({
      x: d => d.x,
      y: d => d.y
    });

    this.texts.attrs({
      x: d => d.x + (this.props.nodeWidth / 2),
      y: d => d.y + (this.props.nodeHeight / 2)
    });

    this.calculateLinks();
    this.renderLinks();
    this.texts.raise();
  }

  render() {
    return (
      <g className='graph' ref={this.containerRefs} />
    );
  }
}

export default Graph;
