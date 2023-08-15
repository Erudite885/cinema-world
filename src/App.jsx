import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { Footer, Navbar } from "./components/index";
import { Actors, Movie, MovieInfo, Profile } from "./pages";

const App = () => {
  const Layout = () => {
    return (
      <div className="app">
        <Navbar />
        <Outlet />
        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Movie /> },
        { path: "/info/:id", element: <MovieInfo /> },
        { path: "/profile/:id", element: <Profile /> },
        { path: "/actors/:id", element: <Actors /> },
      ],
    },
  ]);

  return (
    <div className="">
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
