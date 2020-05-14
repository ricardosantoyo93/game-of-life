import React, { useState, useEffect, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import worker from 'workerize-loader!../../workers/worker';

import { Item } from './item';
import gridActions from './actions';
import coreActions from '../actions';

const workerInstance = worker();

const Container = styled.div`
        display: grid;
        --grid-cols: 1;
        --grid-rows: 1;
        grid-template-rows: repeat(var(--grid-rows), 1fr);
        grid-template-columns: repeat(var(--grid-cols), 1fr);

        ${props => 
            css`
                --grid-cols: ${props.cols};
                --grid-rows: ${props.rows};
            `
        }
    `;

const Button = styled.button`
    background: #4C8;
    border-radius: 3px;
    border: 2px solid #4C8;
    color: white;
    margin: 0 1em;
    padding: 0.25em 1em;
    font-size: 16px;
    text-transform: uppercase;

    ${props => props.stop &&
        css`
            background: #844;
            border-color: #844
        `
    }
  `

const Random = styled.button`
  background: #448;
  border-radius: 3px;
  border: 2px solid #448;
  color: white;
  margin: 0 1em;
  padding: 0.25em 1em;
  font-size: 16px;
  text-transform: uppercase;

  &:disabled {
    background-color: gray;
  }
`

const Grid = ({ run, toggleRun , grid, setNewGrid }) => {
    const items = [];
    const rows = grid.length;
    const cols = grid[0].length;
    const [start, setStart] = useState(run);

    for(let row = 0; row < grid.length; row++){
        let rowItems = [];
        for(let col = 0; col < grid[row].length; col++) {
            rowItems.push(<Item key={row + "x" + col} options={{row, col}} alive={grid[row][col]}></Item>);
        }

        items.push(rowItems);
    }

    const startExecution = () => {
        setStart(!start);
        toggleRun();
        workerInstance.calculateNewGrid(grid);
    }

    const stopExecution = () => {
        setStart(!start);
        toggleRun();
        workerInstance.stopWorker()
    }

    const randomizeCells = () => {
        const items = [];

        for(let row = 0; row < grid.length; row++){
            let rowItems = [];
            for(let col = 0; col < grid[row].length; col++) {
                rowItems.push(Math.random() >= 0.5);
            }
    
            items.push(rowItems);
        }

        setNewGrid(items);
    }

    const initEventListener = useCallback(() => {
        workerInstance.addEventListener('message', ({ data }) => {
            const { method, grid } = data;
            switch(method) {
              case 'update-grid':
                setNewGrid(grid);
                break;
              case 'worker-stopped':
                console.log(`%c Worker was stopped`, 'color: yellow; font-size: bold;');
                break;
              default:
                break;
            }
          });
     }, [setNewGrid]);

    useEffect(() => {
        initEventListener();
    }, [initEventListener]);

    return (
        <>  
            <br />
            <Container className={"container"} rows={rows} cols={cols}>
                { items }
            </Container>
            <br />
            <span>
                <Random onClick={ () => randomizeCells()} disabled={run} >Randomize</Random>
                <Button onClick={ () => start ? stopExecution() : startExecution() } stop={run} >{start ? 'Stop' : 'Start'}</Button>
            </span>
        </>
    )
}

const mapStateToProps = ({ core, grid }) => {
    const { run } = core;
    return {
        run,
        grid
    };
}

export default connect(mapStateToProps, { ...gridActions, ...coreActions })(Grid);
