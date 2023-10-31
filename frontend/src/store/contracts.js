import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'contracts',
    initialState: {
        rollCounter: 0,
        loading: false,
        roll: null,
        lastTotal: 0,
    },
    reducers: {
        setLoading: (state, action) => {
            if ([false, true].includes(action.payload)){
                state.loading = action.payload;
            }
        },
        handleRollEvent: (state, action) => {
            state.roll = {...action.payload, id:state.rollCounter++}
            state.loading = false;
        },
        setTotal: (state, action) => {
            state.lastTotal = action.payload;
        }
    },
});

export const {
    setLoading,
    handleRollEvent,
    setTotal
} = slice.actions;
export default slice.reducer;
