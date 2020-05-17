import { get } from "../../utils/request";
import url from "../../utils/url";

//定義actiontype
const actionTypes = {
  FETCH_LIKES_REQUEST: "FETCH_LIKES_REQUEST",
  FETCH_LIKES_SUCCESS: "FETCH_LIKES_SUCCESS",
  FETCH_LIKES_FAILURE: "FETCH_LIKES_FAILURE",
};

const fetchLikeRequest = () => ({
  type: actionTypes.FETCH_LIKES_REQUEST,
});

const fetchLikeSuccess = (data) => ({
  type: actionTypes.FETCH_LIKES_SUCCESS,
  data,
});

const fetchLikeFailure = (error) => ({
  type: actionTypes.FETCH_LIKES_FAILURE,
  error,
});

export const actions = {
  loadLikes: () => {
    return (dispatch, getState) => {
      dispatch(fetchLikeRequest());
      return get(url.getProduceList(0, 10)).then(
        (data) => {
          dispatch(fetchLikeSuccess(data));
         // dispatch(action);
        },
        (error) => {
          dispatch(fetchLikeFailure(error));
        }
      );
    };
  },
};
const reducer = (state = {}, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LIKES_REQUEST:
        //todo
    case actionTypes.FETCH_LIKES_SUCCESS:
    case actionTypes.FETCH_LIKES_FAILURE:
    default:
      return state;
  }
  return state;
};
export default reducer;
