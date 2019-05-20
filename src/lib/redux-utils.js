import { createAction } from 'redux-act';

export const setIn = (objProperty) => (state, payload) => ({
    ...state,
    [objProperty]: {
        ...state[objProperty],
        ...payload
    }
});

export const addToArray = (objProperty) => (state, payload) => ({
    ...state,
    [objProperty]: [
        ...state[objProperty],
        { ...payload }
    ]
});

export const requestReducer = (objProperty) => (state) => {
    return {
        ...state,
        [objProperty]: {
            ...state[objProperty],
            isFetching: true,
        }
    };
};

export const successReducer = (objProperty) => (state, payload) => ({
    ...state,
    [objProperty]: {
        ...state[objProperty],
        isFetching: false,
        result: payload
    }
});

export const failureReducer = (objProperty) => (state, payload) => ({
    ...state,
    [objProperty]: {
        ...state[objProperty],
        isFetching: false,
        error: payload
    }
});

export function createApiRequest({ apiRequest, onRequest, onSuccess, onError }) {
    return (dispatch) => {
        dispatch(onRequest());
        return apiRequest()
            .then((response) => dispatch(onSuccess(response)))
            .catch((error) => dispatch(onError(error)));
    };
}

export const createApiActionNames = (prefix) => ({
    request: `${prefix}_REQUEST`,
    success: `${prefix}_SUCCESS`,
    failure: `${prefix}_FAILURE`,
});

export const createActions = (actions) =>
    Object.keys(actions).reduce((acc, actionType) => {
        acc[actionType] = createAction(actions[actionType]);
        return acc;
    }, {});

export const createApiReducers = (objProperty) => ({
    request: requestReducer(objProperty),
    success: successReducer(objProperty),
    failure: failureReducer(objProperty)
});

export const mapActionsToReducers = (actions, reducers) =>
    Object.keys(actions).reduce((acc, action) => {
        acc[actions[action]] = reducers[action];
        return acc;
    }, {});

export const createApiActionsAndReducers = (prefix, objProperty) => {
    const actions = createActions(createApiActionNames(prefix));
    const reducers = createApiReducers(objProperty);
    return mapActionsToReducers(actions, reducers);
};