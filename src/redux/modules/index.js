import {combineReducers} from "redux"
import app from "./app"
import detail from "./detail"
import entities from './entities'
import home from './home'

//合并領域狀態和ui狀態為 rootReducer
const rootReducer = combineReducers({
    entities,
    app,
    detail,
    home
})
export default rootReducer;