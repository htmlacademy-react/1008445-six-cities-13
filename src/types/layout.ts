import { AppRoute } from '../const.ts';

export type LayoutClassOptions = Record<AppRoute, {
  pageClass:string;
  mainClass:string;
  isNavVisible: boolean;
}>
