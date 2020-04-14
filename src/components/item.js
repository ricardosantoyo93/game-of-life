import React, { useState } from 'react';
import styled, { css } from 'styled-components'

const GridItem = styled.div`
        padding: 5px;
        border: 1px solid #ccc;
        text-align: center;
        background-color: #ddd;
        color: #111;
        font-size: 14px;
        width: 5px;
        height: 5px;

        ${props => 
            props.selected &&
            css`
                background-color: #333;
            `
        };
    `

const Item = (props) => {
    const [selected, setSelected] = useState(props.selected);

    const clickHandler = () => {
        setSelected(!selected);
    };

    return (
        <GridItem onClick={clickHandler} selected={selected}></GridItem>
    );
}

export default Item;
