import get from 'lodash.get';
import {  createReducer } from 'redux-act';

import { hGet } from '../../lib/fetch';

import {
    createApiRequest,
    createApiActionNames,
    createActions,
    createApiReducers,
    mapActionsToReducers
} from '../../lib/redux-helpers';

const initialState = {
    token: {
        isFetching: false,
        result: null,
        error: null,
    }
};

const tokenActions = createActions(createApiActionNames('ns/auth/TOKEN'));
const tokenReducers = createApiReducers('token');
const tokenReducer = mapActionsToReducers(tokenActions, tokenReducers);

export const fetchToken = ({ username, password }) => createApiRequest({
    apiRequest: () => new Promise((resolve) => resolve({ username, password })),
    onRequest: () => tokenActions.request(),
    onSuccess: (response) => tokenActions.success(response),
    onFailure: (error) => tokenActions.failure(error)
});

export const reducer = createReducer({
    ...tokenReducer
}, initialState);

export const getToken = (state) => get(state, ['auth', 'token'], null);