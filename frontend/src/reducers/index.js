import { combineReducers } from 'redux';

import auth from './auth';
import game from './game'

export const reducers = combineReducers({ auth, game });
