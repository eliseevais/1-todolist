import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./app/App";
import {Provider} from "react-redux";
import {store} from "./app/store";
import {createBrowserRouter, Navigate, RouterProvider} from "react-router-dom";
import {Login} from "./features/Login/Login";
import {TodoListsList} from "./features/TodoListList/TodoListsList";
import {ErrorPage} from "./components/ErrorPage/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <Navigate to="/404"/>,
    children: [
      {
        index: true,
        element: <Navigate to="/todolists"/>
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/todolists",
        element: <TodoListsList/>,
      },
    ],
  },
  {
    path: "/404",
    element: <ErrorPage/>
  },
]);

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <Provider store={store}>
    <RouterProvider router={router}/>
  </Provider>
);

// reportWebVitals();

