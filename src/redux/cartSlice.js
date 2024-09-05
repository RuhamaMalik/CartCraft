import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

const EXPIRE_TIME = 2 * 60 * 1000; // 2 minutes in milliseconds

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    loadCartFromStorage: (state) => {
      const storedCart = localStorage.getItem('cart');
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        const currentTime = Date.now();
        // Filter out expired items based on the timestamp
        const validItems = parsedCart?.filter(item => currentTime - item.timestamp < EXPIRE_TIME);
        return validItems || [];
      }
      return state;
    },
    addItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.find(item => item.id === newItem.id);
      
      if (!existingItem) {
        state.push({
          ...newItem,
          quantity: 1,
          timestamp: Date.now(), // Add timestamp when adding new item
        });
      } else {
        existingItem.quantity++;
        existingItem.timestamp = Date.now(); // Update timestamp when item is modified
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeItem: (state, action) => {
      const updatedState = state.filter(item => item.id !== action.payload.id);
      localStorage.setItem('cart', JSON.stringify(updatedState));
      return updatedState;
    },
    increaseQuantity: (state, action) => {
      const item = state.find(item => item.id === action.payload.id);
      if (item) {
        item.quantity += 1;
        item.timestamp = Date.now(); // Update timestamp when quantity changes
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    decreaseQuantity: (state, action) => {
      const item = state.find(item => item.id === action.payload.id);
      if (item) {
        if (item.quantity > 1) {
          item.quantity -= 1;
          item.timestamp = Date.now(); 
        } else {
          const updatedState = state.filter(item => item.id !== action.payload.id);
          localStorage.setItem('cart', JSON.stringify(updatedState));
          return updatedState;
        }
      }
      localStorage.setItem('cart', JSON.stringify(state));
    },
    removeExpiredItems: (state) => {
      const now = Date.now();
      const validItems = state.filter(item => now - item.timestamp < EXPIRE_TIME);
      localStorage.setItem('cart', JSON.stringify(validItems));
      return validItems;
    },
  },
});

export const { loadCartFromStorage, addItem, removeItem, increaseQuantity, decreaseQuantity, removeExpiredItems } = cartSlice.actions;
export default cartSlice.reducer;
