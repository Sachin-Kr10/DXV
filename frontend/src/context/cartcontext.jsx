import { createContext, useContext, useState, useMemo,useEffect } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
  const saved = localStorage.getItem("cart");
  return saved ? JSON.parse(saved) : [];
});

useEffect(() => {
  localStorage.setItem("cart", JSON.stringify(cart));
}, [cart]);


  
  const addToCart = (product, options) => {
  const variant = product.variants.find(
    (v) => v.colorName === options.color
  );

  if (!variant) return;

  const image = variant.images[0];

  setCart((prev) => {
    const existing = prev.find(
      (item) =>
        item.productId === product._id &&
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
        productId: product._id,
        slug: product.slug,

        brand: product.brand,
        title: product.title,

        price: product.price,
        mrp: product.mrp,

        image,

        color: options.color,
        colorHex: variant.colorHex,

        size: options.size,
        qty: options.qty,

        maxStock:
          variant.sizes.find((s) => s.size === options.size)
            ?.stock || 0,
      },
    ];
  });
};

  const increaseQty = (index) => {
  setCart((prev) =>
    prev.map((item, i) =>
      i === index && item.qty < item.maxStock
        ? { ...item, qty: item.qty + 1 }
        : item
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

  const removeItem = (index) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const totals = useMemo(() => {
  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const totalMrp = cart.reduce(
    (sum, item) => sum + item.mrp * item.qty,
    0
  );

  const discount = totalMrp - subtotal;

  return {
    subtotal,
    totalMrp,
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
