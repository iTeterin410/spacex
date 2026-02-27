import { useEffect, useReducer } from 'react';
import type { Launch } from '../types/launch';


type StateType = {
  launches: Launch[];
  loading: boolean;
  error: string | null;
};

type ActionType =
  | { type: 'FETCH_START' }
  | { type: 'FETCH_SUCCESS'; payload: Launch[] }
  | { type: 'FETCH_ERROR'; payload: string };


const initialState: StateType = {
  launches: [],
  loading: false,
  error: null
};


const reducer = (state: StateType, action: ActionType): StateType => {
  switch (action.type) {
    case 'FETCH_START':
      return {
        ...state,
        loading: true,
        error: null
      };

    case 'FETCH_SUCCESS':
      return {
        ...state,
        loading: false,
        launches: action.payload
      };

    case 'FETCH_ERROR':
      return {
        ...state,
        loading: false,
        error: action.payload
      };

    default:
      return state;
  }
};


export default function useLaunches() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const fetchLaunches = async () => {
      dispatch({ type: 'FETCH_START' });

      try {
        const response = await fetch('https://api.spacexdata.com/v3/launches?launch_year=2020');
        
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Launch[] = await response.json();
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        
      } catch (error) {
        dispatch({ 
          type: 'FETCH_ERROR', 
          payload: error instanceof Error ? error.message : 'Unknown error' 
        });
      }
    };

    fetchLaunches();
  }, []);

  return state;
}