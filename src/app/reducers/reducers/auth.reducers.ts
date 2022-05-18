import { createReducer, on } from "@ngrx/store";
import { UserState } from "../../models/UserState.interface";
import * as actions from "../actions/auth.actions";

export const initialState: UserState = { success: false, user: {} };


export const loginReducer = createReducer(
    initialState,
    on(actions.loginUser, state => {
        return {...state}
    }),
    on(actions.logedUser,  (state, newState) => {
        return state = { success: newState.user.success, user: newState.user.user }
    }),
    on(actions.logOut,  state => {
        return state = { success: false, user: {} }
    }),
    /* login google */
    on(actions.loginGoogle, state => {
        return {...state}
    }),
    on(actions.logedGoogle,  (state, { user }) => {
        return  state = user; 
    }),
  );

  export const registerReducer = createReducer(
    initialState,
    on(actions.registerUser, state => {
        return {...state}
    }),
    on(actions.registeredUser,  (state,  newState ) => {
        return state = { success: true, user: newState.user.user }
    }),
  );