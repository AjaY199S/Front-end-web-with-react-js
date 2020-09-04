import * as ActionTypes from "./ActionType";

export const dishReducer = (
  state = { isLoading: true, errMess: null, dishes: [] },
  action
) => {
  switch (action.type) {
    case ActionTypes.DISH_ADD:
      return {
        ...state,
        isLoading: false,
        errMess: null,
        dishes: action.payload,
      };
    case ActionTypes.DISH_LODDING:
      return {
        ...state,
        isLoading: true,
        errMess: null,
        dishes: [],
      };
    case ActionTypes.DISH_FAILD:
      return {
        ...state,
        isLoading: false,
        errMess: action.payload,
      };
    default:
      return state;
  }
};
