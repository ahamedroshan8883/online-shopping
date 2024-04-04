const initialState = {
    IsLoading:false,
    products:[],
    error:''
}
export const productReducer = (state = initialState,action)=>{

    switch(action.type){
        case 'FETCH_PRODUCT_REQUEST':
            return {
                ...state,
                Isloading : true
                 }
        case 'FETCH_PRODUCT_SUCCESS':
            return {
                Isloading : false,
                products : action.payload
                 }
        case 'FETCH_PRODUCT_FAILURE':
            return{
                Isloading : false,
                products:[],
                error : action.payload
            }
        default :
            return state; 
    }
}