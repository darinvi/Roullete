import { combineReducers } from "redux";
import betsReducer from './bets'

export default combineReducers({
    bets: betsReducer,
})