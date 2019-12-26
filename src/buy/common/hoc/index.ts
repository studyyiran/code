export function reducerLog(reducer: any) {
  const newReducer = (state: any, action: any) => {
    console.warn(`《${action.type} ${action.value}》`);

    const result = reducer(state, action);
    try {
      // console.warn("~~result~~" + JSON.stringify(result).slice(0, 100));
    } catch (e) {
      console.error(e);
    }

    return result;
  };
  return newReducer;
}
