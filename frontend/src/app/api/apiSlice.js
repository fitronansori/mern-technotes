/**
 * createApi() adalah fungsi yang digunakan untuk membuat API slice. Fungsi ini menerima sebuah objek yang berisi konfigurasi untuk slice API. Objek ini memiliki beberapa properti yang harus diisi, seperti reducerPath, baseQuery, tagTypes, dan endpoints.
 * reducerPath adalah nama slice API yang akan digunakan untuk menyimpan data cache. Nama ini akan digunakan untuk mengakses data cache di dalam store.
 * baseQuery adalah fungsi yang digunakan untuk mengirimkan request ke server. Fungsi ini menerima sebuah objek yang berisi konfigurasi untuk request. Pada kode di atas, baseUrl diisi dengan http://localhost:5000 karena server berjalan di port 5000.
 * tagTypes adalah array yang berisi tipe tag yang akan digunakan untuk menyimpan data cache. Pada kode di atas, tagTypes diisi dengan User dan Note karena kita akan menyimpan data user dan note di dalam cache.
 */

import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
  }),
  tagTypes: ["User", "Note"],
  // eslint-disable-next-line no-unused-vars
  endpoints: (builder) => ({}),
});

export default apiSlice;
