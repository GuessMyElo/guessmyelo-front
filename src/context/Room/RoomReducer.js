export const initialState = {
  loading : false,
  step : ""
};

export const RoomReducer = (state, action) => {
  switch (action.type) {
    case "UPDATE_STEP" :
      return {
        ...state,
        step : action.step
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
