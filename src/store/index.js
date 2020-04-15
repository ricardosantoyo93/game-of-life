import { createStore } from 'redux';
import combinedReducers from '../components/reducer';
import initialState from './initial-state';

export default createStore(combinedReducers, initialState);
