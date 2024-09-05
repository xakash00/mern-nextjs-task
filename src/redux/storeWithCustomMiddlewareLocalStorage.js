import { configureStore } from '@reduxjs/toolkit';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from '@reduxjs/toolkit';


const allReducers = combineReducers({

})


const localStorageMiddleware = ({ getState }) => {
    return next => action => {
        if (typeof window !== "undefined") {
            const result = next(action);
            localStorage.setItem('applicationState', JSON.stringify(getState().blogListReducer));
            return result;
        }
    };
};

const reHydrateStore = () => {
    if (typeof window !== "undefined") {
        if (localStorage.getItem('applicationState') !== null) {
            return JSON.parse(localStorage.getItem('applicationState')); // re-hydrate the store
        }
    }
    return
};

const rootReduer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        };
        return nextState;
    } else {
        return allReducers(state, action);
    }
};
const makeStore = () =>
    configureStore({
        reducer: rootReduer,
        preloadedState: reHydrateStore(),
        middleware: getDefaultMiddleware =>
            getDefaultMiddleware({ serializableCheck: false }).concat(localStorageMiddleware),

    });

export const wrapper = createWrapper(makeStore);