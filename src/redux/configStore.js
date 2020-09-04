import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import logger from "redux-logger";
import { createForms } from "react-redux-form";

import { dishReducer } from "./dish";
import { leaderReducer } from "./leader";
import { promotionReducer } from "./promotion";
import { commentReducer } from "./comment";
import { InitialFeedback } from "./form";

export const ConfiguerStore = () => {
  const store = createStore(
    combineReducers({
      dishes: dishReducer,
      leaders: leaderReducer,
      promotions: promotionReducer,
      comments: commentReducer,
      ...createForms({
        feedback: InitialFeedback,
      }),
    }),
    applyMiddleware(thunk, logger)
  );
  return store;
};
