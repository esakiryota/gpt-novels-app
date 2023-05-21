import { fireAuth } from "./config";

/**
 * ログイン処理の実態です。
 * firebaseのログイン処理をラップしているだけです。
 * @param {email, password} ログインに必要な値
 * @returns Promise<firebase.auth.UserCredential>
 */
export const login = ({ email, password }) =>
  fireAuth.signInWithEmailAndPassword(email, password);