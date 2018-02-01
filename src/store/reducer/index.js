import reducer from './reducer';
import {combineReducers} from 'redux';
import todoReducer from './todoReducer';

export default combineReducers({
    root: reducer,
    todoReducer
});

