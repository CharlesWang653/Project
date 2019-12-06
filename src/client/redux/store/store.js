import userListReducer from "../reducer/userList";
import userReducer from "../reducer/OneUser";
import nameIdReducer from "../reducer/nameIdList"
import {combineReducers} from "redux";
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from "redux";

const reducers = combineReducers({
  userReducer,userListReducer,nameIdReducer
})
export const userListstore = createStore(reducers, applyMiddleware(thunk));