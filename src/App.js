import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
// eslint-disable-next-line import/no-webpack-loader-syntax
import worker from 'workerize-loader!./workers/worker';

import { Grid } from './components';
import gridActions from './components/grid/actions';

import './App.css';

const workerInstance = worker();

const Button = styled.button`
  background: #088;
  border-radius: 3px;
  border: 2px solid #088;
  color: white;
  margin: 0 1em;
  padding: 0.25em 1em;
  font-size: 16px;
  text-transform: uppercase;

  &:disabled {
    background-color: gray;
  }
`

const DefaultBtn = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  margin: 0 1em;
  padding: 0.25em 1em;
  font-size: 16px;
  text-transform: uppercase;

  &:disabled {
    background-color: gray;
  }
`

const Input = styled.input`
  background: transparent;
  border-radius: 3px;
  border: 2px solid #bbb;
  color: #bbb;
  margin: 0 1em;
  padding: 0.25em 1em;
  font-size: 16px;
  width: 100px;
  text-transform: uppercase;
  text-align: center;

  &:disabled {
    background-color: gray;
  }
}
`
/**
 * Main component
 */
class App extends Component {
  constructor() {
    super();

    this.rowsRef = React.createRef();
    this.colsRef = React.createRef();
    this.state = {
      rows: 0,
      cols: 0,
      render: false
    };
  }

  componentDidMount() {
    workerInstance.addEventListener('message', ({ data }) => {
      const { method, grid } = data;
      switch(method) {
        case 'update-grid':
          this.props.setNewGrid(grid);
          break;
        case 'worker-stopped':
          console.log(`%c Worker was stopped`, 'color: yellow; font-size: bold;');
          break;
        default:
          break;
      }
    });
  }

  /**
   * Builds the grid and saves it into the store, then renders grid
   */
  saveGridToStore = async () => {
    const { rows, cols } = this.state;
    const { setNewGrid } = this.props;

    const alive = [];

    for(let row = 0; row < rows; row++){
        let rowAlive = [];
        for(let col = 0; col < cols; col++) {
            rowAlive.push(false);
        }

        alive.push(rowAlive);
    }

    await setNewGrid(alive);

    this.setState({
      ...this.state,
      render: true
    })
  }

  /**
   * Updates the state on the current values for rows and cols inputs
   */
  handleCreateClick = () => {
    let rowVal = this.rowsRef.current.value !== "" ? this.rowsRef.current.value : 1;
    let colVal = this.colsRef.current.value !== "" ? this.colsRef.current.value : 1;

    if(rowVal > 40 || colVal > 50) {
      alert('Max dimensions: 40x50');
      return
    }

    this.rowsRef.current.value = rowVal;
    this.colsRef.current.value = colVal;

    this.setState({
      rows: rowVal,
      cols: colVal,
      render: false
    }, this.saveGridToStore);
  };

  /**
   * Sets random values for the rows and cols, then updates the state
   */
  handleRandomClick = () => {
    // Max = 40x50, Min = 15x20
    const rowVal = Math.floor((Math.random() * 25) + 15);
    const colVal = Math.floor((Math.random() * 30) + 20);

    this.rowsRef.current.value = rowVal;
    this.colsRef.current.value = colVal;

    this.setState({
      rows: rowVal,
      cols: colVal,
      render: false
    }, this.saveGridToStore)
  };

  /**
   * Creates a grid from given values
   */
  createSpecificGrid = (rows, cols) => {
    this.rowsRef.current.value = rows;
    this.colsRef.current.value = cols;

    this.setState({
      rows,
      cols,
      render: false
    }, this.saveGridToStore)
  }

  render() {
    const message = <p>Select grid dimensions</p>;
    const run = this.props.run;

    return (
      <div className="App">
        <div className="App-container">
          { this.state.render ? <Grid worker={ workerInstance } /> : message}
          <br />
          <span>
            <Input disabled={run} ref={this.rowsRef} type={"number"} min={"1"} max={"50"} placeholder={"Rows"} /> 
            x 
            <Input disabled={run} ref={this.colsRef} type={"number"} min={"1"} max={"50"} placeholder={"Columns"} />
            <Button disabled={run} type={"button"} onClick={this.handleCreateClick}>Create Grid</Button>
          </span>
          <br />
          <span>
            <DefaultBtn disabled={run} type={"button"} onClick={()=> this.createSpecificGrid(20, 30) }>20 x 30</DefaultBtn>
            <DefaultBtn disabled={run} type={"button"} onClick={()=> this.createSpecificGrid(30, 40)}>30 x 40</DefaultBtn>
            <DefaultBtn disabled={run} type={"button"} onClick={()=> this.createSpecificGrid(40, 50)}>40 x 50</DefaultBtn>
            <DefaultBtn disabled={run} type={"button"} onClick={this.handleRandomClick}>Random</DefaultBtn>
          </span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ core }) => {
  return {
    run: core.run
  };
}

export default connect(mapStateToProps, gridActions)(App);
