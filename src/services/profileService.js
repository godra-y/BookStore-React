import { auth, db } from "../firebase";
import { onAuthStateChanged, signOut, updateProfile } from "firebase/auth";
import { doc, setDoc, getDoc } from "firebase/firestore";

export const subscribeToUser = (callback) => {
  return onAuthStateChanged(auth, callback);
};

export const getUserDoc = async (uid) => {
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? docSnap.data() : null;
};

export const updateUserDoc = async (uid, data) => {
  const docRef = doc(db, "users", uid);
  await setDoc(docRef, data, { merge: true });
};

export const compressImageToBase64 = (file, maxWidth = 300) => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");

        const scale = maxWidth / img.width;
        canvas.width = maxWidth;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.6);
        resolve(compressedBase64);
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  });
};

export const uploadProfilePhoto = async (file, user) => {
  if (!file.type.match(/image\/(jpeg|png)/)) {
    throw new Error("Only JPG/PNG images allowed!");
  }

  const base64 = await compressImageToBase64(file);

  await updateUserDoc(user.uid, { photoBase64: base64 });

  return base64;
};

export const logout = async () => {
  await signOut(auth);
  return true;
};