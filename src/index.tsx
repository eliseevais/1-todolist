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

// const root = ReactDOM.createRoot(
//   document.getElementById("root") as HTMLElement
// );
// root.render(
//   <Provider store={store}>
//     <App/>
//   </Provider>
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

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

