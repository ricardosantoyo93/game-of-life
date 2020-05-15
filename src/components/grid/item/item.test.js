import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import { Item } from './item';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

describe('Item Component', () => {
    const aliveArray = [
        [true]
    ];

    const options = {
        row: 0,
        col: 0
    };

    test('renders', () => {
        const wrapper = shallow(<Item options={options} aliveArray={aliveArray} />);

        expect(wrapper.exists()).toBe(true);
    });
});
