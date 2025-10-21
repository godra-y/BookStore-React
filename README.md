# Bookstore React App

A modern **React-based Bookstore Application** that allows users to browse, view, and save books.  
Users can register, log in, add books to their cart or favorites, and manage their profile.


## Features

- **Browse books** by category (Fiction, Non-Fiction, etc.)
- **Detailed book pages** with title, author, and description
- **Add to Favorites** and view saved books
- **Add to Cart** with quantity control
- **User Authentication** using Firebase Auth (Login, Register, Logout)
- **Profile Page** with information about user
- **LocalStorage** support to save user data and books
- **React Router** navigation (Home, Books, Favorites, Cart, Profile)


## Technologies Used

- **React** (Hooks, Context API)
- **React Router DOM**
- **Firebase Authentication**
- **LocalStorage API**
- **Create React App**


## API Used

The project uses the **[Open Library API](https://openlibrary.org/developers/api)** — a free and open-source API for accessing book data.

Example API calls:
```bash
# Search books by title or keyword
https://openlibrary.org/search.json?q=harry+potter

# Get book cover by ID
https://covers.openlibrary.org/b/id/240727-L.jpg
```


## Installation & Setup

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/bookstore-app.git
cd bookstore-app
```

### 2️⃣ Install dependencies
```bash
npm install
```

### 3️⃣ Create a Firebase project
	1.	Go to Firebase Console.
	2.	Create a new project.
	3.	Go to Project Settings → Your Apps → Web App.
	4.	Copy your Firebase config and paste it into a new file:
```
src/firebase.js
```
Example:
```js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;
```

### 4️⃣ Run the app
```bash
npm start
```
Then open http://localhost:3000


## Project Structure

```
src/
│
├── components/
│   ├── navbar/          # Navigation bar
│   ├── footer/          # Footer
│   ├── bookcard/        # BookCard component
│   ├── author/          # Author component
│   └── genre/           # Genre component
│
├── pages/
│   ├── home/            # Home page
│   ├── books/           # All books (fetched from Open Library API)
│   ├── book-detail/     # Detailed book view
│   ├── fiction/         # Fiction books
│   ├── nonfiction/      # Non-fiction books
│   ├── favorites/       # User favorites
│   ├── cart/            # Shopping cart
│   ├── auth/            # Login / Register pages
│   └── profile/         # User's page
│
├── context/
│   ├── BooksContext.js  # Books state management
│   └── AuthContext.js   # Firebase authentication
│
├── routes/
│   └── PrivateRoute.js  # Protected routes
│
├── firebase.js          # Firebase config
├── App.js               # Main app component
└── main.jsx             # Entry point
```


## Authentication Flow

	•	Register → creates a new user via Firebase Auth.
	•	Login → signs in the user and stores session.
	•	Logout → clears session.
	•	Profile Page → shows user info.


## Future Improvements
	•	Integrate Redux for global state management
	•	Add unit tests using Jest or React Testing Library
	•	Convert into a Progressive Web App (PWA)
	•	Optimize with lazy loading and Suspense

