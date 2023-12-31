import { createSlice } from "@reduxjs/toolkit";

const slice = createSlice({
    name: 'bets',
    initialState: {
        betCounter: 0,
        betHistory: [],
        betSummary: [],
        betTotal: 0,
        currentChip: 1000,
        preparedData: {
            numbers: [],
            payouts: []
        }
    },
    reducers: {
        setCurrentChip: (state, action) => {
            state.currentChip = action.payload;
        },
        handleBet: (state, action) => {
            const number = action.payload
            state.betHistory.push({ number: number, amount: state.currentChip, id: state.betCounter++ });
            state.betSummary = getSummary(state.betHistory);
            state.betTotal = calculateTotal(state.betSummary);
            state.preparedData = prepareData(state.betSummary);
        },
        removeSingleBet: (state, action) => {
            state.betHistory = state.betHistory.filter(bet => bet.id !== action.payload)
            state.betSummary = getSummary(state.betHistory);
            state.betTotal = calculateTotal(state.betSummary);
            state.preparedData = prepareData(state.betSummary);
        },
        removeAllBets: (state) => {
            state.betCounter = 0
            state.betHistory = []
            state.betSummary = []
            state.betTotal = 0
            state.preparedData = {
                numbers: [],
                payouts: []
            }
        },
        prepareSummaryForContract: (state) => {
            
        }
    },
});

export const {
    setCurrentChip,
    handleBet,
    removeSingleBet,
    removeAllBets,
} = slice.actions;
export default slice.reducer;

const BLACK_NUMBERS = [2, 4, 6, 8, 10, 11, 13, 15, 17, 20, 22, 24, 26, 28, 29, 31, 33, 35]
const RED_NUMBERS = [1, 3, 5, 7, 9, 12, 14, 16, 18, 19, 21, 23, 25, 27, 30, 32, 34, 36]

function getSummary(data) {
    const uniqueBetKeys = [...new Set(data.map(e => e.number))]
    let summary = {}
    for (let key of uniqueBetKeys) {
        const currentBets = data.filter(e => e.number === key)
        summary[key] = currentBets.reduce((curr, next) => {
            return curr += next.amount
        }, 0)
    }
    summary = handlNonNumericBets(summary)
    // Will be sending to solidity, so I can't use floats
    return roundValues(summary);
}

function handlNonNumericBets(data) {
    const NON_NUMERIC_KEYS = ['1st12', '2nd12', '3rd12', 'Odd', 'Even', 'Black', 'Red', '1 to 18', '19 to 36']
    let summary = {}
    for (let key of Object.keys(data)) {
        if (NON_NUMERIC_KEYS.includes(key)) {
            summary = handleNonNumericKey(summary, key, data[key]);
        } else {
            summary[key] = data[key];
        }
    }
    return summary
}

function handleNonNumericKey(currentState, bet, value) {
    let newState = currentState;
    switch (bet) {
        case '1st12':
        case '2nd12':
        case '3rd12':
            return newState = handleThirds(newState, bet, value);
        case 'Odd':
        case 'Even':
            return newState = handleEvenOdd(newState, bet, value);
        case 'Red':
        case 'Black':
            return newState = handleColors(newState, bet, value);
        case '1 to 18':
        case '19 to 36':
            return newState = handleHalves(newState, bet, value);
    }
    return newState
}

function handleThirds(state, bet, value) {
    const startStop = {
        '1st12': [1, 12],
        '2nd12': [13, 24],
        '3rd12': [25, 36],
    }
    for (let i = startStop[bet][0]; i <= startStop[bet][1]; i++) {
        if (state[i]) {
            state[i] += value / 12;
        } else {
            state[i] = value / 12;
        }
    }
    return state;
}

function handleEvenOdd(state, bet, value) {
    const evenStart = bet == 'Even' ? 1 : 0;
    for (let i = 1 + evenStart; i <= 36; i += 2) {
        if (state[i]) {
            state[i] += value / 18;
        } else {
            state[i] = value / 18;
        }
    }
    return state;
}

function handleColors(state, bet, value) {
    const currentNumbers = bet == 'Red' ? RED_NUMBERS : BLACK_NUMBERS
    for (let num of currentNumbers) {
        if (state[num]) {
            state[num] += value / 18;
        } else {
            state[num] = value / 18;
        }
    }
    return state;
}

function handleHalves(state, bet, value) {
    const startStop = bet == '1 to 18' ? [1, 18] : [19, 36]
    for (let i = startStop[0]; i <= startStop[1]; i++) {
        if (state[i]) {
            state[i] += value / 18;
        } else {
            state[i] = value / 18;
        }
    }
    return state;
}

function calculateTotal(data){
    let total = 0;
    for (let value of Object.values(data)) {
        total += value;
    }
    return total;
}

function roundValues(data){
    let summary = {};
    for (let [key, value] of Object.entries(data)) {
        summary[key] = Math.round(value)
    }
    return summary;
}

function prepareData(data){
    let preparedData = {
        numbers: [],
        payouts: []
    }
    for (let [key, value] of Object.entries(data)) {
        preparedData.numbers.push(key);
        preparedData.payouts.push(value);
    }
    return preparedData;
}