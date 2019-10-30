import { useCallback } from "react";

export function useReducerLog(reducer: any) {
  const newReducer = (state: any, action: any) => {
    console.log(`reducer ========= ${action.type} ${action.value} ========`);

    const result = reducer(state, action);
    try {
      console.log("result" + JSON.stringify(result).slice(0, 10000));
    } catch (e) {
      console.error(e);
    }

    return result;
  };

  return useCallback(newReducer, []);
}
