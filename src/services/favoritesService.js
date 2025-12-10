import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

export const getFavoritesFromFirestore = async (uid) => {
  const docRef = doc(db, 'favorites', uid);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data().books || [];
  }
  return [];
};

export const saveFavoritesToFirestore = async (uid, books) => {
  const docRef = doc(db, 'favorites', uid);
  await setDoc(docRef, { books });
};

export const getLocalFavorites = () => {
  return JSON.parse(localStorage.getItem('favorites')) || [];
};

export const saveLocalFavorites = (books) => {
  localStorage.setItem('favorites', JSON.stringify(books));
};

export const clearLocalFavorites = () => {
  localStorage.removeItem('favorites');
};

export const mergeFavorites = (serverFavorites, localFavorites) => {
  const mergedMap = new Map();

  serverFavorites.forEach(book => mergedMap.set(book.title, book));
  localFavorites.forEach(book => mergedMap.set(book.title, book));

  return Array.from(mergedMap.values());
};

export const loadFavorites = async (user) => {
  if (user) {
    const serverFavorites = await getFavoritesFromFirestore(user.uid);
    const localFavorites = getLocalFavorites();

    const merged = mergeFavorites(serverFavorites, localFavorites);

    if (localFavorites.length > 0) {
      await saveFavoritesToFirestore(user.uid, merged);
      clearLocalFavorites();
      return { favorites: merged, mergedWithLocal: true };
    } else {
      await saveFavoritesToFirestore(user.uid, serverFavorites);
      return { favorites: serverFavorites, mergedWithLocal: false };
    }
  } else {
    return { favorites: getLocalFavorites(), mergedWithLocal: false };
  }
};

export const saveFavorites = async (user, favorites) => {
  if (user) {
    await saveFavoritesToFirestore(user.uid, favorites);
  } else {
    saveLocalFavorites(favorites);
  }
};

export const removeSelected = (favorites, selectedTitles) => {
  return favorites.filter(book => !selectedTitles.includes(book.title));
};

export const clearAll = () => {
  return [];
};

export const addSelectedToCart = (favorites, selectedTitles) => {
  const selectedBooks = favorites.filter(book => selectedTitles.includes(book.title));
  const existingCart = JSON.parse(localStorage.getItem('cart')) || [];

  const updatedCart = [
    ...existingCart,
    ...selectedBooks.filter(book => !existingCart.some(item => item.title === book.title)),
  ];

  localStorage.setItem('cart', JSON.stringify(updatedCart));
  window.dispatchEvent(new Event('cartUpdated'));

  return selectedBooks.length;
};