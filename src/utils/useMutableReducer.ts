// Based off of https://gist.github.com/aweary/be8338a211e72b9f1563d75091005c0e

import {useReducer, useCallback} from 'react';
import {produce} from 'immer';

export function useMutableReducer(reducer: any, initialState: any, initialAction: any) {
  const mutableReducer = useCallback(
    (state, action) => produce(draft => reducer(draft, action, state)),
    [reducer]
  );
  return useReducer(mutableReducer, initialState, initialAction);
}
