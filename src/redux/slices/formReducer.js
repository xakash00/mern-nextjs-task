import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    formData: {},
    step: 3
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
        updateFormData: (state, action) => {
            state.formData = { ...state.formData, ...action.payload };
        },
        resetFormData: (state) => {
            state.formData = {};
        },
        nextStep: (state) => {
            state.step += 1
        },
        goBack: (state) => {
            state.step -= 1
        }
    },
});

export const { updateFormData, resetFormData, nextStep, goBack } = formSlice.actions;
export default formSlice.reducer;