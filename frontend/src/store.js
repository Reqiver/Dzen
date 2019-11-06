import { createStore } from 'redux';
import { reducers } from './Components/Reducers/reducers';


export const store = createStore(reducers);
