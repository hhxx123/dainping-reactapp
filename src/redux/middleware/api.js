import {get} from "../../utils/request"
//对get请求进行中间件的封装
//有這個屬性的都需要經過 中間件處理
export const FETCH_DATA ="FETCH_DATA";
export default store => next => action =>{
    const callAPI = action[FETCH_DATA];
    if(callAPI === 'undefined') {
        return next(action)
    }

    const {endpoint,schema,types} = callAPI;
    if(typeof endpoint !== 'string') {
        throw new Error("endpoint 必需為字符串類型的url")
    }
    if(!schema){
        throw new Error("必須指定領域石梯的schema")
    }
    if(!Array.isArray(types) && types.length !==3){
        throw new Error("需要指定一個包含個3個action type的數組")
    }
    if(!types.ervery(type =>typeof type !== 'string')){
        throw new Error("action type必須為字符串類型")
    }

    const actionWith = data =>{
        const finalAction = {...action,...data}
        delete finalAction[FETCH_DATA]
        return finalAction
    }

    const{requestType,requestSuccess,requestFailure} = types
    
    next(actionWith({type:requestType}))
    return fetchData(endpoint,schema).then(
        response => next(actionWith({
            type:requestSuccess,
            response
        })),
        error => next(actionWith({
            type:requestFailure,
            error:error.message ||'失敗'
            
        }))
    )
}
//执行网络请求
const fetchData = (endpoint,schema) =>{
    return get(endpoint).then(data =>{
        return normallizeData(data,schema)
    })
}
//根据schemA 对数据进行扁平化处理
const normallizeData = (data,schema) =>{
    const {id,name} = schema;
    let kvObj  ={};
    let ids = [];
    if(Array.isArray(data)){
        data.forEach(item =>{
            kvObj[item[id]] = item;
            ids.push(item[id]);
        })
    }else{
        kvObj[data[id]] = data;
        ids.push(data[id])
    }
    return{
        [name] :kvObj,
        ids
    }

}