import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],   // Productos en el carrito
  total: 0     // Precio total
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      state.items.push(product);
      state.total += product.price;
    },
    removeFromCart: (state, action) => {
      const productId = action.payload;
      const productToRemove = state.items.find(item => item.id === productId);
      if (productToRemove) {
        state.items = state.items.filter(item => item.id !== productId);
        state.total -= productToRemove.price;
      }
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
    }
  }
});

export const { addToCart, removeFromCart, clearCart } = cartSlice.actions;
export default cartSlice.reducer;

