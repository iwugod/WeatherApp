import {createStore, compose} from 'redux'
import reducer from '../redux/reducer';
// import post from '../../data/posts'
// import comments from '../../data/comments'
import dataService from '../components/weather/dataService';

// const defaultState = {
//     post,
//     comments
// };

const defaultState = {
    dataService
};

const store = createStore(reducer, defaultState);

export default store;