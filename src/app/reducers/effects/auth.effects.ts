import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import {
  map,
  mergeMap,
  catchError,
  tap,
  switchMap,
  concatMap,
} from 'rxjs/operators';

import {
  logedGoogle,
  logedUser,
  loginError,
  loginGoogle,
  loginUser,
  logOut,
  logOutSuccess,
  registeredUser,
  registerUser,
} from '../actions/auth.actions';

import { AuthService } from '../../shared/services/auth.service';
import { User } from 'src/app/shared/models/User.interface';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private router: Router
  ) {}

  private checkUserIsVerified(user: User) {
    if (user && user.emailVerified) {
      this.router.navigate(['/home']);
    } else if (user) {
      this.router.navigate(['/verification-email']);
    } else {
      this.router.navigate(['/register']);
    }
  }

  loginUser$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(loginUser),
      mergeMap((action) => {
        return this.authService
          .login(action.email, action.password)
          .then((user) => {
            this.checkUserIsVerified(user);
            if (!user) {
              return loginError()
            }
            return logedUser({
              user: {
                success: true,
                user: user,
              },
            });
          });
      })
    )
  );

  registerUser$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(registerUser),
      mergeMap((action) =>
        this.authService
          .register(action.email, action.password)
          .then((user) => {
            this.checkUserIsVerified(user);
            return registeredUser({ user: { success: true, user } });
          })
      )
    )
  );

  loginUserGoogle$: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
      ofType(loginGoogle),
      mergeMap((action) => {
        return this.authService.loginGoogle().then((user) => {
          this.checkUserIsVerified(user);
          return logedGoogle({ user: { success: true, user: user } });
        });
      }),
      catchError(() => of(loginError()))
    )
  );

  logOut$: Observable<Action> = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logOut),
        switchMap(() => {
          return this.authService.logout().then((res) => {
            this.router.navigateByUrl('home');
          });
        }),
        map(() => logOutSuccess()),
        catchError(() => of(loginError))
      ),
    { dispatch: false }
  );
}
