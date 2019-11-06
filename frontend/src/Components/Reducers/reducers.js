import { combineReducers } from 'redux';
import {userReducer} from './user';
import {libraryReducer} from './library';
import {aythorReducer} from './author';
import {eventReducer} from './event';
import {charityReducer} from './charity';

export const reducers = combineReducers({
    user: userReducer,
    library: libraryReducer,
    author: aythorReducer,
    event: eventReducer,
    charity: charityReducer,
})
