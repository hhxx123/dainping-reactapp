import {combineReducers} from 'redux';
import orders from "./orders";
import products from "./products"
import comments from "./comments"
import shops from "./shops"
//合并領域狀態
const rootReducer = combineReducers({
    orders,
    products,
    shops,
    comments 
})
export default rootReducer;
