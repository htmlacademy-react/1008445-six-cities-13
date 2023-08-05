import { AppRoute } from '../const.ts';

export type TLayoutClassOptions = Record<AppRoute, {
  pageClass:string;
  mainClass:string;
  isNavVisible: boolean;
}>

