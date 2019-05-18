import get from 'lodash.get';
import { createAction, createReducer } from 'redux-act';

const initialState = { user: null };

const SET_USER = 'rm/auth/SET_USER';
const setUser = createAction(SET_USER);

export const reducer = createReducer({
    [setUser]: (state, payload) => ({
        ...state,
        user: payload
    })
}, initialState);

export const getUser = (state) => get(state, ['auth', 'user'], null);