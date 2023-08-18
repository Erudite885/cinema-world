import React from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";

import { Footer, Navbar } from "./components/index";
import { Actors, Movies, MovieInfo, Profile } from "./pages";

import useStyles from "./styles";
import { CssBaseline } from "@mui/material";

const App = () => {
  const Layout = () => {
    const classes = useStyles();
    return (
      <div className={classes.root}>
        <CssBaseline />
        <Navbar />
        <main className={classes.content}>
          <div className={classes.toolbar}></div>
          <Outlet />
        </main>

        <Footer />
      </div>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Movies /> },
        { path: "/movie/:id", element: <MovieInfo /> },
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
