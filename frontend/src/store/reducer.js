import { combineReducers } from "redux";
import betsReducer from './bets'
import contractsReducer from './contracts'

export default combineReducers({
    bets: betsReducer,
    contracts: contractsReducer,
})