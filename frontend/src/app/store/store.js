import { configureStore } from "@reduxjs/toolkit";

import ApiSlice from "../api/apiSlice";

const store = configureStore({
  reducer: {
    [ApiSlice.reducerPath]: ApiSlice.reducer,
  },

  // We want to use the Redux Toolkit default middleware and add the API middleware
  // to it.
  middleware: (getDefaultMiddleware) => {
    // Using the spread operator, we can get the default middleware from Redux Toolkit
    // and add the API middleware to it.
    return getDefaultMiddleware().concat(ApiSlice.middleware);
  },

  // We want to use Redux DevTools in development.
  devTools: true,
});

export default store;

/**
 * Pada kode di atas, kita membuat store dengan menggunakan fungsi configureStore() dari Redux Toolkit. Fungsi ini menerima sebuah objek yang berisi konfigurasi untuk store. Objek ini memiliki beberapa properti yang harus diisi, seperti reducer, middleware, dan devTools.
 * reducer adalah fungsi yang digunakan untuk menggabungkan reducer dari slice-slice yang ada. Pada kode di atas, reducer diisi dengan objek yang memiliki nama api dan reducer yang digunakan adalah reducer dari slice API.
 * middleware adalah fungsi yang digunakan untuk menggabungkan middleware dari slice-slice yang ada. Pada kode di atas, middleware diisi dengan fungsi yang menggabungkan middleware default dengan middleware dari slice API.
 * devTools adalah boolean yang digunakan untuk mengaktifkan Redux DevTools. Pada kode di atas, devTools diisi dengan true karena kita ingin mengaktifkan Redux DevTools.
 */
