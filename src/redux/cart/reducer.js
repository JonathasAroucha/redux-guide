import CartActionTypes from "./action-types";

const initialState = {
  products: [],
  productsTotalPrice: 0,
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case CartActionTypes.ADD_PRODUCT:
      // verificar se o produto já esta no carrinho
      const productIsAlreadyInCart = state.products.some(
        (product) => product.id === action.payload.id
      );
      // se ele estiver, aumentar a sua quantidade em 1
      if (productIsAlreadyInCart) {
        return {
          ...state,
          products: state.products.map((product) =>
            product.id === action.payload.id
              ? { ...product, quantity: product.quantity + 1 }
              : product
          ),
        };
      }
      // se ele não estiver, adicioná-lo
      return {
        ...state,
        products: [...state.products, { ...action.payload, quantity: 1 }],
      };

      case CartActionTypes.REMOVE_PRODUCT:
        return {
          ...state,
          products: state.products.filter(product => product.id !== action.payload)
        }
      case CartActionTypes.INCREMENT_PRODUCT:
        return {
          ...state,
          products: state.products.map((product) =>
          product.id === action.payload
            ? { ...product, quantity: product.quantity + 1 }
            : product
          ),
        }
      case CartActionTypes.DECREMENT_PRODUCT:
        return {
          ...state,
          products: state.products
            .map((product) =>
              product.id === action.payload
                ? { ...product, quantity: product.quantity - 1 }
                : product
          )
          .filter((product) => product.quantity > 0),
        }  
        // case CartActionTypes.INCREMENT_PRODUCT: {
        //   const updatedProducts = state.products.map(product => {
        //     if (product.id === action.payload) {
        //       return {
        //         ...product,
        //         quantity: product.quantity + 1
        //       };
        //     }
        //     return product;
        //   });
        
        //   return {
        //     ...state,
        //     products: updatedProducts
        //   };
        // }
        
        // case CartActionTypes.DECREMENT_PRODUCT: {
        //   const updatedProducts = state.products.reduce((acc, product) => {
        //     if (product.id === action.payload) {
        //       if (product.quantity > 1) {
        //         acc.push({
        //           ...product,
        //           quantity: product.quantity - 1
        //         });
        //       }
        //       // Caso contrário, o produto será removido do carrinho
        //     } else {
        //       acc.push(product);
        //     }
        //     return acc;
        //   }, []);
        
        //   return {
        //     ...state,
        //     products: updatedProducts
        //   };
        // }
        
    default:
      return state;
  }
};

export default cartReducer;
