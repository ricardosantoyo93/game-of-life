import React from 'react';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

import { Item } from './item';
import gridActions from './actions';

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

const Grid = ({ dead }) => {
    const items = [];
    const rows = dead.length;
    const cols = dead[0].length;

    for(let row = 0; row < dead.length; row++){
        let rowItems = [];
        for(let col = 0; col < dead[row].length; col++) {
            rowItems.push(<Item key={row + "x" + col} options={{row, col}} dead={dead[row][col]}></Item>);
        }

        items.push(rowItems);
    }

    return (
        <>
            <Container className={"container"} rows={rows} cols={cols}>
                { items }
            </Container>
            <br />
        </>
    )
}

const mapStateToProps = ({ grid }) => {
    const { dead } = grid;
    return {
        dead
    };
}

export default connect(mapStateToProps, gridActions)(Grid);
