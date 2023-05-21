import { fireAuth } from "./config";

/**
 * パスワードリセット用のメールを送信する関数
 * @param email メールアドレス
 * @returns
 */
export const forgetPass = (email) =>
  fireAuth.sendPasswordResetEmail(email);