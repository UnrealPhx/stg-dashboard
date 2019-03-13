// Based off of https://gist.github.com/aweary/be8338a211e72b9f1563d75091005c0e

import {useReducer, useCallback} from 'react';
import {produce} from 'immer';

type MutableReducer<D, A, S> = (draft: D, action: A, prevState: S) => S;
type MutableReducerState<R extends MutableReducer<any, any, any>> = R extends MutableReducer<any, any, infer S> ? S : never;
// TODO: Figure out overloads and how to convert to React types.
//type MutableReducerAction<R extends MutableReducer<any, any, any>> = R extends MutableReducer<any, infer A, any> ? A : never;

export default function useMutableReducer<R extends MutableReducer<any, any, any>, I>(
  reducer: R,
  initialState: MutableReducerState<R>,
  initialAction?: undefined
) {
  const mutableReducer = useCallback(
    (state, action) => produce(draft => reducer(draft, action, state)),
    [reducer]
  );
  return useReducer(mutableReducer, initialState, initialAction);
}
