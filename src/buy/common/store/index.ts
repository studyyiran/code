import { createStore } from "redux";

function reducer(state: any, action: any) {
  const { type, value } = action;
  switch (type) {
    case "reduxSetToken":
      return {
        ...state,
        token: value
      };
      break;
    default:
      return { ...state };
  }
}

const initState = {};

const reduxStore = createStore(reducer, initState);
export const globalStore = reduxStore;
// reduxStore.addEventListener(() => {});
