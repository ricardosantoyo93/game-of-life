import React, { Component } from 'react';
import styled from 'styled-components';

import { Grid } from './components';

import './App.css';

const Button = styled.button`
  background: #088;
  border-radius: 3px;
  border: 2px solid #088;
  color: white;
  margin: 0 1em;
  padding: 0.25em 1em;
  font-size: 16px;
  text-transform: uppercase;
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
`

class App extends Component {
  constructor() {
    super();

    this.rowsRef = React.createRef();
    this.colsRef = React.createRef();
    this.state = {
      rows: 0,
      cols: 0,
      random: false
    };
  }

  handleCreateClick = () => {
    const rowVal = this.rowsRef.current.value !== "" ? this.rowsRef.current.value : 1;
    const colVal = this.colsRef.current.value !== "" ? this.colsRef.current.value : 1;

    this.rowsRef.current.value = rowVal;
    this.colsRef.current.value = colVal;

    this.setState({
      ...this.state,
      rows: rowVal,
      cols: colVal
    });
  };

  handleRandomClick = () => {
    // Max = 40x50, Min = 15x20
    const rowVal = Math.floor((Math.random() * 25) + 15);
    const colVal = Math.floor((Math.random() * 30) + 20);

    this.rowsRef.current.value = rowVal;
    this.colsRef.current.value = colVal;

    this.setState({
      rows: rowVal,
      cols: colVal,
      random: true
    })
  };

  createSpecificGrid = (rows, cols) => {
    this.rowsRef.current.value = rows;
    this.colsRef.current.value = cols;

    this.setState({
      ...this.state,
      rows,
      cols
    })
  }

  render() {

    return (
      <div className="App">
        <header className="App-header">
          <Grid rows={this.state.rows} cols={this.state.cols} random={this.state.random}/>
          <br />
          <span>
            <Input ref={this.rowsRef} type={"number"} min={"1"} max={"20"} placeholder={"Rows"} /> 
            x 
            <Input ref={this.colsRef} type={"number"} min={"1"} max={"20"} placeholder={"Columns"} />
            <Button type={"button"} onClick={this.handleCreateClick}>Create Grid</Button>
          </span>
          <br />
          <span>
            <DefaultBtn type={"button"} onClick={()=> this.createSpecificGrid(20, 30) }>20 x 30</DefaultBtn>
            <DefaultBtn type={"button"} onClick={()=> this.createSpecificGrid(30, 40)}>30 x 40</DefaultBtn>
            <DefaultBtn type={"button"} onClick={()=> this.createSpecificGrid(40, 50)}>40 x 50</DefaultBtn>
            <DefaultBtn type={"button"} onClick={this.handleRandomClick}>Random</DefaultBtn>
          </span>
        </header>
      </div>
    );
  }
}

export default App;
