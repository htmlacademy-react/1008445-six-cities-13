const AUTH_TOKEN_KEY_NAME = 'six-cities';

export type Token = string;

const getToken = (): Token => localStorage.getItem(AUTH_TOKEN_KEY_NAME) ?? '';
const setToken = (token: Token): void => localStorage.setItem(AUTH_TOKEN_KEY_NAME, token);
const removeToken = (): void => localStorage.removeItem(AUTH_TOKEN_KEY_NAME);

export {
  getToken,
  setToken,
  removeToken
};
