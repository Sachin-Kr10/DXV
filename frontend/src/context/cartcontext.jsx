import { createContext, useContext, useEffect, useState, useMemo } from "react";
import api from "../api/api";
import { useAuth } from "./authcontext";
import { authStore } from "../api/authstore";

const CartContext = createContext();

export function CartProvider({ children }) {

  const { user, loading: authLoading } = useAuth();

  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ================= LOAD CART ================= */

  const loadCart = async () => {

    if (!authStore.getAccessToken()) return;

    try {
      const res = await api.get("/cart");
      setCart(res.data);

    } catch (err) {
      setCart(null);

    } finally {
      setLoading(false);
    }
  };

  /* ================= WAIT FOR AUTH ================= */

  useEffect(() => {

    if (!authLoading && user) {
      loadCart();
    }

    if (!authLoading && !user) {
      setCart(null);
      setLoading(false);
    }

  }, [authLoading, user]);

  /* ================= ADD ================= */

  const addToCart = async (product, options) => {

    if (!options?.color || !options?.size || !options?.qty) return;

    const res = await api.post("/cart/add", {
      productId: product._id,
      color: options.color,
      size: options.size,
      qty: options.qty
    });

    setCart(res.data);
  };

  /* ================= QTY ================= */

  const increaseQty = async item => {

    if (item.qty >= item.maxStock) return;

    const res = await api.patch("/cart/qty", {
      itemId: item._id,
      qty: item.qty + 1
    });

    setCart(res.data);
  };

  const decreaseQty = async item => {

    if (item.qty <= 1) return;

    const res = await api.patch("/cart/qty", {
      itemId: item._id,
      qty: item.qty - 1
    });

    setCart(res.data);
  };

  /* ================= REMOVE ================= */

  const removeItem = async id => {

    const res = await api.delete(`/cart/item/${id}`);
    setCart(res.data);
  };

  /* ================= CLEAR ================= */

  const clearCart = async () => {

    await api.delete("/cart/clear");

    setCart({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      totalMrp: 0
    });
  };

  /* ================= TOTALS ================= */

  const totals = useMemo(() => {

    if (!cart) {
      return {
        subtotal: 0,
        totalMrp: 0,
        discount: 0,
        total: 0,
        totalItems: 0
      };
    }

    return {
      subtotal: cart.totalPrice,
      totalMrp: cart.totalMrp,
      discount: cart.totalMrp - cart.totalPrice,
      total: cart.totalPrice,
      totalItems: cart.totalItems
    };

  }, [cart]);

  return (
    <CartContext.Provider
      value={{
        cart,
        cartItems: cart?.items || [],
        loading,
        addToCart,
        increaseQty,
        decreaseQty,
        removeItem,
        clearCart,
        totals,
        reloadCart: loadCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => useContext(CartContext);
