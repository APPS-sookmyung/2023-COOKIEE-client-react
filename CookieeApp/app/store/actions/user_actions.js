import { SIGN_IN, SIGN_UP } from "../types";

export function signIn() {
  return {
    type: SIGN_IN,
    payload: {
      email: "example@sample.com",
      token: "asdfghjkljsasdfghj",
    },
  };
}
export function signUp() {
  return {
    type: SIGN_UP,
    payload: {
      email: "example@sample.com",
      token: "asdfghjkljsasdfghj",
    },
  };
}
