const initialState={
    companyList:[]
}
const companyReducer=(state=initialState,action)=>{
    switch(action.type){
        case "GET_COMPANY_DATA":{
        return {...state, 
            companyList:[...state.companyList,action.data]}
    
        }              
        default :
        return state
    }
}
export default companyReducer