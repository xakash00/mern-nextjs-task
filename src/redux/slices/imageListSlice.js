import { createSlice } from '@reduxjs/toolkit';



const initialState = {
    photos: [],
    status: 'idle',
    error: null,
    current_page: 0,
    scroll_position_id: null,
    category: "",
    pageLoading: false
};


const photosSlice = createSlice({
    name: 'photos',
    initialState,
    reducers: {
        increment: (state) => {
            state.current_page += 20
        },
        decrement: (state) => {
            if (state.current_page > 0) {
                state.current_page -= 20
            }
        },
        incrementByAmount: (state, action) => {
            state.current_page += action.payload
        },
        scroll_position: (state, action) => {
            state.scroll_position_id = action.payload
        },
        setCategory: (state, action) => {
            state.category = action.payload
        },
        setPageLoading: (state, action) => {
            state.status = action.payload
        },
    },
});
export const { increment, decrement, incrementByAmount, scroll_position, setCategory, setPageLoading } = photosSlice.actions


export const photoReducer = photosSlice.reducer;