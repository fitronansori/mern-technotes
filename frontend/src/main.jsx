import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import store from "./app/store/store.js";
import { Provider } from "react-redux";

import Public from "./components/Public";
import Login from "./features/auth/Login";
import DashLayout from "./components/DashLayout";
import Welcome from "./features/auth/Welcome";
import NotesList from "./features/notes/NotesList";
import UsersList from "./features/users/UsersList";
import NotFound from "./components/NotFound.jsx";
import NewUserForm from "./features/users/NewUserForm";
import EditUser from "./features/users/EditUser";
import EditNote from "./features/notes/EditNote";
import NewNote from "./features/notes/NewNote";
import Prefetch from "./features/auth/Prefetch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Public />,
      },
      {
        path: "/login",
        element: <Login />,
      },

      {
        element: <Prefetch />,
        children: [
          {
            path: "/dash",
            element: <DashLayout />,
            children: [
              {
                index: true,
                element: <Welcome />,
              },
              {
                path: "users",
                children: [
                  {
                    index: true,
                    element: <UsersList />,
                  },
                  {
                    path: ":id",
                    element: <EditUser />,
                  },
                  {
                    path: "new",
                    element: <NewUserForm />,
                  },
                ],
              },
              {
                path: "notes",
                children: [
                  {
                    index: true,
                    element: <NotesList />,
                  },
                  {
                    path: ":id",
                    element: <EditNote />,
                  },
                  {
                    path: "new",
                    element: <NewNote />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
