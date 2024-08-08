import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { photoReducer } from "./slices/imageListSlice";
import formReducer from './slices/formReducer';
import axios from 'axios';

const reducers = combineReducers({
    photos: photoReducer,
    form: formReducer
})

const mainReducer = (state, action) => {
    if (action.type === HYDRATE) {
        const nextState = {
            ...state,
            ...action.payload,
        };
        return nextState;
    } else {
        return reducers(state, action);
    }
};

const makeStore = () =>
    configureStore({ reducer: mainReducer, });

export const wrapper = createWrapper(makeStore);

