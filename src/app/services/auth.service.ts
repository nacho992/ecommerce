import { User } from '../models/User.interface';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import auth from 'firebase/app/';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import {
  AngularFirestore,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public user$: Observable<User>;
  private logedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  constructor(
    public afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private _snackBar: MatSnackBar
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  public get isLogged(): Observable<boolean> {
    return this.logedIn.asObservable();
  }

  async loginGoogle(): Promise<User> {
    var userError: User;
    try {
      const { user } = await this.afAuth.signInWithPopup(
        new auth.auth.GoogleAuthProvider()
      );
      this.updateUserData(user);
      this.logedIn.next(true);
      return user;
    } catch (error) {
      this._snackBar.open('Error!', 'Close', {
        duration: 3000,
      });
      return userError;
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      this._snackBar.open('Error!', 'Close', {
        duration: 3000,
      });
    }
  }

  async sendVerificationEmail(): Promise<void> {
    return (await this.afAuth.currentUser).sendEmailVerification();
  }

  async login(email: string, password: string): Promise<User> {
    var userError: User;
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      this.updateUserData(user);
      this.logedIn.next(true);
      return user;
    } catch (error) {
      this._snackBar.open('Error!', 'Close', {
        duration: 3000,
      });
      return userError;
    }
  }

  async register(email: string, password: string): Promise<User> {
    var userError: User;
    try {
      const { user } = await this.afAuth.createUserWithEmailAndPassword(
        email,
        password
      );
      await this.sendVerificationEmail();
      return user;
    } catch (error) {
      this._snackBar.open('Error!', 'Close', {
        duration: 3000,
      });
      return userError;
    }
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
      this.logedIn.next(false);
    } catch (error) {
      this._snackBar.open('Error!', 'Close', {
        duration: 3000,
      });
    }
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(
      `users/${user.uid}`
    );

    const data: User = {
      uid: user.uid,
      email: user.email,
      emailVerified: user.emailVerified,
      displayName: user.displayName,
      photoURL: user.photoURL,
    };

    return userRef.set(data, { merge: true });
  }
}
