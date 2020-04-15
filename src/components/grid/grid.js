import React, { Component } from 'react';
import { connect } from 'react-redux';
import styled, { css } from 'styled-components';

import { Item } from './item';
import { updateSelectedCell } from './actions';

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

class Grid extends Component {
    constructor(props) {
        super(props);

        this.state = {
            items: [],
            selected: []
        };
    }

    /**
     * Grid dimensions depend on the props for rows and cols, that's why I'm using the memoization helper
     * @param {Object} props Component props
     * @returns {Object} New state
     */
    static getDerivedStateFromProps(props) {
        const rows = props.rows;
        const cols = props.cols;

        const items = [];
        const selected = [];

        for(let row = 0; row < rows; row++){
            let rowItems = [];
            let rowSelected = [];
            for(let col = 0; col < cols; col++) {
                rowSelected.push(false);
                rowItems.push(<Item key={row + "x" + col} selected={rowSelected[col]}></Item>);
                // rowItems.push(<p>Hello</p>);
            }

            items.push(rowItems);
            selected.push(rowSelected);
        }

        return {
            items,
            selected
        }
    }

    render() {
        const message = <p>Select grid dimensions or click on random</p>;

        return (
            <>
                <Container className={"container"} rows={this.props.rows} cols={this.props.cols}>
                    {this.state.items.length !== 0 ? this.state.items : message}
                </Container>
                <br />
            </>
        )
    }
}

const mapStateToProps = ({ grid }) => {
    return grid;
}

export default connect(mapStateToProps, { updateSelectedCell })(Grid);
