import { createStore, combineReducers } from "redux";

import { dishReducer } from "./dish";
import { leaderReducer } from "./leader";
import { promotionReducer } from "./promotion";
import { commentReducer } from "./comment";

export const ConfiguerStore = () => {
  const store = createStore(
    combineReducers({
      dishes: dishReducer,
      leaders: leaderReducer,
      promotions: promotionReducer,
      comments: commentReducer,
    })
  );

  return store;
};
