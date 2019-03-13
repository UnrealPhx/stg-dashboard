import {useEffect, useReducer} from 'react';

type Action = {
  type: string,
  data?: any
};

type State = {
  isOpen: boolean,
  payload: any
};

const ACTIONS = {
  INIT: 'STG:WS:INIT',
  UPDATE: 'STG:WS:UPDATE',
  CLOSE: 'STG:WS:CLOSE'
};

const initialState: State = {
  isOpen: false,
  payload: null
};

const parseWsData = (data: string) => {
  let payload;

  try {
    payload = JSON.parse(data);
  } catch (err) {
    console.log(err);
    return;
  }

  return payload;
};

const reducer = (prevState: State, action: Action) => {
  switch (action.type) {
    case ACTIONS.INIT:
      return {...prevState, isOpen: true};

    case ACTIONS.UPDATE:
      return {...prevState, payload: parseWsData(action.data)};

    case ACTIONS.CLOSE:
      return initialState;

    default:
      return prevState;
  }
};

export default function useSTGWebSocket(url: string) {
  const [store, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const ws = new WebSocket(url);

    ws.onopen = () => dispatch({type: ACTIONS.INIT});
    ws.onmessage = ev => dispatch({type: ACTIONS.UPDATE, data: ev.data});

    return () => {
      dispatch({type: ACTIONS.CLOSE});
      ws.close();
    };
  }, [url]);

  return [store];
}
