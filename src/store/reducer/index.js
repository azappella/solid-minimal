import { combineReducers } from 'redux';

import { reducer as authReducer } from '../auth';

const rootReducer = combineReducers({
    auth: authReducer
});

export default rootReducer;
