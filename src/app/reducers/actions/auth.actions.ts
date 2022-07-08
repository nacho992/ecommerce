import { createAction, props } from "@ngrx/store";
import { UserState } from "../../shared/models/UserState.interface";

/* Login Actions */
export const loginUser = createAction(
    "[Login Page] Login",
    props<{ email: string, password: string }>()
  );

  export const logedUser = createAction(
    "[Login Page] Login success",
    props<{ user: UserState }>()
  );

  export const loginGoogle = createAction(
    "[Login Page] Login Google",
  );

  export const logedGoogle = createAction(
    "[Login Page] Login Google success",
    props<{ user: UserState }>()
  );

  export const loginError = createAction(
    "[Login Page] Login Error",
  );

  export const logOut = createAction(
    "[Login Page] Logout",
  );

  export const logOutSuccess = createAction(
    "[Login Page] Logout Success",
  );

  /* Register Actions */
  export const registerUser = createAction(
    "[Register Page] Register",
    props<{ email: string, password: string }>()
  );

  export const registeredUser = createAction(
    "[Register Page] Register success",
    props<{ user: UserState }>()
  );

  export const registerError = createAction(
    "[Register Page] Register Error",
  );
