import { createContext, useContext, useState, useMemo } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);

  
  const addToCart = (product, options) => {
    setCart((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === product.id &&
          item.color === options.color &&
          item.size === options.size
      );

      if (existing) {
        return prev.map((item) =>
          item === existing
            ? { ...item, qty: item.qty + options.qty }
            : item
        );
      }

      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          price: product.price,
          mrp: product.mrp,
          image: product.variants[options.color].images[0],
          color: options.color,
          size: options.size,
          qty: options.qty,
        },
      ];
    });
  };

  // QTY CONTROLS
  const increaseQty = (index) => {
    setCart((prev) =>
      prev.map((item, i) =>
        i === index ? { ...item, qty: item.qty + 1 } : item
      )
    );
  };

  const decreaseQty = (index) => {
    setCart((prev) =>
      prev.map((item, i) =>
        i === index && item.qty > 1
          ? { ...item, qty: item.qty - 1 }
          : item
      )
    );
  };

  // REMOVE
  const removeItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  // TOTALS
  const totals = useMemo(() => {
    const subtotal = cart.reduce(
      (sum, item) => sum + item.price * item.qty,
      0
    );
    const discount = cart.reduce(
      (sum, item) => sum + (item.mrp - item.price) * item.qty,
      0
    );

    return {
      subtotal,
      discount,
      total: subtotal,
    };
  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        totals,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
