import * as ActionType from "./ActionType";
import { DISHES } from "../shared/dishes";

export const addComment = (dishId, rating, author, comment) => ({
  type: ActionType.ADD_COMMENT,
  payload: {
    dishId: dishId,
    rating: rating,
    author: author,
    comment: comment,
  },
});

export const fetchDishes = () => (dispatch) => {
  dispatch(dishesLoading(true));
  setTimeout(() => {
    dispatch(addDish(DISHES));
  }, 2000);
};

export const dishesLoading = () => ({
  type: ActionType.DISH_LODDING,
});

export const dishFaild = (errMess) => ({
  type: ActionType.DISH_FAILD,
  payload: errMess,
});
export const addDish = (dishes) => ({
  type: ActionType.DISH_ADD,
  payload: dishes,
});
