import React from 'react';
import Item from './item';
import styled, { css } from 'styled-components';

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

const Grid = (props) => {
    let rows = props.rows;
    let cols = props.cols;

    const message = <p>Select grid dimensions</p>

    const items = [];
    const selected = [];
    for(let i = 0; i < (rows * cols); i++){
        selected.push(false);
        items.push(<Item key={i} selected={selected[i]}>{i + 1}</Item>);
    }

    return (
        <>
            <Container className={"container"} rows={rows} cols={cols}>
                {items.length !== 0 ? items : message}
            </Container>
            <br />
        </>
    )
}

export default Grid;
