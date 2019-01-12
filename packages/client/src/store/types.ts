
export interface ActionT<T> {
  type: string;
  payload: T;
}
export interface ActionCreatorT<T> {
  (payload: T): ActionT<T>;
  type: string;
}

export interface StoreT {
  [key: string]: any;
}

export interface SelectorT {
  (store: StoreT, ...rest: any[]): any;
}
export interface SelectorsT {
  [key: string]: SelectorT;
}

export interface ModuleT {
  mountPoint: string;
  actions: { [key: string]: (payload: any) => any };
  reducer: ReducerT<any>;
  selectors: SelectorsT;
  saga?: Function
}

export interface ReducerT<T> {
  (store: T | undefined, action: ActionT<any>): T;
}

export interface AppStoreT{
    current: any;
}
