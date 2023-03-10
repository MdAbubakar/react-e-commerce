const cartReducer = (state, action) => {
  if (action.type === "ADD_TO_CART") {
    let { id, color, amount, product } = action.payload;

    // tackle the existing product
    let existingProduct = state.cart.find(
      (curItem) => curItem.id === id + color
    );

    if (existingProduct) {
      let updatedProduct = state.cart.map((curItem) => {
        if (curItem.id === id + color) {
          let newAmount = curItem.amount + amount;

          if (newAmount >= curItem.max) {
            newAmount = curItem.max;
          }

          return {
            ...curItem,
            amount: newAmount,
          };
        } else {
          return curItem;
        }
      });
      return {
        ...state,
        cart: updatedProduct,
      };
    } else {
      let cartProduct = {
        amount,
        id: id + color,
        name: product.name,
        color,
        image: product.image[0].url,
        price: product.price,
        max: product.stock,
      };

      return {
        ...state,
        cart: [...state.cart, cartProduct],
      };
    }
  }

  // To set the increment and decrement
  if (action.type === "SET_DECREMENT") {
    let updatedProduct = state.cart.map((curItem) => {
      if (curItem.id === action.payload) {
        let decAmount = curItem.amount - 1;

        if (decAmount <= 1) {
          decAmount = 1;
        }

        return {
          ...curItem,
          amount: decAmount,
        };
      } else {
        return curItem;
      }
    });

    return {
      ...state,
      cart: updatedProduct,
    };
  }
  if (action.type === "SET_INCREMENT") {
    let updatedProduct = state.cart.map((curItem) => {
      if (curItem.id === action.payload) {
        let incAmount = curItem.amount + 1;

        if (incAmount >= curItem.max) {
          incAmount = curItem.max;
        }

        return {
          ...curItem,
          amount: incAmount,
        };
      } else {
        return curItem;
      }
    });

    return {
      ...state,
      cart: updatedProduct,
    };
  }
  if (action.type === "REMOVE_ITEM") {
    let updatedCart = state.cart.filter(
      (curItem) => curItem.id !== action.payload
    );
    return {
      ...state,
      cart: updatedCart,
    };
  }

  if (action.type === "CLEAR_CART") {
    return {
      ...state,
      cart: [],
    };
  }

  if (action.type === "CART_TOTAL_ITEM") {
    let updatedCartVal = state.cart.reduce((initialVal, curItem) => {
      let { amount } = curItem;

      initialVal = initialVal + amount;
      return initialVal;
    }, 0);

    return {
      ...state,
      total_item: updatedCartVal,
    };
  }

  if (action.type === "CART_TOTAL_PRICE") {
    let totalPrice = state.cart.reduce((initialVal, curVal) => {
      let { price, amount } = curVal;

      initialVal = initialVal + price * amount;
      return initialVal;
    }, 0);

    return {
      ...state,
      total_price: totalPrice,
    };
  }
  return state;
};

export default cartReducer;
