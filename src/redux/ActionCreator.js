import * as ActionType from "./ActionType";

export const addComment = (dishId, rating, author, comment) => {
  return {
    type: ActionType.ADD_COMMENT,
    payload: {
      dishId: dishId,
      rating: rating,
      author: author,
      comment: comment,
    },
  };
};
