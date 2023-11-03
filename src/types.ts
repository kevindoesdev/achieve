import { NavigationProp as NativeNavigationProp } from '@react-navigation/native';

export enum Screens {
  Playground = 'PLAYGROUND',
  TodoDetails = 'TODO_DETAILS',
  TodoList = 'TODO_LIST',
}

export interface ScreenOptions {
  name: Screens;
  subTitle?: string;
}

export interface ScreenProps<T> {
  navigation: NativeNavigationProp<any, any>;
  route: RouteProps<T>;
}

export interface RouteProps<T> {
  key: string;
  name: string;
  params: T;
}

export interface Screen extends ScreenOptions {
  screen: React.JSXElementConstructor<any>;
}

export type Id = string;

export interface Idable {
  id: Id;
}

export interface Todo extends Idable {
  label: string;
  tags: Id[];
  notes: string;
}

export interface Tag extends Idable {
  label: string;
}

export interface IndexOf<T> {
  [key: string]: T;
}

export interface RGBA {
  r: number;
  g: number;
  b: number;
  a: number;
}

export type RGBAPropertyModifier = number | ((original: number) => number);

export interface RGBAModifier {
  r?: RGBAPropertyModifier;
  g?: RGBAPropertyModifier;
  b?: RGBAPropertyModifier;
  a?: RGBAPropertyModifier;
}

export enum JsonType {
  Object = 'object',
  Array = 'array',
  String = 'string',
  Number = 'number',
  Boolean = 'boolean',
  Null = 'null',
  Undefined = 'undefined',
}

export interface CompareOptions {
  emptyStringEqualsUndefined?: boolean;
}
