import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'bets',
    initialState: {
        betCounter: 0,
        betHistory: [],
        betSummary: [],
        currentChip: 1000,
    },
    reducers: {
        setCurrentChip: (state, action) => {
            state.currentChip = action.payload;
        },
        handleBet: (state, action) => {
            const number = action.payload
            state.betHistory.push({number: number, amount: state.currentChip, id: state.betCounter++});
            state.betSummary = getSummary(state.betHistory);
        },
        removeSingleBet: (state, action) => {
            state.betHistory = state.betHistory.filter(bet => bet.id !== action.payload)
            state.betSummary = getSummary(state.betHistory);
        }
    },
});

export const {
    setCurrentChip,
    handleBet,
    removeSingleBet,
} = slice.actions;
export default slice.reducer;

function getSummary(data){
    const uniqueBetKeys = [...new Set(data.map( e => e.number ))]
    let summary = {}
    for (let key of uniqueBetKeys) {
        const currentBets = data.filter( e => e.number === key)
        summary[key] = currentBets.reduce((curr, next)=>{
            return curr += next.amount
        },0)
    }
    return handlNonNumericBets(summary);
}

function handlNonNumericBets(data){
    return data
}