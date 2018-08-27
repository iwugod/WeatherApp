import {createStore, compose} from 'redux'
import reducer from '../../redux/photo/reducer';
import post from '../../data/posts'
import comments from '../../data/comments'

const defaultState = {
    post,
    comments
};

const store = createStore(reducer, defaultState);

export default store;