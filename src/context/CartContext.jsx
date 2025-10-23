import React, { createContext, useContext, useReducer } from 'react';
import Swal from 'sweetalert2';

// Cart Context
const CartContext = createContext();

// Cart Reducer
const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      const existingItem = state.items.find(item => 
        item.id === action.payload.id && item.size === action.payload.size
      );
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id && item.size === action.payload.size
              ? { ...item, quantity: item.quantity + (action.payload.quantity || 1) }
              : item
          )
        };
      } else {
        return {
          ...state,
          items: [...state.items, { 
            ...action.payload, 
            quantity: action.payload.quantity || 1 
          }]
        };
      }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => 
          !(item.id === action.payload.id && item.size === action.payload.size)
        )
      };

    case 'UPDATE_QUANTITY':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id && item.size === action.payload.size
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    // ✅ ADD UPDATE_SIZE CASE
    case 'UPDATE_SIZE':
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id && item.size === action.payload.currentSize
            ? { ...item, size: action.payload.newSize }
            : item
        )
      };

    case 'CLEAR_CART':
      return {
        ...state,
        items: []
      };

    default:
      return state;
  }
};

// Initial State
const initialState = {
  items: []
};

// Cart Provider
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart = (product) => {
    const existingItem = state.items.find(item => 
      item.id === product.id && item.size === product.size
    );
    
    dispatch({ type: 'ADD_TO_CART', payload: product });
    
    // Show toast alert on the right
    if (existingItem) {
      Swal.fire({
        title: 'Added to Cart!',
        html: `
          <div class="flex items-center gap-3">
            <img src="${product.image}" alt="${product.name}" class="w-10 h-10 rounded-lg object-cover">
            <div class="text-left">
              <p class="font-semibold text-gray-800">${product.name}</p>
              <p class="text-sm text-gray-600">Size: ${product.size} • Quantity updated</p>
            </div>
          </div>
        `,
        icon: 'success',
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        customClass: {
          popup: 'rounded-xl shadow-xl'
        }
      });
    } else {
      Swal.fire({
        title: 'Added to Cart!',
        html: `
          <div class="flex items-center gap-3">
            <img src="${product.image}" alt="${product.name}" class="w-10 h-10 rounded-lg object-cover">
            <div class="text-left">
              <p class="font-semibold text-gray-800">${product.name}</p>
              <p class="text-sm text-gray-600">Size: ${product.size} • Added to cart</p>
            </div>
          </div>
        `,
        icon: 'success',
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        background: '#f8fafc',
        border: '1px solid #e2e8f0',
        customClass: {
          popup: 'rounded-xl shadow-xl'
        }
      });
    }
  };

  const removeFromCart = (productId, size = null) => {
    const product = state.items.find(item => 
      item.id === productId && item.size === size
    );
    
    dispatch({ type: 'REMOVE_FROM_CART', payload: { id: productId, size } });

    // Show removed alert
    if (product) {
      Swal.fire({
        title: 'Removed from Cart!',
        html: `
          <div class="flex items-center gap-3">
            <img src="${product.image}" alt="${product.name}" class="w-10 h-10 rounded-lg object-cover">
            <div class="text-left">
              <p class="font-semibold text-gray-800">${product.name}</p>
              <p class="text-sm text-gray-600">Size: ${product.size} • Removed from cart</p>
            </div>
          </div>
        `,
        icon: 'info',
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        background: '#fef2f2',
        border: '1px solid #fecaca',
        customClass: {
          popup: 'rounded-xl shadow-xl'
        }
      });
    }
  };

  const updateQuantity = (productId, quantity, size = null) => {
    if (quantity < 1) {
      removeFromCart(productId, size);
      return;
    }
    dispatch({ 
      type: 'UPDATE_QUANTITY', 
      payload: { id: productId, quantity, size } 
    });
  };

  // ✅ ADD UPDATE SIZE FUNCTION
  const updateSize = (productId, currentSize, newSize) => {
    dispatch({
      type: 'UPDATE_SIZE',
      payload: { id: productId, currentSize, newSize }
    });

    // Show size updated alert
    const product = state.items.find(item => 
      item.id === productId && item.size === currentSize
    );
    
    if (product) {
      Swal.fire({
        title: 'Size Updated!',
        html: `
          <div class="flex items-center gap-3">
            <img src="${product.image}" alt="${product.name}" class="w-10 h-10 rounded-lg object-cover">
            <div class="text-left">
              <p class="font-semibold text-gray-800">${product.name}</p>
              <p class="text-sm text-gray-600">Size changed from ${currentSize} to ${newSize}</p>
            </div>
          </div>
        `,
        icon: 'success',
        position: 'top-end',
        showConfirmButton: false,
        timer: 2000,
        toast: true,
        background: '#f0f9ff',
        border: '1px solid #bae6fd',
        customClass: {
          popup: 'rounded-xl shadow-xl'
        }
      });
    }
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getCartTotal = () => {
    return state.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  const getCartItemsCount = () => {
    return state.items.reduce((total, item) => total + item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cartItems: state.items,
      addToCart,
      removeFromCart,
      updateQuantity,
      updateSize, // ✅ ADD THIS FUNCTION
      clearCart,
      getCartTotal,
      getCartItemsCount
    }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom Hook
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};