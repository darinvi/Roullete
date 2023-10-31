import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'contracts',
    initialState: {
        rollCounter: 0,
        loading: false,
        rollHistory: [],
        lastRoll: {},
    },
    reducers: {
        setLoading: (state, action) => {
            if ([false, true].includes(action.payload)){
                state.loading = action.payload;
            }
        },
        handleRollEvent: (state, action) => {
            const roll = {...action.payload, id:state.rollCounter++}
            state.rollHistory.push(roll)
            state.lastRoll = roll
            state.loading = false;
        }
    },
});

export const {
    setLoading
} = slice.actions;
export default slice.reducer;
