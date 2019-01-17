export interface IAction<T> {
  type: string;
  payload?: T;
}
export interface IActionCreator<T> {
  (payload?: T): IAction<T>;
  type: string;
}

export interface IStore {
  [key: string]: any;
}

export type SelectorT = (store: IStore, ...rest: any[]) => any;

export interface ISelectors {
  [key: string]: SelectorT;
}

export interface IActions {
  [key: string]: (payload?: any) => IAction<any>;
}

export interface IModule {
  mountPoint: string;
  actions: IActions;
  reducer: IReducer<any>;
  selectors: ISelectors;
  saga?: () => any;
}

export type IReducer<T> = (store: T | undefined, action: IAction<any>) => T;
