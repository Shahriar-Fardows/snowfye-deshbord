import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import ErrorPage from "../Error/ErrorPage";
import Home from "../Home/Home";
import LoadingSpinner from "../Shared/LoadingSpinner";
import Login from "../Auth/Login/Login";
import Register from "../Auth/Register/Register";
import PromoCode from "../Page/PromoCode/PromoCode";


// Define the wait function
const wait = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Dynamically import the Root component
const Root = lazy(() => wait(3000).then(() => import("../Root")));

const Routers = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Root />
      </Suspense>
    ),
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: "/promo-code",
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <PromoCode />
          </Suspense>
        ),
      },

    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <Register />
      </Suspense>
    ),
  },
]);

export default Routers;
