import React, { Component } from 'react';
import { render } from 'react-dom';
import Hello from './Hello';
import './style.css';

interface AppProps { }
interface AppState {
  name: string;
}

const makePoints = (size: number) => Array.from(new Array(size), (x, i) => i).flatMap(i => Array.from(new Array(size), (x, k) => k).map(k => [i, k]))

const getColor = (point: [number, number]): string => 'red'

class App extends Component<AppProps, AppState> {
  constructor(props) {
    super(props);
    this.state = {
      name: 'React'
    };
  }

  render() {
    return (
      <svg width="100vw" height="100vh" preserveAspectRatio="none" viewBox="0 0 100 100">
        {
          makePoints(200)
          .map(([x, y]) => ({x, y, color: getColor([x, y])}))
          .map(
            ({x, y, color}) =>
              <rect
                x={x} 
                y={y} 
                width="1" 
                height="1" 
                fill={color} 
                stroke="white"
                stroke-width=".1"
              />
          )
        }
      </svg>
    );
  }
}

render(<App />, document.getElementById('root'));
