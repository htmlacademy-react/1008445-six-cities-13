import { TUserData } from '../types/user-data.ts';
import { USER_DATA_KEY_NAME } from '../const.ts';
const getUserData = (): TUserData | undefined => {
  const data = localStorage.getItem(USER_DATA_KEY_NAME);
  return data ? JSON.parse(data) as TUserData : undefined;
};
const setUserData = (data: TUserData): void => localStorage.setItem(USER_DATA_KEY_NAME, JSON.stringify(data));
const removeUserData = (): void => localStorage.removeItem(USER_DATA_KEY_NAME);

export {
  getUserData,
  setUserData,
  removeUserData
};
