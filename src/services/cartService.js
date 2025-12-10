import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const getCartFromFirestore = async (uid) => {
  const docRef = doc(db, "cart", uid);
  const snap = await getDoc(docRef);

  if (snap.exists()) return snap.data().books || [];
  return [];
};

export const saveCartToFirestore = async (uid, books) => {
  const docRef = doc(db, "cart", uid);
  await setDoc(docRef, { books });
};

export const getLocalCart = () => {
  const saved = JSON.parse(localStorage.getItem("cart")) || [];
  return saved.map((book) => ({ ...book, quantity: book.quantity || 1 }));
};

export const saveLocalCart = (books) => {
  localStorage.setItem("cart", JSON.stringify(books));
};

export const clearLocalCart = () => {
  localStorage.removeItem("cart");
};

export const mergeCarts = (serverCart, localCart) => {
  const merged = new Map();

  serverCart.forEach((b) => merged.set(b.title, b));
  localCart.forEach((b) => {
    const existing = merged.get(b.title);
    merged.set(b.title, {
      ...b,
      quantity: existing ? existing.quantity : b.quantity || 1,
    });
  });

  return [...merged.values()];
};

export const loadCart = async (user) => {
  if (user) {
    const serverCart = await getCartFromFirestore(user.uid);
    const localCart = getLocalCart();

    const merged = mergeCarts(serverCart, localCart);

    if (localCart.length > 0) {
      await saveCartToFirestore(user.uid, merged);
      clearLocalCart();
      return { cart: merged, mergedWithLocal: true };
    }

    return { cart: serverCart, mergedWithLocal: false };
  }

  return { cart: getLocalCart(), mergedWithLocal: false };
};

export const saveCart = async (user, cart) => {
  if (user) return saveCartToFirestore(user.uid, cart);
  return saveLocalCart(cart);
};

export const removeFromCart = (cart, title) =>
  cart.filter((b) => b.title !== title);

export const clearCartArray = () => [];

export const changeQuantity = (cart, title, delta) =>
  cart.map((b) =>
    b.title === title
      ? { ...b, quantity: Math.max(1, b.quantity + delta) }
      : b
  );

export const toggleSelect = (selected, title) =>
  selected.includes(title)
    ? selected.filter((t) => t !== title)
    : [...selected, title];

export const calculateTotal = (cart, selected) =>
  cart
    .filter((b) => selected.includes(b.title))
    .reduce((sum, b) => sum + b.price * b.quantity, 0);