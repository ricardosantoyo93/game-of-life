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
            props.dead &&
            css`
                background-color: #333;
            `
        };
    `

/**
 * Individual item representing a single cell
 * @param {Object} props 
 * @param {Object} props.options Number of rows and columns
 * @param {Array<Array<Boolean>>} props.deadArray A matrix of boolean values for each cell
 * @param {Function} props.toggleDeadCell Action to toggle the value of an specific cell
 */
const Item = ({ options, deadArray, toggleDeadCell }) => {
    const { row, col } = options;
    const [dead, setDead] = useState(deadArray[row][col]);

    const deadCell = deadArray[row][col];

    /**
     * Click handler to change selection state
     */
    const clickHandler = () => {
        toggleDeadCell(row, col);
        setDead(!dead);
    };

    return (
        <Cell onClick={clickHandler} dead={deadCell}></Cell>
    );
}

const mapStateToProps = ({ grid }) => {
    const { dead } = grid;
    return {
        deadArray: dead
    }
};

export default connect(mapStateToProps, gridActions)(Item);
