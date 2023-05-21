
import { fireAuth } from "./config";

/**
 * サインアップ処理の実態です。
 * firebaseのサインアップ処理をラップしているだけです。
 * @param {email, password} ログインに必要な値
 * @returns Promise<firebase.auth.UserCredential>
 */
export const signup = ({ email, password }) =>
  fireAuth.createUserWithEmailAndPassword(email, password);