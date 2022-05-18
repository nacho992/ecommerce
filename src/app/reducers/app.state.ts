import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { loginReducer, registerReducer } from "./reducers/auth.reducers";
import { logOut } from "./actions/auth.actions";
import { UserState } from "../models/UserState.interface";

export interface AppState {
  userLogin: UserState;
  userRegister: UserState;
}

export const REDUCERS: ActionReducerMap<AppState> = {
  userLogin: loginReducer,
  userRegister: registerReducer,
}