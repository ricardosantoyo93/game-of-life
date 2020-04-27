import React, { useState } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components'

import gridActions from '../actions';

const Cell = styled.div`
        padding: 5px;
        border: 1px solid #ccc;
        text-align: center;
        background-color: #ddd;
        color: #111;
        font-size: 14px;
        width: 5px;
        height: 5px;

        ${props => 
            props.alive &&
            css`
                background-color: #333;
            `
        };
    `

/**
 * Individual item representing a single cell
 * @param {Object} props 
 * @param {Object} props.options Number of rows and columns
 * @param {Array<Array<Boolean>>} props.aliveArray A matrix of boolean values for each cell
 * @param {Function} props.toggleCell Action to toggle the value of an specific cell
 */
const Item = ({ options, aliveArray, toggleCell, run }) => {
    const { row, col } = options;
    const [alive, setAlive] = useState(aliveArray[row][col]);

    const aliveCell = aliveArray[row][col];

    /**
     * Click handler to change selection state
     */
    const clickHandler = () => {
        if(!run) {
            toggleCell(row, col);
            setAlive(!alive);
        }
    };

    return (
        <Cell onClick={clickHandler} alive={aliveCell}></Cell>
    );
}

const mapStateToProps = ({ core, grid }) => {
    const { run } = core;
    return {
        run,
        aliveArray: grid
    }
};

export default connect(mapStateToProps, gridActions)(Item);
