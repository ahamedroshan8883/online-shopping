export const fecthProductRequest = ()=>{
    return {
        type:'FETCH_PRODUCT_REQUEST'
    };
}

export const fecthProductSuccess = (products)=>{
    return{
        type:'FETCH_PRODUCT_SUCCESS',
        payload:products,
    }
}

export const fecthProductFailure = (error)=>{
    return{
        type:'FETCH_PRODUCT_FAILURE',
        payload:error,
    }
}

export const fetchProduct = ()=>{
    return (dispatch)=>{
        dispatch(fecthProductRequest())
        fetch('https://fakestoreapi.com/products')
        .then(response=>response.json())
        .then(products=>dispatch(fecthProductSuccess(products)))
        .catch(error=>dispatch(fecthProductFailure(error.message)))
    }
}