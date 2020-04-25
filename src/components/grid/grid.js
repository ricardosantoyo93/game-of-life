import React, { useState, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import { Item } from './item';
import gridActions from './actions';
import coreActions from '../actions';

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
    background: #498;
    border-radius: 3px;
    border: 2px solid #498;
    color: white;
    margin: 0 1em;
    padding: 0.25em 1em;
    font-size: 16px;
    text-transform: uppercase;
  `

const Grid = ({ run, toggleRun , dead, worker }) => {
    const items = [];
    const rows = dead.length;
    const cols = dead[0].length;
    const [start, setStart] = useState(run);

    for(let row = 0; row < dead.length; row++){
        let rowItems = [];
        for(let col = 0; col < dead[row].length; col++) {
            rowItems.push(<Item key={row + "x" + col} options={{row, col}} dead={dead[row][col]}></Item>);
        }

        items.push(rowItems);
    }

    const startExecution = () => {
        setStart(!start);
        toggleRun();
        worker.calculateNewGrid(dead);
    }

    const stopExecution = () => {
        setStart(!start);
        toggleRun();
        worker.stopWorker()
    }

    return (
        <>
            <Container className={"container"} rows={rows} cols={cols}>
                { items }
            </Container>
            <br />
            { !start ? <Button onClick={ () => startExecution() }>Start</Button> : '' }
            { start ? <Button onClick={ () => stopExecution() }>Stop</Button> : '' }
        </>
    )
}

const mapStateToProps = ({ core, grid }) => {
    const { dead } = grid;
    const { run } = core;
    return {
        run,
        dead
    };
}

export default connect(mapStateToProps, { ...gridActions, ...coreActions })(Grid);
