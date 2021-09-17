import redux from 'redux';

import
    campaignsReducer from '../slices/campaignsSlice';

// CommonJS Workaround

const {
    applyMiddleware,
    combineReducers,
    createStore } = redux;



// Middleware /////////////////////////////////////////////////////////////////

// Taken from: https://redux.js.org/tutorials/fundamentals/part-6-async-logic#using-the-redux-thunk-middleware
const asyncFunctionMiddleware = storeAPI => next => action => {
    // If the "action" is actually a function instead...
    if (typeof action === 'function') {
      // then call the function and pass `dispatch` and `getState` as arguments
      return action(storeAPI.dispatch, storeAPI.getState)
    }
  
    // Otherwise, it's a normal action - send it onwards
    return next(action)
}

const middlewareEnhancer = applyMiddleware(asyncFunctionMiddleware)

// Store Creation /////////////////////////////////////////////////////////////

const rootReducer = combineReducers( {
    campaigns: campaignsReducer
} );

const store = createStore( rootReducer, middlewareEnhancer );



// Exportation ////////////////////////////////////////////////////////////////

export default store;
