import React, { useRef } from "react";
import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import { CssBaseline } from "@mui/material";

import { Navbar } from "./components";
import useAlan from "./components/alan/Alan";
import { Actors, Movies, MovieInfo, Profile } from "./pages";
import useStyles from "./styles";

const App = () => {
  const Layout = () => {
    const classes = useStyles();
    const alanBtnContainer = useRef();
    useAlan();

    return (
      <div className={classes.root}>
        <CssBaseline />
        <Navbar />
        <main className={classes.content}>
          <div className={classes.toolbar}></div>
          <Outlet />
        </main>

        <div ref={alanBtnContainer}></div>
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
        { path: "/approved", element: <Movies /> },
        { path: "/*", element: <Movies /> },
      ],
    },
  ]);

  return (
    <div >
      <RouterProvider router={router} />
    </div>
  );
};

export default App;
