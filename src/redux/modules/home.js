import { get } from "../../utils/request";
import url from "../../utils/url";
import { FETCH_DATA } from "../middleware/api";
import { schema } from "./entities/products";
import {combineReducers} from 'redux'

export const params = {
  PATH_LIKES: "likes",
  PATH_DISCOUNTS: "discounts",
  PAGE_SIZE_LIKES: 5,
  PAGE_SIZE_DISCOUNTS: 3,
};

//定義actiontype
const actionTypes = {
  //c猜你喜欢
  FETCH_LIKES_REQUEST: "FETCH_LIKES_REQUEST",
  FETCH_LIKES_SUCCESS: "FETCH_LIKES_SUCCESS",
  FETCH_LIKES_FAILURE: "FETCH_LIKES_FAILURE",
  //加载特惠商品
  FETCH_DISCOUNT_REQUEST: "FETCH_DISCOUNT_REQUEST",
  FETCH_DISCOUNT_SUCCESS: "FETCH_DISCOUNT_SUCCESS",
  FETCH_DISCOUNT_FAILURE: "FETCH_DISCOUNT_FAILURE",
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

const initialState = {
  likes: {
    isFetching: false,
    pageCount: 0,
    ids: [],
  },
  discounts: {
    isFetching: false,
    ids: [],
  },
};

export const actions = {
  loadLikes: () => {
    return (dispatch, getState) => {
      const { pageCount } = getState().home.likes;
      const rowIndex = pageCount * params.PAGE_SIZE_LIKES;
      const endpoint = url.getProduceList(
        params.PATH_LIKES,
        rowIndex,
        params.PAGE_SIZE_LIKES
      );
      return dispatch(fetchLikes(endpoint));
    };
  },
  loadDiscounts: () => {
    return (dispatch, getState) => {
      const {ids} = getState().home.discounts;//redux 缓存
      if(ids.length >0){
        return null;
      }
      const endpoint = url.getProduceList(
        params.PATH_DISCOUNTS,
        0,
        params.PAGE_SIZE_DISCOUNTS
      );
      return dispatch(fetchDiscounts(endpoint));
    };
  },
};

const fetchLikes = (endpoint) => ({
  [FETCH_DATA]: {
    types: [
      actionTypes.FETCH_LIKES_FAILURE,
      actionTypes.FETCH_LIKES_REQUEST,
      actionTypes.FETCH_LIKES_SUCCESS,
    ],
    endpoint,
    schema,
  },
});

const fetchDiscounts = (endpoint) => ({
  [FETCH_DATA]: {
    types: [
      actionTypes.FETCH_DISCOUNT_FAILURE,
      actionTypes.FETCH_DISCOUNT_REQUEST,
      actionTypes.FETCH_DISCOUNT_SUCCESS,
    ],
    endpoint,
    schema,
  },
});

const likes = (state = initialState.likes, action) => {
  switch (action.type) {
    case actionTypes.FETCH_LIKES_REQUEST:
      return { ...state, isFetching: true };
    case actionTypes.FETCH_LIKES_SUCCESS:
      return {
        ...state,
        isFetching: false,
        pageCount: state.pageCount + 1,
        //ids: state.ids.concat(action.response.ids)
      };
    case actionTypes.FETCH_LIKES_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

const discounts = (state = initialState.discounts, action) => {
  switch (action.type) {
    case actionTypes.FETCH_DISCOUNT_REQUEST:
      return { ...state, isFetching: true };
    case actionTypes.FETCH_DISCOUNT_SUCCESS:
      return {
        ...state,
        isFetching: false,
        //ids: state.ids.concat(action.response.ids),
      };
    case actionTypes.FETCH_DISCOUNT_FAILURE:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
};

const reducer = combineReducers({
  discounts,
  likes
})
export default reducer;

//selector
export const getLikes = state=>{//state 是存储到store里面的那个state
  return state.home.likes.ids.map( id=>{
    return state.entities.products[id]
  })
}

export const getDiscounts = state=>{
  return state.home.discounts.ids.map( id=>{
    return state.entities.products[id]
  })
}

export const getPageCountOfLikes = state=>{
  return state.home.likes.pageCount
}