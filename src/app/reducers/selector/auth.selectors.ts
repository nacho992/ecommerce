import { createSelector } from "@ngrx/store";
import { UserState } from "../../shared/models/UserState.interface";
import { AppState } from "../app.state";

export const selectUserFeature = (state: AppState) => state.userLogin;

export const selectUserData = createSelector(
  selectUserFeature,
  (state: UserState) => state.user?.uid
);

export const selectUserName = createSelector(
  selectUserFeature,
  (state: UserState) => state.user?.email
);
