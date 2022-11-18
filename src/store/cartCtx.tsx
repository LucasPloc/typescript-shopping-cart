import { createContext, useContext, ReactNode, useState } from 'react';
import { Shoppingcart } from '../components';
import { useLocalStorage } from '../hooks/useLocalStorage';

type CartContext = {
  openCart: () => void;
  closeCart: () => void;
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  cartQuantity: number;
  cartItems: CartItem[];
  isOpen: boolean;
};
type CartItem = {
  id: number;
  quantity: number;
};

const CartContext = createContext({} as CartContext);

export function useShoppingCart() {
  return useContext(CartContext);
}

type ShoppingCartProviderProps = {
  children: ReactNode;
};
export function ShoppingCartProvider({ children }: ShoppingCartProviderProps) {
  const [cartItems, setCartItems] = useLocalStorage<CartItem[]>(
    'shopping-cart',
    []
  );
  const [isOpen, setIsOpen] = useState(false);
  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity,
    0
  );

  function openCart() {
    setIsOpen(true);
  }
  function closeCart() {
    setIsOpen(false);
  }

  function getItemQuantity(id: number) {
    return cartItems.find((item) => item.id === id)?.quantity || 0;
  }
  function increaseCartQuantity(id: number) {
    const item = cartItems.find((item) => item.id === id);
    if (!item) {
      setCartItems((cartItems) => [...cartItems, { id, quantity: 1 }]);
    } else {
      setCartItems((cartItems) =>
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  }
  function decreaseCartQuantity(id: number) {
    const item = cartItems.find((item) => item.id === id);
    if (item?.quantity === 1) {
      setCartItems(cartItems.filter((item) => item.id !== id));
    } else {
      setCartItems((cartItems) =>
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  }
  function removeFromCart(id: number) {
    setCartItems((cartItems) => cartItems.filter((item) => item.id !== id));
  }
  return (
    <CartContext.Provider
      value={{
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        openCart,
        closeCart,
        cartItems,
        cartQuantity,
        isOpen,
      }}
    >
      {children}
      <Shoppingcart />
    </CartContext.Provider>
  );
}
