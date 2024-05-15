export const fetchProductRequest = ()=>{
    return {
        type:'FETCH_PRODUCT_REQUEST'
    };
}

export const fetchProductSuccess = (products)=>{
    return{
        type:'FETCH_PRODUCT_SUCCESS',
        payload:products
    }
}

export const fetchProductFailure = (error)=>{
    return{
        type:'FETCH_PRODUCT_FAILURE',
        payload:error,
    }
}

export const fetchProduct = () => {
    return (dispatch) => {
      dispatch(fetchProductRequest());
      fetch('https://fakestoreapi.com/products')
        .then((response) => response.json())
        .then((products) => dispatch(fetchProductSuccess(products)))
        .catch((error) => dispatch(fetchProductFailure(error)));
    };
  };